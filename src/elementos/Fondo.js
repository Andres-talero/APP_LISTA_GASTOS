import React from 'react';
import styled from 'styled-components';
import {ReactComponent as Puntos} from './../imagenes/puntos.svg'

const Svg = styled.svg`
    height: 50vh;
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 0;
    path {
        fill: rgba(69,179,157, .15);
    }
`;
 
const PuntosArriba = styled(Puntos)`
    width: 10%;
    height: auto;
    position: fixed;
    z-index: 1;
    top: 3rem; /* 40px */
    left: 3rem; /* 40px */
    fill: grey;
`;
 
const PuntosAbajo = styled(Puntos)`
    width: 10%;
    height: auto;
    position: fixed;
    z-index: 1;
    bottom: 3rem; /* 40px */
    right: 3rem; /* 40px */
    fill: grey;
`;

const Fondo = () => {
    return (
        <>
            {/* <PuntosArriba /> */}
            <Svg 
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio='none'>
                <path  fillOpacity="1" d="M0,0L48,26.7C96,53,192,107,288,138.7C384,171,480,181,576,154.7C672,128,768,64,864,53.3C960,43,1056,85,1152,106.7C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                > </path>
            </Svg>
            {/* <PuntosAbajo /> */}
        </>
      );
}
 
export default Fondo;