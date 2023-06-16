const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcryptjs'); //importar modulo para encriptar

const server = express();

server.use(cors());
server.use(express.json());

const conector = mysql.createConnection({
    user: 'root',
    host:'localhost',
    database:'markethub',
    password:'45123619'
})

server.get('/',(req,res)=>{
    res.send('Hola desde el servidor')
})

server.post('/registrar', async (req,res)=>{

    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    let passwordHash = await bcrypt.hash(password, 8) // encripto la contraseña y la guardo en una variable para mandarla a la db.

    conector.query(
        'INSERT INTO usuarios (nombre,apellido,username,email,contraseña) VALUES (?,?,?,?,?)',
        [nombre,apellido,username,email,passwordHash],
        (err,result)=>{
            if(err){
                console.log(err)
            } else {
                res.send('Registrado con exito')
                
                console.log('datos insertados con exito')
            }
        }
    );
});

server.post('/iniciar-sesion',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    conector.query(
        'SELECT * FROM usuarios WHERE username=? ',
        [username],
        async (err,result)=>{
            if (err) {
                console.log(err)
            } else {
                if(result.length > 0){
                    const contraseñaHash = result[0].contraseña;
                    const esIgual = await bcrypt.compare(password, contraseñaHash);
                    if (esIgual) {
                        console.log('credenciales correctos')
                        res.send('inicio exitoso')
                    } else {
                        console.log('contraseña incorrecta')
                        res.send('contraseña incorrecta')
                    }
                }else{
                    res.send('usuario no existe')
                    console.log('usuario no encontrado')
                }
            }
        }
    );
});

const port = 3001;

server.listen(port,()=>{
    console.log('servidor abierto en puerto 3001')
});


