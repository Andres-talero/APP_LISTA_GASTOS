import React from 'react';
import styled from 'styled-components';
import theme from './../theme';
import convertirAMoneda from './../funciones/ConvertirAMoneda'
import {useTotalDelMes} from './../contextos/TotalGastadoEnElMesContext';

const BarraTotal = styled.div`
    background: ${theme.verde};
    font-size: 1.25rem; /* 20px */
    letter-spacing: 1px;
    font-weight: 500;
    text-transform: uppercase;
    padding: 0.62rem 2.25rem; /* 10px 40px */
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
 
    @media(max-width: 60rem){ /* 950px */
        /* flex-direction: column; */
        font-size: 12px;
        position: fixed;
        bottom: 0;
        width: 90vw;
        height: 3rem;
        border-radius: .5rem;
    }

    @media(max-width: 23rem) { /* 500px */
        height: 3.5rem;
        flex-direction: column;
        font-size: 10px;
        overflow-y: auto;
    }

`;

const Parrafo = styled.p`
    margin-top: 0.65rem;
    @media(max-width: 23rem) { /* 500px */
        margin: -2px;
    }
`;


const BarraTotalGastado = () => {
    const {total} = useTotalDelMes();

	return (
		<BarraTotal>
			<Parrafo>Total Gastado en el mes:</Parrafo>
			<Parrafo>{convertirAMoneda(total)}</Parrafo>
		</BarraTotal>
	);
}
 
export default BarraTotalGastado;