import { useNavigate } from 'react-router-dom';
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
                    <button className='btn-comprar' onClick={ verProducto }>Comprar</button>                               
            </div>
        </div>
    );
}

