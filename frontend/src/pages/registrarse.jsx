import { useState } from 'react'
import Navbar from '../components/nav'
import '../styles/registro.css'
import { Link } from 'react-router-dom'
import axios from 'axios'



export default function Registro(){

    const[nombre, setNombre] = useState('')
    const[apellido, setApellido] = useState('')
    const[username, setUsername] = useState('')
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')

    const enviarDatos=()=>{

        if (!nombre || !apellido || !username || !email ||  !password) {
            alert('Por favor, complete todos los campos requeridos');
            return;
        }
        
        axios.post('http://localhost:3001/registrar',{
            nombre,
            apellido,
            username,
            email,
            password
        })
        .then(e =>{alert(e.data)})
        .catch(e =>{console.log(e.message)})
        limpiar();
    }

    
    const limpiar=()=>{
        const nombre = document.querySelector('.nombre');
        const apellido = document.querySelector('.apellido');
        const username = document.querySelector('.username');
        const email = document.querySelector('.email');
        const password = document.querySelector('.password');
        nombre.value = ''; 
        apellido.value = ''; 
        username.value = ''; 
        email.value = ''; 
        password.value = ''; 
    }

    return(
        <>
            <Navbar />
            <div className='boxr'>
                <div className="registro">
                    <h1>Registro</h1>
                    <div className='rcaja' >
                        <input className='nombre' type="text" placeholder='Nombre' onChange={e =>{setNombre(e.target.value)}} required/>
                        <input className='apellido' type="text" placeholder='Apellido' onChange={e =>{setApellido(e.target.value)}} required/>
                        <input className='username' type="text" placeholder='Username' onChange={e =>{setUsername(e.target.value)}} required/>
                        <input className='email' type="text" placeholder='email' onChange={e =>{setEmail(e.target.value)}} required/>
                        <input className='password' type="password" placeholder='Password' onChange={e =>{setPassword(e.target.value)}} required/>
                        <button className='rbtn' onClick={enviarDatos}>Registrarte</button>
                    </div>
                    <p className='mensaje'>¿Ya tienes una cuenta? <Link to={'/iniciar-sesion'}>Iniciar sesión</Link></p>
                </div>
            </div>
        </>
    )
}

