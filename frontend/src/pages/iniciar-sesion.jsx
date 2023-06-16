import { Link } from 'react-router-dom'
import Navbar from '../components/nav'
import { useState } from 'react'
import '../styles/iniciar-sesion.css'
import axios from 'axios'




export default function IniciarSesion(){

    const[username, setUsername] = useState('')
    const[password, setPassword] = useState('')

    const enviarDatos = () => {
        axios.post('http://localhost:3001/iniciar-sesion',{
            username,
            password
        })
        .then(e =>{alert(e.data)})
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
                        <input className='password' type="text" placeholder='Password' onChange={e =>{setPassword(e.target.value)}} />
                        <button className='isbtn' onClick={enviarDatos}>Entrar</button>
                    </div>
                    <p className='mensaje'>¿Todavía no tenés cuenta? <Link to={'/registrarse'}>registrarse</Link></p>
                </div>
            </div>
        </>
    )
}




