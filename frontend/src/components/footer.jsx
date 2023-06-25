import '../styles/footer.css';
import facebook from "../images/footer/facebook.png";
import instagram from "../images/footer/instagram.png";
import twitter from "../images/footer/twitter.png";

export default function Footer(){
    return(
        <footer className="footer">
        <h1>MarketHub</h1>
        <div className="container-img">
          <a href="http://facebook.com" target='_blanck' >
            <img src={facebook} alt="" />
          </a>
          <a href="http://instagram.com" target='_blanck' >
            <img src={instagram} alt="" />
          </a>
          <a href="http://twitter.com" target='_blanck' >
            <img src={twitter} alt="" />
          </a>
        </div>
        <div className="container-text">
          <p className="footer-parrafo">Copyright 2023</p>
        </div>
      </footer>
    )
}