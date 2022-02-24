import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Contenedor from './elementos/Contenedor';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import InicioSesion from "./componentes/InicioSesion"
import GastosPorCategoria from "./componentes/GastosPorCategoria"
import EditarGasto from "./componentes/EditarGasto"
import ListaDeGastos from "./componentes/ListaDeGastos"
import RegistroUsuarios from "./componentes/RegistroUsuarios"
import { Helmet } from 'react-helmet';
import favicon from './imagenes/logo.png';
import Fondo from './elementos/Fondo';
import { AuthProvider } from './contextos/AuthContext';
import RutaPrivada from './componentes/RutaPrivada'
import { NavBotProvider } from './contextos/NavBotContext';
import {TotalGastadoProvider} from './contextos/TotalGastadoEnElMesContext';
import HeaderNavbar from './elementos/HeaderNavbar';


const Index = () => {
  return ( 
    <>
    <Helmet>
      <link rel="shortcut icon" href={favicon} type="image/x-icon"/>
    </Helmet>

    <AuthProvider>
    <TotalGastadoProvider>
     <NavBotProvider>
      <BrowserRouter>
      {/* <HeaderNavbar /> */}
      <div className='contendorP'>
      <Contenedor>
        <Routes>
          <Route path="/iniciar-sesion" element={<InicioSesion />}/>
          <Route path="/crear-cuenta" element={<RegistroUsuarios />}/>

          <Route path="/categorias" element={
            <RutaPrivada>
              <GastosPorCategoria />
            </RutaPrivada>
          }/>
          <Route path="/lista" element={
            <RutaPrivada>
              <ListaDeGastos />
            </RutaPrivada>
          }/>
          <Route path="/editar/:id" element={
            <RutaPrivada>
              <EditarGasto />
            </RutaPrivada>
          }/>
          <Route path="/" exact={true} element={
            <RutaPrivada>
              <App />
            </RutaPrivada>
          }/>
          
          <Route path="*" element={<InicioSesion />} />

        </Routes>
      </Contenedor>
      </div>
      </BrowserRouter>
      </NavBotProvider>
    </TotalGastadoProvider>
    </AuthProvider>

      <Fondo />
    </>
   );
}
 
export default Index;

ReactDOM.render(<Index />, document.getElementById('root'));
