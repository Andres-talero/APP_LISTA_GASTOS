import React from 'react';
import Boton from './Boton';
import BotonCerrarSesion from './BotonCerrarSesion';
import styled from 'styled-components';



const BotonNavbar = ({boton}) => {

    switch(boton){
        case 'categorias' :
            return <Boton to="/categorias" primario="true">Categorias</Boton>;
        case 'lista' :
            return <Boton to="/lista" primario="true">Gastos</Boton>;
        case 'registro' :
                return <Boton to="/crear-cuenta" primario="true">Registrarse</Boton>
        case 'cerrarSesion' :
            return <BotonCerrarSesion/>;
        default:
            break;
    }
    
}
 
export default BotonNavbar;