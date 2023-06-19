import '../styles/caja.css';

export default function CajaUser(props){

    return(
        <div className="caja">
            <img  />
            <div className='detalles'>
                <h3 className='nombre-producto'></h3>
                <div>
                    <p>ID: {props.idzapatilla}</p>
                    <p>Marca: {props.marca}</p>
                    <p>Nombre: {props.nombre}</p>
                    <p>Color: {props.color}</p>
                    <p>Talle: {props.talle}</p>
                    <p>Precio: {props.precio}</p>
                </div>
                    <button className='btn-comprar'>Comprar</button>                               
            </div>
        </div>
    );
}