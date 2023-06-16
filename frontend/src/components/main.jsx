import '../styles/main.css';
import img1 from '../images/main/img1.jpg'
import Navbar from './nav';


export default function Main(){
    return(
        <>
            <Navbar />
            <div className='main1'>
                <p>Bienvenido a MarketHub, tu destino para compras y ventas en línea.</p>
                {/*<img className='img1' src={img1}  />*/} 
            </div>
        </>
    );
}



