const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bcrypt = require("bcryptjs"); //importar modulo para encriptar contraseña
const { generarToken } = require('./funciones');
const server = express();
const jwt = require('jsonwebtoken');

server.use(cors());
server.use(express.json());

const conector = mysql.createConnection({
  user: "root",
  host: "localhost",
  database: "markethubb",
  password: "45123619",
});

server.get("/", (req, res) => {
  res.send("Hola desde el servidor");
});

//registrar usuario
server.post("/registrar", async (req, res) => {
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const dni = req.body.dni;
  const tel = req.body.telefono;
  const email = req.body.email;
  const password = req.body.password;

  let passwordHash = await bcrypt.hash(password, 8); // encripto la contraseña y la guardo en una variable para mandarla a la db.

    conector.query(
    "INSERT INTO usuarios (nombre,apellido,dni,telefono,email,contraseña) VALUES (?,?,?,?,?,?)",
    [nombre, apellido, dni, tel, email, passwordHash],
    (err, result) => {
      if (err) {
        if(err.sqlMessage.includes('email')){
          res.send({ mensaje : "Ya existe una cuenta con ese email", cod : 1})
        }
        console.log(err);
      } else {
        res.send({ mensaje :"Registrado con exito, iniciar sesion.", cod : 3});
        console.log("datos insertados con exito");
      }
    }
  );
});

//iniciar sesion
server.post("/iniciar-sesion", (req, res) => {
  const email = req.body.email; //datos que recibo desde el front
  const password = req.body.password;

  conector.query( //busqueda del usuario en la db
    "SELECT * FROM usuarios WHERE email=? ", //sentencia sql para buscar en la db
    [email], //paso valor recibido desde el front para realizar la busqueda
    async (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result.length > 0) {
          const datos = result[0]; //guardo datos del usuario en una variable
          const contraseñaHash = datos.contraseña; //guardo constraseña encriptada de la db en una variable
          const esIgual = await bcrypt.compare(password, contraseñaHash); //comparo contraseña ingresada con la contraseña de la db
          if(esIgual) {
            const token = generarToken(datos); // Generar el token JWT
            console.log("credenciales correctos"); 
            res.send({ message: "inicio exitoso",token, datos: JSON.stringify(datos) }); //envio al front un mensaje y la variable datos que contiene los datos de la db en cadena.
          } else {
            console.log("contraseña incorrecta");
            res.send({ message: "contraseña incorrecta" });
          }
        } else {
          res.send({ message: "usuario no existe"});
          console.log("usuario no encontrado");
        }
      }
    }
  );
});

//reestablecer contraseña
server.post("/reestablecer-contraseña", (req,res) =>{
  const email = req.body.email;
  const emailsExistentes = `SELECT * FROM usuarios WHERE email = ${email}`;
  conector.query(emailsExistentes, (err,result)=>{
    if(err){
      console.log(err)
    }else{
      if(result > 0 ){
        const emailSi = result[0];
        const a = emailSi.email;
        console.log(a)
      }
    }
  })
});

//obtener zapatillas
server.get('/zapa',(req,res)=>{
  conector.query(`SELECT * FROM zapatillas`, (err,result)=>{ //busqueda de zapatillas en la db
    if (err) {
      console.log(err);
    } else {
      res.send(result); //envio resultados al front
    }
  });
});

//obtener promos
server.get('/promos', (req, res) => {
  conector.query(`SELECT * FROM promos`, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ mensaje: 'Error interno del servidor.' });
    } else {
      res.send(result);
    }
  });
});

//obtener productos de tabla indumentaria
server.get('/indumentaria', (req,res)=>{
  conector.query(`SELECT * FROM indumentaria`,(err,result)=>{
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//ACTUALIZAR NOMBRE
server.put('/actualizarDato/nombre', (req, res) => {

  const token = req.headers.authorization; //recibo token desde la cabecera enviado desde el cliente
  const nuevoNombre = req.body.nuevoNombre; //recibo dato para actualizar
  const id = req.body.id; //recibo id del usuario

  if (!token) { // verifico si el token está incluido en la cabecera de la solicitud
    return console.log('Token no proporcionado'); //si no lo está imprime en consola
  }

  jwt.verify(token, 'clav3s3cr3ta', (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.json({ msj: 'Token expirado, reinicia sesión' });
      } else {
        return res.json({ msj: 'Token inválido' });
      }
    }

    conector.query(`UPDATE usuarios SET nombre = '${nuevoNombre}' WHERE idusuario = ${id}`, (err) => {
      if (err) {
        console.log(err);
        console.log('Error al actualizar el nombre' );
      }

      console.log('Se actualizó correctamente');
      res.json({ msj : 'El nombre se actualizó correctamente' }); // Envía una respuesta exitosa
    });
  });
});

//ACTUALIZAR APELLIDO DE USUARIO
server.put('/actualizarDato/apellido',(req, res) => {
  const token = req.headers.authorization;
  const nuevoApellido= req.body.nuevoApellido;
  const id = req.body.id;

  if (!token) { // verifico si el token está incluido en la cabecera de la solicitud
    return console.log('Token no proporcionado'); //si no lo está imprime en consola
  }

  //funcion para verificar el estado del token
  jwt.verify(token, 'clav3s3cr3ta', (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') { 
        return res.json({ msj: 'Token expirado, reinicia sesión' });
      } else {
        return res.json({ msj: 'Token inválido' });
      }
    }

    conector.query(`UPDATE usuarios SET apellido = '${nuevoApellido}' WHERE idusuario = ${id}`, (err) => {
      if (err) {
        console.log(err);
        console.log('Error al actualizar el apellido' );
      }

      console.log('Se actualizó correctamente');
      res.json({ msj : 'El apellido se actualizó correctamente' }); // Envía una respuesta exitosa
    });
  });
});

//ACTUALIZAR EMAIL DE USUARIO
server.put('/actualizarDato/email',(req, res) => {
  const token = req.headers.authorization;
  const nuevoEmail = req.body.nuevoEmail;
  const id = req.body.id;

  if (!token) { // verifico si el token está incluido en la cabecera de la solicitud
    return res.json({ msj: 'Token no proporcionado' }); //si no lo está imprime en consola
  }

  jwt.verify(token, 'clav3s3cr3ta', (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') { 
        return res.json({ msj: 'Token expirado, reinicia sesión' });
      } else {
        return res.json({ msj: 'Token inválido' }); 
      }
    }

    conector.query(`UPDATE usuarios SET email = '${nuevoEmail}' WHERE idusuario = ${id}`, (err) => {
      if (err) {
        console.log(err);
        console.log('Error al actualizar el email' );
      }

      console.log('Se actualizó correctamente');
      res.json({ msj : 'El email se actualizó correctamente' }); // Envía una respuesta exitosa
    });
  });
});

//ACTUALIZAR USERNAME
server.put('/actualizarDato/username',(req, res) => {
  const token = req.headers.authorization;
  const nuevoUsername = req.body.nuevoUsername;
  const id = req.body.id;

  if (!token) { // verifico si el token está incluido en la cabecera de la solicitud
    return res.json({ msj: 'Token no proporcionado' }); //si no lo está imprime en consola
  }

  jwt.verify(token, 'clav3s3cr3ta', (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') { 
        return res.json({ msj: 'Token expirado, reinicia sesión' });
      } else {
        return res.json({ msj: 'Token inválido' });
      }
    }

    conector.query(`UPDATE usuarios SET username = '${nuevoUsername}' WHERE idusuario = ${id}`, (err) => {
      if (err) {
        console.log(err);
        console.log('Error al actualizar el username' );
      }

      console.log('Se actualizó correctamente');
      res.json({ msj : 'El username se actualizó correctamente' }); // Envía una respuesta exitosa
    });
  });
});

//ELIMINAR USUARIO DE LA BASE DE DATOS
server.delete('/eliminarCuenta/:id',(req,res)=>{
  const token = req.headers.authorization;
  const { id } = req.params;

  if(!token){
    return res.json({ msj:'token no proporcionado' });
  }

  jwt.verify(token, 'clav3s3cr3ta', (err, decoded)=>{
    if(err){
      if(err.name === 'TokenExpiredError'){
        return res.json({ msj:'Token expirado, reinicia sesión' })
      } else {
        return res.json({ msj:'Token invalido' })
      }
    }
  })

  conector.query(`DELETE FROM usuarios WHERE idusuario = ${id}`),
  (err)=>{
    if (err) {
      console.log(err)
    }else{
      res.json({mensaje:'se eliminó correctamente'});
    }
  }
});

const port = 3001;

server.listen(port, () => {
  console.log("servidor abierto en puerto 3001");
});
