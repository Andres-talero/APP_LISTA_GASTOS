import {useState, useEffect} from 'react';
import {db} from './../firebase/firebaseConfig';
import { collection, onSnapshot, query, where, orderBy, limit, startAfter } from 'firebase/firestore';
import {useAuth} from './../contextos/AuthContext'

const useObtenerGastos = () => {

    const {usuario} = useAuth();
    const [gastos, cambiarGastos] = useState([]);
    const [ultimoGasto, cambiarUltimoGasto] = useState(null);
    const [hayMasPorCargar, cambiarhayMasPorCargar] = useState(false);

    const obtenerMasGastos = () =>{

        const consultaMas = query(
            collection(db, 'gastos'),
            where('uidUsuario', '==', usuario.uid),
            orderBy('fecha', 'desc'),
            limit(10),
            startAfter(ultimoGasto)
        );

         onSnapshot(consultaMas, (snapshot) => {
             //Tranferir data al estado
             if(snapshot.docs.length > 0){
                cambiarUltimoGasto(snapshot.docs[snapshot.docs.length -1]);
                cambiarGastos(gastos.concat(snapshot.docs.map((gasto) => {
                    return {...gasto.data(), id: gasto.id}
                })));
             }else{
                 cambiarhayMasPorCargar(false);
             }
            
        });
    }

    useEffect(() => {

        const consulta = query(
            collection(db, 'gastos'),
            where('uidUsuario', '==', usuario.uid),
            orderBy('fecha', 'desc'),
            limit(10)
        );

        const unsuscribe = onSnapshot(consulta, (snapshot) => {

            if(snapshot.docs.length > 0){
                cambiarUltimoGasto(snapshot.docs[snapshot.docs.length -1]);
                cambiarhayMasPorCargar(true);
            } else{
                cambiarhayMasPorCargar(false);
            }

             //Tranferir data al estado
            cambiarGastos(snapshot.docs.map((gasto) => {
                return {...gasto.data(), id: gasto.id}
            }));
        });

        return unsuscribe;
        
    }, [usuario]);

    return [gastos, obtenerMasGastos, hayMasPorCargar];
}
 
export default useObtenerGastos;
