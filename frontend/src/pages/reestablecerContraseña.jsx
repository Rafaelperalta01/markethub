// import axios from 'axios';
import '../styles/reeContraseña.css';



export default function ReestablecerContraseña() {

  // const enviarEmail = (e) => {
  //   e.preventDefault();
  //   axios.post('http://localhost:3001/reestablecer-contraseña',{
      
  //   })
  // }

  return (
    <div className='RC'>
      <div className="rc-cont">
        <h1>Reestablecer contraseña</h1>
        <label htmlFor="">Ingresa tu correo</label>
        <input type="email" />
      </div>
    </div>
  );
}
