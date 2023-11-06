import { Link, useNavigate } from 'react-router-dom' //usenavigate para redirigir al usuario a su cuenta
import Navbar from '../components/nav'
import { useState } from 'react'
import '../styles/iniciar-sesion.css'
import axios from 'axios'


export default function IniciarSesion() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const enviarDatos = () => {
        axios.post('http://localhost:3001/iniciar-sesion', {
            email,
            password
        })
            .then(response => {
                const { message, datos, token } = response.data; //recibo del back el mensaje y datos (en cadena)
                if (message === 'inicio exitoso') { //verifico si el mensaje es de inicio exitoso para mandarlo a la pagina de usuario
                    localStorage.setItem('token', token); // Almacenar el token en el LocalStorage
                    alert('inicio exitoso');
                    const id = JSON.parse(datos) //variable que guarda los datos en json para poder usar el id para indicarle en la url
                    navigate(`/usuario/${id.idusuario}`, { state: { datos } }); //ponemos la url hacia donde lo mandaremos y envio los datos en la variable state.
                } else {
                    alert(message) //mostrar mensaje en caso de que las credenciales no sean correctas
                }
            })
            .catch(e => { alert(e.message) })
        limpiar();
    }

    const limpiar = () => {
        const email = document.querySelector('.email');
        const password = document.querySelector('.password');
        email.value = '';
        password.value = '';
    }

    return (
        <>
            <Navbar />
            <div className='boxis'>
                <div className="iniciar-sesion">
                    <div className='iz'>
                        <h1>Welcome Back!</h1>
                    </div>
                    <div className='de'>
                        <div className='de-cont'>
                            <h1>Login</h1>
                            <p>Welcome back! Please login in your account</p>
                            <div className='de-inputs'>
                                <input className='email' type="text" placeholder='* Email' onChange={e => { setEmail(e.target.value) }} />
                                <input className='password' type="password" placeholder='* Password' onChange={e => { setPassword(e.target.value) }} />
                                <div className='forpass'>
                                    <p>Forgot Password?</p>
                                </div>
                                <button className='btn-login' onClick={enviarDatos} >Log in</button>
                            </div><br />
                            <hr />
                            <div className='de-pas'>
                                <p>No have account? <a className='btn-de-pass'><Link to={'/registrarse'}> register</Link></a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
