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
            <div class="caja-pago">
                <h2>Pago con tarjeta</h2>
                <form>
                <label for="nombre-titular">Nombre del titular:</label>
                <input type="text" id="nombre-titular" required />

                <label for="numero-tarjeta">Número de tarjeta:</label>
                <input type="text" id="numero-tarjeta" required />

                <label for="fecha-expiracion">Fecha de expiración:</label>
                <input type="text" id="fecha-expiracion" required />

                <label for="cvv">CVV:</label>
                <input type="text" id="cvv" required />

                <button type="submit">Pagar</button>
                </form>
            </div>
            </div>
            
            
        </>
        
    )
}




