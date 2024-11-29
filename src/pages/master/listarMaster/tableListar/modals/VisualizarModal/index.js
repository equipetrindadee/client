import React, { useEffect, useState } from 'react';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import './VisualizarModal.css';

const firebaseConfig = {
    apiKey: "AIzaSyBNIaO0le5Mn4UDxWX32YDoY_b4xNZikDg",
    authDomain: "reactfirebase-140c5.firebaseapp.com",
    projectId: "reactfirebase-140c5",
};

// Inicialização do Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const VisualizarModal = ({ userId, closeModal }) => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        // Função para buscar os dados do usuário no Firestore
        const fetchUserData = async () => {
            try {
                const userDoc = doc(db, 'users', userId); // A coleção 'users' deve ser o nome da sua coleção de usuários no Firestore
                const userSnap = await getDoc(userDoc);
                if (userSnap.exists()) {
                    setUserInfo(userSnap.data());
                } else {
                    console.log("Usuário não encontrado!");
                }
            } catch (error) {
                console.error("Erro ao buscar dados do usuário: ", error);
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    return (
        <div className="master_listarUsuario-modalVisualizar-modal">
            <div className="master_listarUsuario-modalVisualizar-modalContent">
                <span className="master_listarUsuario-modalVisualizar-close" onClick={closeModal}>&times;</span>
                {userInfo ? (
                    <>
                        <h2>Detalhes do Usuário</h2>
                        <div className="master_listarUsuario-modalVisualizar-userDetails">
                            <p><strong>ID:</strong> {userInfo.id}</p>
                            <p><strong>Nome:</strong> {userInfo.name}</p>
                            <p><strong>Email:</strong> {userInfo.email}</p>
                            <p><strong>Categoria:</strong> {userInfo.categoria}</p>
                            <p><strong>Coluna:</strong> {userInfo.coluna}</p>
                            {/* Adicione mais campos conforme necessário */}
                        </div>
                    </>
                ) : (
                    <p>Carregando...</p>
                )}
            </div>
        </div>
    );
};

export default VisualizarModal;
