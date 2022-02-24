import { db } from "./firebaseConfig"
import {doc, deleteDoc} from 'firebase/firestore'


const borrarGasto = async(id) => {
    try{
        await deleteDoc(doc(db, 'gastos', id))
        } catch(error){
            console.log('Se presento el error:')
            console.log(error)
        }

}

export default borrarGasto;