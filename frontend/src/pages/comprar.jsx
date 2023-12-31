import { useLocation, Link } from "react-router-dom"
import '../styles/comprar.css';
import img from '../images/zapatillas/zapa.png'


export default function ComprarProducto(){

    const location = useLocation(); //uselocation para recibir los datos
    const datos = location.state; //almacenar los datos en una varialbe
    const precioAntes = datos.precio - 4700;

    return(
        <>
            <div className="main-barra">
                <h1><Link to={'/'} className='link'>FitClothes</Link></h1>
                <div className='main-barra-links'>
                    <p className="frase-comprar">Estas a un paso de conseguir tu producto</p>
                </div>
                <div>
                    
                </div>
            </div>
            <div className="caja-padre-comprar">
                <div className="imagen-produc">
                    <img className="img" src={img} alt="" />
                </div>
                <div className="detalles">
                    <h1>{datos.nombre}</h1>
                    <p>${datos.precio} <strike> ${precioAntes}</strike></p>
                </div>
            </div>
        </>
    )
}
{/* <nav className="nav">Estas a un paso de comprar tu producto</nav>
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
            </div> */}