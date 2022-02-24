import styled from 'styled-components';

const Contenedor = styled.div`
    background: #fff;
    width: 90%;
    max-width: 80rem; /*1110px*/
    height: 90vh;
    max-height: 60rem;  /* 800px */
    overflow-y: auto;
    box-shadow: 0px 1.25rem 2.5rem rgba(0,0,0,.05);
    border-radius: 0.625rem; /* 10px */
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    z-index: 100;
    
    ::-webkit-scrollbar{
	transition: .3s ease all;
	width: 8.5px;
	background: rgba(125, 206, 160, 0.363);
    }

    ::-webkit-scrollbar-thumb{
	background: rgba(43, 161, 137, 0.6);
	border-radius: 8.5px;
    }
 
    @media(max-width: 60rem){ /* 950px */
        max-height: none;
        height: 90vh;
        margin-bottom: 4.5rem;
    }

    body.dark & {
		background: rgba(43, 42, 42, 0.6);
        color: white;
	}
    
`;

export default Contenedor;