import { useState } from 'react'
import Navbar from '../components/nav'
import '../styles/registro.css'
import { Link } from 'react-router-dom'
import axios from 'axios'



export default function Registro() {

    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [dni, setDni] = useState(0)
    const [telefono, setTelefono] = useState(0)
    const [email, setEmail] = useState('')
    const [confemail, setConfEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confpass, setConfpass] = useState('')

    const enviarDatos = () => {

        if (!nombre || !apellido || !dni || !telefono || !email || !password) {
            alert('Por favor, complete todos los campos requeridos');
            limpiar();
            return;
        }

        confirmarEmail();
        confirmarContraseña();

        axios.post('http://localhost:3001/registrar', {
            nombre,
            apellido,
            dni,
            telefono,
            email,
            password
        })
            .then(e => {
                if (e.data.cod === 1) {
                    alert(e.data.mensaje);
                } else if (e.data.cod === 2) {
                    alert(e.data.mensaje);
                } else {
                    alert(e.data.mensaje);
                    window.location.replace('/iniciar-sesion');
                }
            })
            .catch(e => { console.log(e.message) })
        limpiar();
    }

    const confirmarContraseña = () => {
        if(password != confpass) {
            alert('las contraseñas no coinciden')
            limpiar();
        }
    }
    const confirmarEmail = () => {
        if(email != confemail) {
            alert('los emails no coinciden')
            limpiar();
        }
    }

    const limpiar = () => {
        const nombre = document.querySelector('.nombre');
        const apellido = document.querySelector('.apellido');
        const dni = document.querySelector('.dni');
        const tel = document.querySelector('.tel');
        const email = document.querySelector('.email');
        const cemail = document.querySelector('.confemail');
        const password = document.querySelector('.password');
        const cpass = document.querySelector('.confpass');
        nombre.value = '';
        apellido.value = '';
        dni.value = '';
        tel.value = '';
        cemail.value = '';
        email.value = '';
        password.value = '';
        cpass.value = '';
    }

    return (
        <>
            <Navbar />
            <div className='boxr'>
                <div className="registro">
                    <div className='a1'>
                        <h1>Welcome</h1>
                        <p>Already have an account ? <a className='btn-de-pass'><Link to={'/iniciar-sesion'}>Log in</Link></a></p>
                    </div>
                    <div className='a2'>
                        <div className='datos-personales'>
                            <h1>Personal data</h1>
                            <div className="inputs-a1">
                                <div className='a1-a1'>
                                    <input className='nombre' type="text" placeholder='* Nombre' onChange={e =>{ setNombre(e.target.value) }} />
                                    <input className='apellido' type="text" placeholder='* Apellido' onChange={e =>{ setApellido(e.target.value) }} />
                                </div>
                                <br />
                                <div className='a1-a2'>
                                    <input className='dni' type="text" placeholder='* DNI' onChange={e =>{ setDni(e.target.value) }} />
                                    <input className='tel' type="text" placeholder='* Teléfono' onChange={e =>{ setTelefono(e.target.value) }} />
                                </div>
                            </div>
                        </div>
                        <div className='datos-cuenta'>
                            <h1>About your account</h1>
                            <div className="inputs-a2">
                                <div className='a1-a1'>
                                    <input className='email' type="text" placeholder='* Email' onChange={e =>{ setEmail(e.target.value) }} />
                                    <input className='confemail' type="text" placeholder='* Confirm email' onChange={e =>{ setConfEmail(e.target.value) }} />
                                </div>
                                <br />
                                <div className='a1-a2'>
                                    <input className='password' type="password" placeholder='* Password' onChange={e =>{ setPassword(e.target.value) }} />
                                    <input className='confpassword' type="password" placeholder='* Confirm password' onChange={e =>{ setConfpass(e.target.value) }} />
                                </div>
                            </div>
                            <button className='btn-enviar' onClick={enviarDatos}>Send</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}
