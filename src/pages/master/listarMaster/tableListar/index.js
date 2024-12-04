import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, deleteDoc, getDoc, getFirestore } from 'firebase/firestore'; 
import { initializeApp } from 'firebase/app';
import VisualizarModal from '../tableListar/modals/VisualizarModal/index.js'; 
import EditarModal from './modals/EditarModal/index.js';
import MudarSenhaModal from './modals/MudarSenhaModal/index.js';
import DeletarModal from './modals/DeletarModal/index.js';

import "../tableListar/tableListar.css";

const firebaseConfig = {
    apiKey: "AIzaSyBNIaO0le5Mn4UDxWX32YDoY_b4xNZikDg",
    authDomain: "reactfirebase-140c5.firebaseapp.com",
    projectId: "reactfirebase-140c5",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const UserListMaster = () => {
    const [users, setUsers] = useState([]); 
    const [selectedUserId, setSelectedUserId] = useState(null); 
    const [selectedUser, setSelectedUser] = useState(null); 
    const [modalType, setModalType] = useState(null); 

    const fetchUsers = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'users')); 
            const usersList = [];
            querySnapshot.forEach((doc) => {
                usersList.push({ id: doc.id, ...doc.data() }); 
            });
            setUsers(usersList);
        } catch (error) {
            console.error("Erro ao buscar usuários: ", error);
        }
    };

    const fetchUserById = async (userId) => {
        try {
            const userDocRef = doc(db, 'users', userId);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                setSelectedUser({ id: userDoc.id, ...userDoc.data() });
            } else {
                console.error("Usuário não encontrado!");
            }
        } catch (error) {
            console.error("Erro ao buscar o usuário:", error);
        }
    };

    useEffect(() => {
        fetchUsers(); 
    }, []); 

    const deleteUser = async (userId) => {
        try {
            const userDocRef = doc(db, 'users', userId);
            await deleteDoc(userDocRef);

            console.log(`Usuário ID: ${userId} deletado com sucesso!`);
            fetchUsers();
        } catch (error) {
            console.error("Erro ao excluir usuário:", error);
        }
    };

    const openModal = (userId, type) => {
        setSelectedUserId(userId); 
        setModalType(type); 

        if (type === 'editar') {
            fetchUserById(userId);
        }
    };

    const closeModal = () => {
        setModalType(null); 
        setSelectedUser(null); 
    };

    return (
        <div>
            <table className="master_listarUsuario-tableList-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Visualizar</th>
                        <th>Editar</th>
                        <th>Mudar Senha</th>
                        <th>Deletar</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <i className="bi bi-eye" onClick={() => openModal(user.id, 'visualizar')}></i>
                            </td>
                            <td>
                                <i className="bx bxs-pencil" onClick={() => openModal(user.id, 'editar')}></i>
                            </td>
                            <td>
                                <i className="bx bxs-key" onClick={() => openModal(user.id, 'mudarSenha')}></i>
                            </td>
                            <td>
                                <i className="bx bxs-trash-alt" onClick={() => openModal(user.id, 'deletar')}></i>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {modalType && (
                <>
                    {modalType === 'visualizar' && (
                        <VisualizarModal
                            userId={selectedUserId}
                            closeModal={closeModal}
                        />
                    )}
                    {modalType === 'editar' && selectedUser && (
                        <EditarModal
                            user={selectedUser}
                            closeModal={closeModal}
                        />
                    )}
                    {modalType === 'mudarSenha' && (
                        <MudarSenhaModal
                            userId={selectedUserId}
                            closeModal={closeModal}
                        />
                    )}
                    {modalType === 'deletar' && (
                        <DeletarModal
                            userId={selectedUserId}
                            closeModal={closeModal}
                            onDelete={deleteUser}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default UserListMaster;