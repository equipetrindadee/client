import React, { useState, useEffect } from 'react';
import "../cardPerfil/cardPerfil.css"

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, getDoc, doc } from 'firebase/firestore';
import { jwtDecode } from 'jwt-decode'; // Importando jwtDecode
import api from "../../../../../config/configApi";

const firebaseConfig = {
    apiKey: "AIzaSyBNIaO0le5Mn4UDxWX32YDoY_b4xNZikDg",
    authDomain: "reactfirebase-140c5.firebaseapp.com",
    projectId: "reactfirebase-140c5",
};
  
// Inicialização do Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function CardPerfilUserAlunoDescription() {
    const [alunos, setAlunos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          await fetchUserData();
        };
        fetchData();
    }, []);

    const fetchUserData = async () => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            try {
                const decoded = jwtDecode(storedToken);
                const userId = decoded.id;
                const docRef = doc(db, "users", userId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setAlunos(userData); // Salva apenas o usuário logado
                }
            } catch (error) {
                console.error("Erro ao decodificar o token ou consultar o Firestore:", error);
            }
        }
    };

    return (
        <div>
            {alunos && (
            <div key={alunos.id} className="cadPerfilUserAlunoDescription-infos">
                <button
                    type="button"
                    className="cadPerfilUserAlunoDescription-button"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                >
                    <p>Perfil</p>
                </button>
                <div className="cadPerfilUserAlunoDescription-body-info">
                    <img
                        src={alunos.imagemUrl}
                        className=""
                        width="50"
                        height="50"
                        alt="Imagem do Perfil"
                    />
                    <h5 className="card-title">{alunos.name}</h5> {/* Nome do usuário logado */}
                </div>
            </div>
            )}
        </div>
    )
}

export default CardPerfilUserAlunoDescription;
