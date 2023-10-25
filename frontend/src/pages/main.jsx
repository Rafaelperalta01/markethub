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
        <div className="parrafos">
          <p className="title">Bienvenido a <b>MarketHub</b></p> <br /> <p>Tu destino para compras online</p>
          <p>Renueva tu estilo con moda de calidad y precios irresistibles en
          MarketHub. <br />Marca tendencia y destaca con nuestras prendas exclusivas.</p>
          <div className="botones">
            <a href="#productos"><button>Ver productos</button></a>
            <a href="#coments"><button>Ver recomendaciones</button></a>
          </div>
        </div>
        <div className="xo">
          <img className="img1" src={img1} />
        </div>
      </div>
      <div className="main2" id="productos">
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
      <div className="usuarios" id="coments">
        <div className="container-comentarios">
        <Comentarios usuario="Lucas Cordoba" comentario="Excelentes productos !!!"/>
        <Comentarios usuario="Mauro Drube"/>
        <Comentarios usuario="Ramiro Diaz" comentario="Muy buena atencion y calidad de productos, super recomendable"/>
        </div>
      </div>
    </div>
  );
}
