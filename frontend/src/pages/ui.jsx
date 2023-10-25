import { useLocation, Link, useParams  } from "react-router-dom";
import CajaUser, { CajaIndumentaria } from "../components/caja";
import '../styles/ui.css';
import '../styles/navbar.css'
import axios from "axios";
import { useState } from "react";



export default function UserInterface(){

    let { id } = useParams(); //id del usuario que ingresó

    const [producto, setProducto] = useState('promos')


    const [listaZapas, setListaZapas] = useState([]); //creo array para guardar las zapatillas que reciba
    const [listaIndumentaria, setListaIndumentaria] = useState([]); //creo array para guardar la ropa que reciba
    const [listaPromos, setListaPromos] = useState([]); //creo array para guardar las promos que reciba

    
    const location = useLocation();
    const { datos } = location.state; //recibo los datos enviados de la variable state.

    const userDatos = JSON.parse(datos); //creo una variable que contenga los datos y los convierto en json, ya puedo acceder a los datos desde la variable creada.

    const obtenerZapatillas = () =>{
        setProducto('zapatillas');
        axios.get('http://localhost:3001/zapa') //hago solicitud get al back para obtener las zapatillas
        .then(result =>{ setListaZapas((result.data))}) //guardo los resultados del back en setLista
        .catch(e =>{ console.log(e)}) //en caso de error imprimo en consola
    }

    const obtenerIndumentaria = () =>{
        setProducto('indumentaria');
        axios.get('http://localhost:3001/indumentaria') //hago solicitud get al back para obtener las ropas
        .then(result =>{ setListaIndumentaria((result.data))}) //guardo los resultados del back en setListaIndumentaria
        .catch(e =>{ console.log(e)}) //en caso de error imprimo en consola
    }
    
    const obtenerPromos = () =>{
        setProducto('promos');
        axios.get('http://localhost:3001/promos') //hago solicitud get al back para obtener las ropas
        .then(result =>{ setListaPromos((result.data))}) //guardo los resultados del back en setListaIndumentaria
        .catch(e =>{ console.log(e)}) //en caso de error imprimo en consola
    }

    const verDatos = () =>{
        setProducto('mis datos');
    }

    const token = localStorage.getItem('token')

    const actualizarNombre = () => { //ACTUALIZAR NOMBRE
        
        const nuevoNombre = prompt('ingresa tu nuevo nombre'); //variable que guarda el nuevo dato
        if(nuevoNombre === null ){
            alert('cancelaste la operacion')
            return;
        }
        if(nuevoNombre ==="" ){
            alert("Ingresa un valor válido");
            return;
        }
        axios.put('http://localhost:3001/actualizarDato/nombre',{
            id,
            nuevoNombre
        },{
            headers: {
                Authorization : token
            }
        })
        .then((result)=>{
            alert(result.data.msj)
        })
        .catch((e)=>{console.log(e)});
    }

    const actualizarApellido = () => { //ACTUALIZAR APELLIDO
        const nuevoApellido = prompt('ingresa tu nuevo apellido'); //variable que guarda el nuevo dato
        if(nuevoApellido == null ){
            alert('cancelaste la operacion')
            return;
        }
        if(nuevoApellido ==="" ){
            alert("Ingresa un valor válido");
            return;
        }
        axios.put('http://localhost:3001/actualizarDato/apellido',{
            id,
            nuevoApellido
        },{
            headers: {
                Authorization: token
            }
        })
        .then((result)=>{
            alert(result.data.msj)
        })
        .catch((e)=>{console.log(e)});
    }

    const actualizarEmail = () => { //ACTUALIZAR EMAIL
        const nuevoEmail = prompt('ingresa tu nuevo email'); //variable que guarda el nuevo dato
        if(nuevoEmail == null ){
            alert('cancelaste la operacion')
            return;
        }
        if(nuevoEmail ===""){
            alert("Ingresa un valor válido");
            return;
        }
        axios.put('http://localhost:3001/actualizarDato/email',{
            id,
            nuevoEmail
        },{
            headers:{
                Authorization: token
            }
        })
        .then((result)=>{
            alert(result.data.msj)
        })
        .catch((e)=>{console.log(e)});
    }

    const actualizarUsername = () => { //ACTUALIZAR USERNAME
        const nuevoUsername = prompt('ingresa tu nuevo Username'); //variable que guarda el nuevo dato
        if(nuevoUsername == null ){
            alert('cancelaste la operacion')
            return;
        }
        if(nuevoUsername ===""){
            alert("Ingresa un valor válido");
            return;
        }
        axios.put('http://localhost:3001/actualizarDato/username',{
            id,
            nuevoUsername
        },{
            headers:{
                Authorization: token
            }
        })
        .then((result)=>{
            alert(result.data.msj)
        })
        .catch((e)=>{console.log(e)});
    }

    const eliminarCuenta = () => {
        axios.delete(`http://localhost:3001/eliminarCuenta/${id}`,{
            headers : {
                Authorization: token
            }
        })
        .then(e => {
            alert(e.data.msj) // Elemento eliminado
            localStorage.removeItem('token');
            window.location.replace('/'); //redirecciona al main
        })
        .catch(error => {
            console.error(error)
        });
        
    }

    //funcion de cerrar sesion
    const cerrarSesion = () => {
        localStorage.removeItem('token'); //remover el token de localStorage
        window.location.replace('/'); //dirigirlo a la pagina main
    }
    
    return(
        <div className="all">
            <div className="main-barra">
                <h1><Link to={'/'} className='link'>MarketHub</Link></h1>
                <div className='main-barra-links'>
                    <p className="link" onClick={verDatos}>mis datos</p>
                    <p onClick={cerrarSesion} className="link">cerrar sesion</p>
                </div>
            </div>
            <div className="productos">
                <p className="saludo">Bienvenido, {userDatos.nombre} </p> <hr />
                <ul>
                    <li onClick={obtenerZapatillas}>Zapatillas</li> {/* evento click que realiza la solicitud al back con la funcion creada*/}
                    <li onClick={obtenerIndumentaria}>Indumentaria</li>
                    <li onClick={obtenerPromos}>Promos</li>
                </ul>
            </div>
            <div className='promos'>

            {producto === 'zapatillas' && (
                <>
                    <p className="msj-promo">ESTAS SON LAS ZAPAS PARA USUARIOS:</p>
                    <div className='zapas'>
                        {listaZapas.map((zapas, index) => (
                            <CajaUser key={index} props={zapas} />
                        ))}
                    </div>
                </>
            )}
            {producto === 'indumentaria' && (
                <>
                    <p className="msj-promo">TENEMOS LA MEJOR ROPA PARA VOS:</p>
                    
                    <div className='zapas'>
                        {listaIndumentaria.map((ind, index) => (
                            <CajaIndumentaria key={index} props={ind} />
                        ))}
                    </div>
                </>
            )}
            {producto === 'promos' && (
                <>
                    <p className="msj-promo">TENEMOS LAS MEJORES PROMOS PARA VOS:</p>
                    
                    <div className='zapas'>
                        {listaPromos.map((ind, index) => (
                            <CajaIndumentaria key={index} props={ind} />
                        ))}
                    </div>
                </>
            )}
            {producto === 'mis datos' && (
                <div className="verDatosUsuario">
                    <ul>
                        <h2>Tus datos {userDatos.nombre}: </h2> <br />
                        <li>nombre: {userDatos.nombre} <button className="btn-actualizar" onClick={actualizarNombre} > actualizar</button></li>
                        <li>apellido: {userDatos.apellido} <button className="btn-actualizar" onClick={actualizarApellido} > actualizar</button></li>
                        <li>email: {userDatos.email} <button className="btn-actualizar" onClick={actualizarEmail} > actualizar</button></li>
                        <li>nombre de usuario: {userDatos.username} <button className="btn-actualizar" onClick={actualizarUsername} > actualizar</button></li><br /><br />
                        <p>¿Quieres eliminar tu cuenta? <button className="btn-eliminar" onClick={eliminarCuenta}> Eliminar cuenta</button></p>
                    </ul>
                    
                </div>
            )}
            </div>
        </div>
    );
}





