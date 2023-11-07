import '../styles/box.css'
import img from '../images/zapatillas/zapa.png'
import { useNavigate } from 'react-router-dom';

export default function Box(props){

    const nombre = props.nombre;
    const precio = props.precio;
    const cuotas = Math.floor(props.precio / 3);
    
    const url = useNavigate();
    const verProducto = () => {
        const URL = window.location.pathname + `/${props.nombre}`
        url(URL, { state : props });
    }

    return(
        <div className="box">
            <div>
                <img onClick={verProducto} className='img' src={img} alt="" />
            </div>
            <div className='descripcion'>
                <p className='desc-nombre'>{nombre}</p>
                <p className='desc-precio'>${precio}</p>
                <p className='desc-cuotas'>3 cuotas de ${cuotas}</p>
                {props.envioGratis ? <p className='desc-envio'>Envío gratis</p> : <p></p> }
            </div>
        </div>
    )
}
