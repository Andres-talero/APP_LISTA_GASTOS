import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import {Header, Titulo, ContenedorHeader} from './../elementos/Header'
import Boton from '../elementos/Boton';
import {Formulario, Input, ContenedorBoton} from './../elementos/ElementosDeFormulario'
import {ReactComponent as SvgLogin} from './../imagenes/login.svg'
import { useNavigate } from 'react-router';
import Alerta from '../elementos/Alerta';
import {auth} from './../firebase/firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavBot } from '../contextos/NavBotContext';


const Svg = styled(SvgLogin)`
  width: 100%;
  max-height: 12.5rem; /* 200 px */
  margin-bottom: 1.25rem; /* 20px */
`


const InicioSesion = () => {

  const navigate = useNavigate();
  const [correo, establecerCorreo] = useState('');
  const [password, establecerPassword] = useState('');
  const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
  const [alerta, cambiarAlerta] = useState({});

  const {cambiarBotones} = useNavBot();

  useEffect(() => {
    
      cambiarBotones([
        {name: 'registro'},
      ]);

  }, [])


  const handleChange = (e) => {

    if(e.target.name === 'email'){
      establecerCorreo(e.target.value);
    } else if (e.target.name === 'password'){
      establecerPassword(e.target.value)
    }

  }


  const handleSubmit = async (e) => {

    e.preventDefault();

    cambiarEstadoAlerta(false);
    cambiarAlerta({});

    //Comprobamos del lado del cliente que el correo sea valido.
    const expresionRegularCorreo = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
    if( !expresionRegularCorreo.test(correo) ){
      cambiarEstadoAlerta(true);
      cambiarAlerta({tipo: 'error', mensaje: 'Por favor ingresa un correo electronico valido'});
      return;
    }
    if(correo === '' || password === ''){
      cambiarEstadoAlerta(true);
      cambiarAlerta({tipo: 'error', mensaje: 'Por favor rellena todos los datos'});
      return;
    }

    try{
      await signInWithEmailAndPassword(auth, correo, password);
      navigate('/');
    } catch(error){
      let mensaje;
      switch(error.code){
        case 'auth/wrong-password':
          mensaje = 'La contraseña no es correcta';
        break;
        case 'auth/user-not-found':
            mensaje = 'No se encontro ninguna cuenta con este correo';
        break;
        default:
          mensaje = 'Hubo un error al iniciar sesión';
        break;
      }

      cambiarEstadoAlerta(true);
      cambiarAlerta({tipo: 'error', mensaje: mensaje});

    }

  }


    return (
      <>
      <Helmet>
        <title>Iniciar Sesión</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Iniciar Sesión</Titulo>
          <div>
            <Boton to="/crear-cuenta">Registrarse</Boton>
          </div>
        </ContenedorHeader>
      </Header>

      <Formulario onSubmit={handleSubmit}>
        <Svg />
        <Input
          type="email"
          name="email"
          placeholder='Correo Electronico'
          value={correo}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder='Contraseña'
          value={password}
          onChange={handleChange}
        />
        <ContenedorBoton>
          <Boton primario as="button" type="submit">Iniciar Sesión</Boton>
        </ContenedorBoton>
      </Formulario>
      <Alerta tipo={alerta.tipo} mensaje={alerta.mensaje} estadoAlerta={estadoAlerta} cambiarEstadoAlerta={cambiarEstadoAlerta}/>
      </>
      );
}
 
export default InicioSesion;