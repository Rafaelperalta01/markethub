import { Link, useNavigate, useParams} from 'react-router-dom' //usenavigate para redirigir al usuario a su cuenta
import Navbar from '../components/nav'
import { useState } from 'react'
import '../styles/iniciar-sesion.css'
import axios from 'axios'




export default function IniciarSesion(){

    const navigate = useNavigate();

    const[username, setUsername] = useState('')
    const[password, setPassword] = useState('')

    const enviarDatos = () => {
        axios.post('http://localhost:3001/iniciar-sesion',{
            username,
            password
        })
        .then(response =>{
            const { message, datos } = response.data; //recibo del back el mensaje y datos (en cadena)
            if (message === 'inicio exitoso'){ //verifico si el mensaje es de inicio exitoso para mandarlo a la pagina de usuario
                alert(message)
                const id = JSON.parse(datos) //variable que guarda los datos en json para poder usar el id para indicarle en la url
                navigate(`/usuario/${id.idusuario}`,{ state: {datos} }); //ponemos la url hacia donde lo mandaremos y envio los datos en la variable state.
            } else {
                alert(message) //mostrar mensaje en caso de que las credenciales no sean correctas
            }
        })
        .catch(e =>{alert(e.message)})
        limpiar();
    }
    
    const limpiar=()=>{
        const username = document.querySelector('.username');
        const password = document.querySelector('.password');
        username.value = ''; 
        password.value = ''; 
    }

    return(
        <>
            <Navbar />
            <div className='boxis'>
                <div className="iniciar-sesion">
                    <h1>Iniciar Sesión</h1>
                    <div className='iscaja' >
                        <input className='username' type="text" placeholder='Username' onChange={e =>{setUsername(e.target.value)}} />
                        <input className='password' type="password" placeholder='Password' onChange={e =>{setPassword(e.target.value)}} />
                        <button className='isbtn' onClick={enviarDatos}>Entrar</button>
                    </div>
                    <p className='mensaje'>¿Todavía no tenés cuenta? <Link to={'/registrarse'}>registrarse</Link></p>
                </div>
            </div>
        </>
    )
}




