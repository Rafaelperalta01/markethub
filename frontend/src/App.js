import Main from './components/main';
import './App.css';
import {  BrowserRouter,Route, Routes } from 'react-router-dom'
import Registro from './pages/registrarse';
import IniciarSesion from './pages/iniciar-sesion';

 
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/registrarse' element={<Registro />} />
          <Route path='/iniciar-sesion' element={< IniciarSesion/>} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;



