import React, {useEffect, useState} from 'react';
import { Helmet } from 'react-helmet';
import {Header, Titulo, ContenedorHeader, ContenedorBotones} from './elementos/Header'
import Boton from './elementos/Boton'
import BotonCerrarSesion from './elementos/BotonCerrarSesion';
import FormularioGasto from './componentes/FormularioGasto';
import { useNavBot } from './contextos/NavBotContext';
import BarraTotalGastado from './componentes/BarraTotalGastado';

const App = () => {

  const {cambiarBotones} = useNavBot();

  useEffect(() => {
    
      cambiarBotones([
        {name: 'categorias'},
        {name: 'lista'},
        {name: 'cerrarSesion'}
      ]);

  }, [])


  return (
      <>
      <Helmet>
        <title>Agregar Gasto</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Agregar Gasto</Titulo>
          <ContenedorBotones>
            <Boton to="/categorias">Categorias</Boton>
            <Boton to="/lista" type="submit">Gastos</Boton>
            <BotonCerrarSesion></BotonCerrarSesion>
          </ContenedorBotones>
        </ContenedorHeader>
      </Header>

      <FormularioGasto />
      <BarraTotalGastado />
      </>
    );
}

 
export default App;