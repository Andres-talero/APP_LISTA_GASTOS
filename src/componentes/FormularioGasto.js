import React, {useState, useEffect} from 'react';
import {ContenedorFiltros, Formulario, Input, InputGrande, ContenedorBoton} from './../elementos/ElementosDeFormulario'
import Boton from '../elementos/Boton';
import {ReactComponent as IconoPlus} from './../imagenes/plus.svg';
import SelectCategorias from './SelectCategorias';
import DatePicker from './DatePicker';
import agregarGasto from '../firebase/agregarGasto';
import getUnixTime from 'date-fns/getUnixTime';
import fromUnixTime from 'date-fns/fromUnixTime';
import {useAuth} from './../contextos/AuthContext';
import Alerta from '../elementos/Alerta';
import { useNavigate } from 'react-router-dom';
import editarGasto from '../firebase/editarGasto';

const FormularioGasto = ({gasto}) => {


    const [inputDescripcion, cambiarInputDescripcion] = useState('');
    const [inputCantidad, cambiarInputCantidad] = useState('');
    const [categoria, cambiarCategoria] = useState('Hogar');
    const [fecha, cambiarFecha] = useState(new Date());
    const {usuario} = useAuth();
    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState({});
    const navigate = useNavigate();
    
    useEffect(() => {
        //Comprobamos si ya hay algun gasto
        //De ser así establecemos los estados con estps valores
        if(gasto){
            //Comprobamos si el gasto es del usuario actual.
            //Comprobamos con el uid que tenemos guardado con el del uid del gasto
            if(gasto.data().uidUsuario === usuario.uid){
                cambiarCategoria(gasto.data().categoria);
                cambiarInputDescripcion(gasto.data().descripcion);
                cambiarInputCantidad(gasto.data().cantidad)
                cambiarFecha(fromUnixTime(gasto.data().fecha));
            } else {
                navigate('/lista');
            }
        }
    }, [gasto, usuario, navigate])

    const handleChange = (e) =>{

        switch(e.target.name){
            case "descripcion":
                cambiarInputDescripcion(e.target.value);
            break;
            case "cantidad" :
                cambiarInputCantidad(e.target.value.replace(/[^0-9.]/g, ''));
            break;
            default : 
            break;
        }


    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let cantidad = parseFloat(inputCantidad).toFixed(2);


        //Comprobamos que hayan valores en descripción y valor

        if(inputDescripcion !== '' && inputCantidad !== ''){

            if(cantidad){

                if(gasto){
                    editarGasto({
                        id: gasto.id,
                        categoria: categoria,
                        descripcion: inputDescripcion,
                        cantidad: cantidad,
                        fecha: getUnixTime(fecha)
                    }).then(() =>{
                        navigate("/lista");
                    }).catch((error) => {
                        console.log(error);
                    })
                } else {
                    agregarGasto({
                        categoria: categoria,
                        descripcion: inputDescripcion,
                        cantidad: cantidad,
                        fecha: getUnixTime(fecha),
                        uidUsuario: usuario.uid
                    })
                    .then(() => {
                        cambiarCategoria('hogar');
                        cambiarInputDescripcion('');
                        cambiarInputCantidad('');
                        cambiarFecha(new Date());
    
                        cambiarEstadoAlerta(true);
                        cambiarAlerta({tipo: 'exito', mensaje: 'El gasto fue agregado correctamente.'});
                    })
                    .catch((error) => {
                        cambiarEstadoAlerta(true);
                        cambiarAlerta({tipo: 'error', mensaje: 'Hubo un problema al agregar el gasto.'})
                    })
                }
            }else{
                cambiarEstadoAlerta(true);
                cambiarAlerta({tipo: 'error', mensaje: 'El valor que ingresaste no es correcta.'});
            }

            
        } else{
            cambiarEstadoAlerta(true);
            cambiarAlerta({tipo: 'error', mensaje: 'Por favor rellena todos los campos.'});

        }
    }

    return ( 
        <Formulario onSubmit={handleSubmit}>
            <ContenedorFiltros>
                <SelectCategorias categoria={categoria} cambiarCategoria={cambiarCategoria}/>
                <DatePicker fecha={fecha} cambiarFecha={cambiarFecha}/>
            </ContenedorFiltros>

            <div>
                <Input 
                    type="text"
                    name="descripcion"
                    placeholder="Descripcion"
                    autoComplete='off'
                    value={inputDescripcion}
                    onChange={handleChange}
                />
                <InputGrande 
                    type="text"
                    name="cantidad"
                    placeholder="$0.00"
                    autoComplete='off'
                    value={inputCantidad}
                    onChange={handleChange}
                />
            </div>
            <ContenedorBoton>
                <Boton as="button" primario conIcono>{gasto ? 'Editar gasto' : 'Agregar Gasto'} <IconoPlus /></Boton>
            </ContenedorBoton>
            <Alerta 
                tipo={alerta.tipo}
                mensaje={alerta.mensaje}
                estadoAlerta={estadoAlerta}
                cambiarEstadoAlerta={cambiarEstadoAlerta}
            />

        </Formulario>
     );
}
 
export default FormularioGasto;