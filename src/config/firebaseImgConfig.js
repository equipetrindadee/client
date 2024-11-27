// firebaseImgConfig.js
import { initializeApp, getApps } from "firebase/app"; // Importar getApps
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBNIaO0le5Mn4UDxWX32YDoY_b4xNZikDg",
  authDomain: "reactfirebase-140c5.firebaseapp.com",
  projectId: "reactfirebase-140c5",
  storageBucket: "reactfirebase-140c5.appspot.com",
  messagingSenderId: "1072804392777",
  appId: "1:1072804392777:web:03c3269e8d6615d2563498",
  measurementId: "G-VRM6H5BV4Y"
};

// Verifique se o Firebase já foi inicializado
const app = (() => {
  if (!getApps().length) { // Correção aqui
    return initializeApp(firebaseConfig);
  } else {
    return getApps()[0]; // Retorna a primeira instância existente
  }
})();

// Inicializa o Firestore e o Storage
const db = getFirestore(app);
const storage = getStorage(app);

// Exporta as instâncias
export { db, storage };
