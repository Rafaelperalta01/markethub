import Main from './pages/main';
import './App.css';
import {  BrowserRouter,Route, Routes } from 'react-router-dom'
import Registro from './pages/registrarse';
import IniciarSesion from './pages/iniciar-sesion';
import NotFound from './pages/notFound';
import UserInterface from './pages/ui';
import ComprarProducto from './pages/comprar';
import Footer from './components/footer';


 
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
          <Route path='/usuario/:id/:producto' element={< ComprarProducto/>} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
