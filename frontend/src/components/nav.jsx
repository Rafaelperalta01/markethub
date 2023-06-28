import '../styles/navbar.css'
import { Link } from 'react-router-dom';


export default function Navbar(){
    return(
        <div className="main-barra">
                <h1><Link to={'/'} className='link'>MarketHub</Link></h1>
                <div className='main-barra-links'>
                    <p><Link to={'/registrarse'} className='link'>Registrarse</Link></p>
                    <p><Link to={'/iniciar-sesion'} className='link'>Iniciar Sesion</Link></p>
                </div>
        </div>
    );
}




