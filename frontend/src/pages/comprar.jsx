import { useLocation } from "react-router-dom"
import '../styles/comprar.css';


export default function ComprarProducto(){

    const location = useLocation(); //uselocation para recibir los datos
    const datos = location.state; //almacenar los datos en una varialbe

    return(
        <>
            <nav className="nav">Estas a un paso de comprar tu producto</nav>
            <div className="caja-padre">
                <div className="caja-producto">

                </div>

                <div className="detalles-producto">
                    <h2>DETALLES</h2><hr />
                    <p>Marca: {datos.marca}</p>
                    <p>Nombre: {datos.nombre}</p>
                    <p>Color: {datos.color}</p>
                    <p>Talle: {datos.talle}</p>
                    <p>precio: ${datos.precio}</p>
            </div>
            <div className="caja-pago">
                <h2>Pago con tarjeta</h2>
                <form>
                <label htmlFor="nombre-titular">Nombre del titular:</label>
                <input type="text" id="nombre-titular" required />

                <label htmlFor="numero-tarjeta">Número de tarjeta:</label>
                <input type="text" id="numero-tarjeta" required />

                <label htmlFor="fecha-expiracion">Fecha de expiración:</label>
                <input type="text" id="fecha-expiracion" required />

                <label htmlFor="cvv">CVV:</label>
                <input type="text" id="cvv" required />

                <button type="submit">Pagar</button>
                </form>
            </div>
            </div>
        </>
    )
}
