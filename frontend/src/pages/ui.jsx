import { useLocation, Link } from "react-router-dom";
import CajaUser from "../components/caja";
import '../styles/ui.css';
import '../styles/navbar.css'
import axios from "axios";
import { useState } from "react";



export default function UserInterface(){

    const [producto, setProducto] = useState('')


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
    
    return(
        <div className="all">
            <div className="main-barra">
                <h1><Link to={'/'} className='link'>MarketHub</Link></h1>
                <div className='main-barra-links'>
                    <p><Link className="link" to={'/'}>cerrar sesion</Link></p>
                </div>
            </div>
            <p className="saludo">Bienvenido, {userDatos.nombre}</p>
            <div className="productos">
                <ul>
                    <li onClick={obtenerZapatillas}>Zapatillas</li> {/* evento click que realiza la solicitud al back con la funcion creada*/}
                    <li onClick={obtenerIndumentaria}>Indumentaria</li>
                    <li>Promos</li>
                </ul>
            </div>
            <p className="msj-promo">ESTAS SON LAS PROMOS PARA USUARIOS:</p>
            <div className='promos'>
            {producto === 'zapatillas' && (
                <div className='promos'>
                    {listaZapas.map((zapas, index) => (
                        <div key={index}>
                            <p>ID: {zapas.idzapatilla}</p>
                            <p>Marca: {zapas.marca}</p>
                            <p>Nombre: {zapas.nombre}</p>
                            <p>Color: {zapas.color}</p>
                            <p>Talle: {zapas.talle}</p>
                            <p>Precio: {zapas.precio}</p>
                        </div>
                    ))}
                </div>
            )}
            {producto === 'indumentaria' && (
                <div className='promos'>
                    {listaIndumentaria.map((ind, index) => (
                        <div key={index}>
                            <p>ID : {ind.idpruducto}</p>
                            <p>Categoria: {ind.categoria}</p>
                            <p>Nombre: {ind.nombre}</p>
                            <p>Color: {ind.color}</p>
                            <p>Precio: {ind.precio}</p>
                        </div>
                    ))}
                </div>
            )}
            </div>
        </div>
    );
}





