import '../styles/caja.css';

export default function CajaUser(){

    return(
        <div className="caja">
            <img  />
            <div className='detalles'>
                <h3 className='nombre-producto'></h3>
                <p className='precio-antes'>Antes: $<del></del></p>
                <p>Ahora: $</p><br/>
                    <button className='btn-comprar'>Comprar</button>                               
            </div>
        </div>
    );
}
