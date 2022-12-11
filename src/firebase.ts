import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    getDocs,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBR7hP6N6NR_ECkPoKQ66_HUQh0UY7kIQ8",
  authDomain: "idam-actividad6-21001135.firebaseapp.com",
  projectId: "idam-actividad6-21001135",
  storageBucket: "idam-actividad6-21001135.appspot.com",
  messagingSenderId: "572988890313",
  appId: "1:572988890313:web:9715332fa7f0f8b23b0118"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export interface Contacto {
    id: string,
    casa: string,
    correo: string,
    direccion: string,
    movil: string,
    nombre: string,
}

export const getContactos = async (): Promise<Contacto[]> => {
   const contactos = {
    collection: collection(db, "contacto"),
    list: [] as Contacto[],
   };
   
   const snapshot = await getDocs(contactos.collection);
   snapshot.forEach(doc => {
    contactos.list.push({
      id: doc.id,
      ...doc.data(),
    } as Contacto);
   });

   return contactos.list; 
}
