const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bcrypt = require("bcryptjs"); //importar modulo para encriptar contraseña
const jwt = require('jsonwebtoken');

const server = express();

server.use(cors());
server.use(express.json());

const conector = mysql.createConnection({
  user: "root",
  host: "localhost",
  database: "markethub",
  password: "45123619",
});

server.get("/", (req, res) => {
  res.send("Hola desde el servidor");
});

//registrar usuario
server.post("/registrar", async (req, res) => {
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  let passwordHash = await bcrypt.hash(password, 8); // encripto la contraseña y la guardo en una variable para mandarla a la db.

  conector.query(
    "INSERT INTO usuarios (nombre,apellido,username,email,contraseña) VALUES (?,?,?,?,?)",
    [nombre, apellido, username, email, passwordHash],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Registrado con exito, ve a iniciar sesion.");
        console.log("datos insertados con exito");
      }
    }
  );
});

//iniciar sesion
server.post("/iniciar-sesion", (req, res) => {
  const username = req.body.username; //datos que recibo desde el front
  const password = req.body.password;

  conector.query( //busqueda del usuario en la db
    "SELECT * FROM usuarios WHERE username=? ", //sentencia sql para buscar en la db
    [username], //paso valor recibido desde el front para realizar la busqueda
    async (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result.length > 0) {
          const datos = result[0]; //guardo datos del usuario en una variable
          const contraseñaHash = datos.contraseña; //guardo constraseña encriptada de la db en una variable
          const esIgual = await bcrypt.compare(password, contraseñaHash); //comparo contraseña ingresada con la contraseña de la db
          if(esIgual) {

            const payload = { //objeto para jwt
              ckeck : true
            }
            const token = jwt.sign(payload, 'clav3s3cr3ta',{ //generar token pasandole el objeto anterior y una clave secreta.
              expiresIn: '5m' //expiracion en 5 minutos
            });
             
            console.log("credenciales correctos"); 
            res.send({ message: "inicio exitoso", token, datos: JSON.stringify(datos) }); //envio al front un mensaje y la variable datos que contiene los datos de la db en cadena.
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
server.get('/promos',(req,res)=>{
  conector.query(`SELECT * FROM promos`, (err,result)=>{ //busqueda de zapatillas en la db
    if (err) {
      console.log(err);
    } else {
      res.send(result); //envio resultados al front
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

//ACTUALIZAR NOMBRE DE USUARIO
server.put('/actualizarDato/nombre',(req, res) => {
  const nuevoNombre = req.body.nuevoNombre;
  const id = req.body.id;

  conector.query(`UPDATE usuarios SET nombre = '${nuevoNombre}' WHERE idusuario = ${id}`),
  (err)=>{
    if (err) {
      console.log(err)
    }else{
      console.log('se actualizó correctamente');
    }
  }
});

//ACTUALIZAR APELLIDO DE USUARIO
server.put('/actualizarDato/apellido',(req, res) => {
  const nuevoApellido= req.body.nuevoApellido;
  const id = req.body.id;

  conector.query(`UPDATE usuarios SET apellido = '${nuevoApellido}' WHERE idusuario = ${id}`),
  (err)=>{
    if (err) {
      console.log(err)
    }else{
      console.log('se actualizó correctamente');
    }
  }
});

//ACTUALIZAR EMAIL DE USUARIO
server.put('/actualizarDato/email',(req, res) => {
  const nuevoEmail = req.body.nuevoEmail;
  const id = req.body.id;

  conector.query(`UPDATE usuarios SET email = '${nuevoEmail}' WHERE idusuario = ${id}`),
  (err)=>{
    if (err) {
      console.log(err)
    }else{
      console.log('se actualizó correctamente');
    }
  }
});

//ACTUALIZAR NOMBRE DE USUARIO
server.put('/actualizarDato/username',(req, res) => {
  const nuevoUsername = req.body.nuevoUsername;
  const id = req.body.id;

  conector.query(`UPDATE usuarios SET username = '${nuevoUsername}' WHERE idusuario = ${id}`),
  (err)=>{
    if (err) {
      console.log(err)
    }else{
      console.log('se actualizó correctamente');
    }
  }
});

//ELIMINAR USUARIO DE LA BASE DE DATOS
server.delete('/eliminarCuenta/:id',(req,res)=>{
  const { id } = req.params;
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
