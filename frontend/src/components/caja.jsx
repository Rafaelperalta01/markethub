import { useNavigate } from 'react-router-dom';
import ass from '../images/zapatillas/2.jpg'
import as from '../images/main/buzo.png'
import '../styles/caja.css';




export default function CajaUser({ props }){
    //caja para mostrar zapatillas
    const comprar = useNavigate();
    const verProducto = () => {
       
        const urln = window.location.pathname+ `/${props.nombre}`; //ruta actual agregandole otro camino para comprar
        comprar(urln, {state: props }) //paso url y un objeto state para pasar los datos a la nueva url
    }
    return(
        <div className="caja">
            <div className='detalles'>
                    <img className='zaa' src={ass} alt="zapa" />
                    <button className='btn-comprar' onClick={ verProducto }>Comprar</button>                               
            </div>
        </div>
    );
}

//caja para mostrar indumentaria
export function CajaIndumentaria({props , producto}){
    const comprar = useNavigate();
    const verProducto = () => {
        const urln = window.location.pathname+ `/${props.nombre}`;
        comprar(urln, {state : props , producto})
    }

    return(
        <div className="caja">
            <div className='detalles'>
            <img className='zaa' src={as} alt="" />
                    <button className='btn-comprar' onClick={ verProducto }>Comprar</button>                               
            </div>
        </div>
    );
}

