import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.css'
import { Navbar, Nav, Container } from 'react-bootstrap';
import BotonNavbar from './BotonNavbar';
import { useNavBot } from '../contextos/NavBotContext';

const HeaderNavbar = () => {

    const {Botones} = useNavBot();

    return ( 
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
            <Container>
            <Navbar.Brand href="#"><h3>SoftCore Count</h3></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                </Nav>
                <NavMedia>
                    {
                        Botones.map((boton) => {
                            return(
                                <BotonNavbar key={boton.name} boton={boton.name} />
                            );
                        })
                    }
        
                </NavMedia>
            </Navbar.Collapse>
            </Container>
            </Navbar>
        </>
     );
}

const NavMedia = styled(Nav)`

     @media(max-width: 60rem){ /* 950px */
        padding-top: 1.5rem;
        padding-bottom: 1.5rem;
    }

`;

 

export default HeaderNavbar;