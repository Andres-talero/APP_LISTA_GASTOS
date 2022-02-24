import React, { useContext, useEffect, useState } from 'react';

//Creamos estado global
const NavBotContext = React.createContext();



// Hook para acceder al contexto

const useNavBot = () =>{
    return useContext(NavBotContext);
}


//proveedor del estado

const NavBotProvider = ({children}) => {

    const [Botones, cambiarBotones] = useState([
        {name: 'registro'}
    ]);

    

    return ( 
        <NavBotContext.Provider value={{Botones, cambiarBotones}}>
            {children}
        </NavBotContext.Provider>
     );
    
}
 
export {NavBotProvider, NavBotContext, useNavBot};