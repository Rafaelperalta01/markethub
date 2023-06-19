import { useLocation, Link } from "react-router-dom";
import CajaUser from "../components/caja";
import '../styles/ui.css';
import '../styles/navbar.css'
import axios from "axios";
import { useState } from "react";



export default function UserInterface(){

    const [lista, setLista] = useState([]); //creo array para guardar las zapatillas que reciba


    const location = useLocation();
    const { datos } = location.state; //recibo los datos enviados de la variable state.

    const userDatos = JSON.parse(datos); //creo una variable que contenga los datos y los convierto en json, ya puedo acceder a los datos desde la variable creada.

    const obtenerZapatillas = () =>{
        axios.get('http://localhost:3001/zapa') //hago solicitud get al back para obtener las zapatillas
        .then(result =>{ setLista((result.data))}) //guardo los resultados del back en setLista
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
                    <li>Indumentaria</li>
                    <li>Promos</li>
                </ul>
            </div>
            <p className="msj-promo">ESTAS SON LAS PROMOS PARA USUARIOS:</p>
            <div className='promos'>
            {lista.map((promo, index)=>(  //lista es el array que almacena todas las zapas y uso map para iterar ese array
                <div key={index}>
                    <p>ID: {promo.idzapatilla}</p>
                    <p>Marca: {promo.marca}</p>
                    <p>Nombre: {promo.nombre}</p>
                    <p>Color: {promo.color}</p>
                    <p>Talle: {promo.talle}</p>
                    <p>Precio: {promo.precio}</p>
                </div>
            ))}
            </div>
        </div>
    );
}





