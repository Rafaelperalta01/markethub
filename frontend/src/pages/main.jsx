import "../styles/main.css";
import Navbar from "../components/nav";


export default function Main() {
  return (
    <div className="container">
      <Navbar />
      <div className='products' >
        <div className='subnav'>
          <ul>
            <li>Men</li>
            <li>Women</li>
            <li>Kid</li>
          </ul>
        </div>
      </div>

      <div className="main1">
        <div className="parrafos">
          <p className="title">Bienvenido a <b>FitClothes</b></p> <br /> <p>Tu destino para compras online</p>
          <p>Renueva tu estilo con moda de calidad y precios irresistibles en
          FitClothes. <br />Marca tendencia y destaca con nuestras prendas exclusivas.</p>
          <div className="botones">
            <a href="#productos"><button>Ver productos</button></a>
            <a href="#coments"><button>Ver recomendaciones</button></a>
          </div>
        </div>
        <div className="xo">

        </div>
      </div>
      <div className="main2" id="productos">

      </div>

    </div>
  );
}
