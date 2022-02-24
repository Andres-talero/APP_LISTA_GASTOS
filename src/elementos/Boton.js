import styled from "styled-components";
import { Link } from "react-router-dom";


const Boton = styled(Link)`
    background: ${(props) => props.primario ? '#2BA189' : props.danger ? '#C0392B' : '#000'};
    width: ${(props) => props.conIcono ? '15.62rem' : 'auto'}; /* 250px */
    margin: 0.3rem; /* 10px */
    border: none;
    border-radius: 0.625rem; /* 10px */
    color: #fff;
    font-family: 'Work Sans', sans-serif;
    height: 3.75rem; /* 60px */
    padding: 1.25rem 1.87rem; /* 20px 30px */
    font-size: 1.25rem; /* 20px */
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    outline: none;
 
    svg {
        height: ${(props) => props.iconoGrande ? '100%' : '0.75rem;'};  /* 12px */
        margin-left: 0.3rem;
        fill: white;
    }

    @media(max-width: 30rem){ /* 475px */
        font-size: 1rem; /* 19.2px */
          padding: 1rem 1.4rem; /* 20px 30px */
    }

    :hover{
        color: white;
        border-radius: 1rem;
        box-shadow: 0 6px 10px ${(props) => props.primario ? 'rgba(43, 161, 137, 0.8)' : props.danger ? 'rgba(192, 57, 43, 0.8)' : 'rgba(0, 0, 0, 0.8)'};
        transition: all .4s ease-in-out;
    }

`;

export default Boton;