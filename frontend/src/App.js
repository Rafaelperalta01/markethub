import Main from './pages/main';
import './App.css';
import {  BrowserRouter,Route, Routes } from 'react-router-dom'
import Registro from './pages/registrarse';
import IniciarSesion from './pages/iniciar-sesion';
import Userlog from './pages/ui';
import NotFound from './pages/notFound';
import UserInterface from './pages/ui';

 
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/registrarse' element={<Registro />} />
          <Route path='/iniciar-sesion' element={< IniciarSesion/>} />
          <Route path='/usuario' element={< UserInterface/>} />
          <Route path='/usuario/:id' element={< UserInterface/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
