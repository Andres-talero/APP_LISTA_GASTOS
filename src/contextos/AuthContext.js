import React, { useContext, useState, useEffect } from 'react';
import {auth} from './../firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

//Creamos estado global
const AuthContext = React.createContext();



// Hook para acceder al contexto

const useAuth = () =>{
    return useContext(AuthContext);
}


//proveedor del estado

const AuthProvider = ({children}) => {

    const [usuario, cambiarUsuario] = useState();

    //State para saber cuando termina de cargar la comprobación de usuario de Firebase.
    const [cargando, cambiarCargando] = useState(true);

    //Efecto para ejecutar la comprobación una unica vez.
    useEffect(() => {
        //Comprobamos si hay un usuario
        const cancelarSuscripcion = onAuthStateChanged(auth, (usuario) => {
            cambiarUsuario(usuario);
            // Solamente cargamos los elementos hijos despues de que se realice la comprobación del usuario y cuando se realiza hay si mostramos los elementos, cambiando el valor de cargando a false
            cambiarCargando(false);
        });

        return cancelarSuscripcion;

    }, []);

    return ( 
        <AuthContext.Provider value={{usuario: usuario}}>
            {!cargando && children}
        </AuthContext.Provider>
     );
}
 
export {AuthProvider, AuthContext, useAuth};