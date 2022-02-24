import { db } from './../firebase/firebaseConfig'
import { doc, updateDoc } from 'firebase/firestore';

const editarGasto = async ({id, categoria, descripcion, cantidad, fecha}) => {
    return await ( 
        updateDoc(doc(db, 'gastos',id), {
            categoria: categoria,
            descripcion: descripcion,
            cantidad: Number(cantidad),
            fecha: fecha,
        })

    );
}
 
export default editarGasto;