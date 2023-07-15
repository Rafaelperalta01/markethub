import "../styles/main.css";
import img1 from "../images/main/img.svg";
import Navbar from "../components/nav";
import Caja from "../components/cajamain2";
import { Link } from "react-router-dom";
import buzoNike from "../images/main/buzo.png";
import pumaSuede from "../images/zapatillas/pumasuede.png";
import conjunto from "../images/main/conjuntopuma.png";
import Comentarios from "../components/comentarios";

export default function Main() {
  return (
    <div className="container">
      <Navbar />
      <div className="main1">
        <p className="parrafo1">
          Bienvenido a MarketHub
          <br /> tu destino para compras y ventas en línea.
        </p>
        <img className="img1" src={img1} />
        <p className="parrafo2">
          Renueva tu estilo con moda de calidad y precios irresistibles en
          MarketHub. Marca tendencia y destaca con nuestras prendas exclusivas.
        </p>
        {/*div para dar forma curva  */}
        <div className="custom-shape-divider-bottom-1686963139">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 190"
            preserveAspectRatio="none">
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"></path>
          </svg>
        </div>
      </div>
      <div className="main2">
        <p className="parrafo3">
          Los productos más pedidos por nuestros clientes
        </p>
        <div className="cajas">
          <Caja img={buzoNike} />
          <Caja img={pumaSuede} />
          <Caja img={conjunto} />
        </div>
      </div>
      <div className="main3">
        <div className="cajamain3">
          <p className="parrafo4">
            Tenemos las mejores ofertas y precios para vos pero primero tenés
            que ser usuario y registrarte
          </p>
          <a>
            <Link className="btn-registrar" to={"/registrarse"}>
              Registrate aquí
            </Link>
          </a>
        </div>
      </div>
      <div className="usuarios">
        <div className="container-comentarios">
        <Comentarios usuario="Lucas Cordoba" comentario="Excelentes productos !!!"/>
        <Comentarios usuario="Mauro Drube"/>
        <Comentarios usuario="Ramiro Diaz" comentario="Muy buena atencion y calidad de productos, super recomendable"/>
        </div>
      </div>
    </div>
  );
}
