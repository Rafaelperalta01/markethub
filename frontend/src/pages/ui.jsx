import { useLocation } from "react-router-dom";
import Navbar from "../components/nav";
import CajaUser from "../components/caja";
import '../styles/ui.css';




export default function UserInterface(){
    
    const location = useLocation();
    const { datos } = location.state; //recibo los datos enviados de la variable state.

    const userDatos = JSON.parse(datos); //creo una variable que contenga los datos y los convierto en json, ya puedo acceder a los datos desde la variable creada.

    return(
        <div>
            <Navbar />
            <p className="saludo">Bienvenido, {userDatos.nombre}</p>
            <p className="msj-promo">ESTAS SON LAS PROMOS PARA USUARIOS:</p>
            <div className='promos'>
                
                <CajaUser />
                <CajaUser />
                <CajaUser />
                <CajaUser />
                <CajaUser />
                <CajaUser />
                <CajaUser />
                <CajaUser />
                <CajaUser />
            </div>
            
        </div>
    );

}





