import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, updateDoc, doc, onSnapshot, getDoc } from "firebase/firestore";
import { jwtDecode } from 'jwt-decode';
import './sidbar.css';
import api from "../../../../config/configApi";
import { getDatabase, ref, onDisconnect, onValue, set } from "firebase/database";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBNIaO0le5Mn4UDxWX32YDoY_b4xNZikDg",
    authDomain: "reactfirebase-140c5.firebaseapp.com",
    projectId: "reactfirebase-140c5",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);


function Sidebar({ onSelectUser }) {
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [fixedUsers, setFixedUsers] = useState([]);
    const [groups, setGroups] = useState([]);
    const [fixedGroups, setFixedGroups] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loggedUserId, setLoggedUserId] = useState(null);
    const [userNotifications, setUserNotifications] = useState({});
    const [updatingUserId, setUpdatingUserId] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);




    useEffect(() => {
        const fetchLoggedUserId = () => {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                const decoded = jwtDecode(storedToken);
                setLoggedUserId(decoded.id);
            }
        };

        fetchLoggedUserId();
    }, []);

    useEffect(() => {
        const fetchUsersAndGroups = async () => {
            const usersCollection = collection(db, "users");
            const usersSnapshot = await getDocs(usersCollection);
            const userList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            setUsers(userList.filter(user => user.id !== loggedUserId && !user.isFixed));
            setFixedUsers(userList.filter(user => user.isFixed && user.id !== loggedUserId));

            try {
                const response = await api.get('/colunas');
                const colunas = response.data;
                setGroups(colunas.filter(col => !col.isFixed));
                setFixedGroups(colunas.filter(col => col.isFixed));
            } catch (error) {
                console.error("Erro ao buscar colunas:", error);
            }
        };

        fetchUsersAndGroups();
    }, [loggedUserId]);

    useEffect(() => {
        const allUsers = [...users, ...fixedUsers];

        const unsubscribeFromConversations = allUsers.map(user => {
            const conversationId = loggedUserId < user.id ? `${loggedUserId}-${user.id}` : `${user.id}-${loggedUserId}`;
            const conversationDocRef = doc(db, "conversas", conversationId);

            return onSnapshot(conversationDocRef, (doc) => {
                if (doc.exists()) {
                    const conversationData = doc.data();
                    const lastMessage = conversationData.messages.length > 0
                        ? conversationData.messages[conversationData.messages.length - 1].text
                        : '';

                    // Atualize o estado dos usuários com a última mensagem
                    setUsers(prevUsers => {
                        return prevUsers.map(u =>
                            u.id === user.id ? { ...u, lastMessage } : u
                        );
                    });

                    setFixedUsers(prevFixedUsers => {
                        return prevFixedUsers.map(u =>
                            u.id === user.id ? { ...u, lastMessage } : u
                        );
                    });
                }
            });
        });

        return () => {
            // Limpa as inscrições quando o componente é desmontado
            unsubscribeFromConversations.forEach(unsubscribe => unsubscribe());
        };
    }, [users, fixedUsers, loggedUserId]);



    useEffect(() => {
        let intervalId;

        const markMessagesAsRead = async (conversationId, userId) => {
            if (conversationId) {
                const conversationDocRef = doc(db, "conversas", conversationId);
                const conversationSnapshot = await getDoc(conversationDocRef);

                if (conversationSnapshot.exists()) {
                    await updateDoc(conversationDocRef, {
                        [`notificações.${userId}`]: 0
                    });
                    console.log(`Notificações para o usuário ${userId} limpas`);
                }
            }
        };

        if (selectedUser) {
            const conversationId = loggedUserId < selectedUser.id ? `${loggedUserId}-${selectedUser.id}` : `${selectedUser.id}-${loggedUserId}`;
            intervalId = setInterval(() => markMessagesAsRead(conversationId, loggedUserId), 500);
        }

        return () => clearInterval(intervalId);
    }, [selectedUser, loggedUserId]);


    useEffect(() => {
        const fetchNotifications = () => {
            if (loggedUserId) {
                const allUsers = [...users, ...fixedUsers];

                allUsers.forEach(user => {
                    const conversationId = loggedUserId < user.id ? `${loggedUserId}-${user.id}` : `${user.id}-${loggedUserId}`;
                    const conversationDocRef = doc(db, "conversas", conversationId);

                    const unsubscribe = onSnapshot(conversationDocRef, (docSnap) => {
                        const notificationsCount = docSnap.exists() && docSnap.data().notificações
                            ? docSnap.data().notificações[loggedUserId]
                            : 0;

                        setUserNotifications(prev => ({
                            ...prev,
                            [user.id]: notificationsCount,
                        }));
                    });

                    return () => unsubscribe();
                });
            }
        };

        fetchNotifications();
    }, [users, fixedUsers, loggedUserId]);

    const toggleFixed = async (item, isUser) => {
        if (updatingUserId === item.id) return;
        setUpdatingUserId(item.id);

        const itemDoc = doc(db, isUser ? "users" : "colunas", item.id);
        const updatedItem = { ...item, isFixed: !item.isFixed };

        if (item.isFixed) {
            await updateDoc(itemDoc, { isFixed: false });
            if (isUser) {
                setFixedUsers(prev => prev.filter(u => u.id !== item.id));
                setUsers(prev => [...prev, updatedItem]);
            } else {
                setFixedGroups(prev => prev.filter(g => g.id !== item.id));
                setGroups(prev => [...prev, updatedItem]);
            }
        } else if ((isUser ? fixedUsers : fixedGroups).length < 5) {
            await updateDoc(itemDoc, { isFixed: true });
            if (isUser) {
                setFixedUsers(prev => [...prev, updatedItem]);
                setUsers(prev => prev.filter(u => u.id !== item.id));
            } else {
                setFixedGroups(prev => [...prev, updatedItem]);
                setGroups(prev => prev.filter(g => g.id !== item.id));
            }
        } else {
            setAlertMessage('Você pode fixar no máximo 5 contatos ou grupos.');
            setShowAlert(true);
        }

        if (isUser) {
            const notificationsCount = await fetchNotificationsForUser(item.id);
            setUserNotifications(prev => ({
                ...prev,
                [item.id]: notificationsCount,
            }));
        }

        setUpdatingUserId(null);
    };

    const fetchNotificationsForUser = async (userId) => {
        const conversationId = loggedUserId < userId ? `${loggedUserId}-${userId}` : `${userId}-${loggedUserId}`;
        const conversationDocRef = doc(db, "conversas", conversationId);
        const conversationSnapshot = await getDoc(conversationDocRef);
        return conversationSnapshot.exists() ? conversationSnapshot.data().notificações[loggedUserId] || 0 : 0;
    };

    const renderUserItem = (user, isFixed) => {
        const { id, img, name, lastMessage } = user;
        return (
            <button key={id} className={`aluno_chatSidebar-user-item ${selectedUser?.id === id ? 'selected' : ''}`} onClick={() => {
                setSelectedUser({ id, img, name, lastMessage });
                onSelectUser({ id, img: user.imagemUrl, name, lastMessage });

            }}>
                <img src={user.imagemUrl} className="aluno_chatSidebar-userImg" alt={name} />
                <div className="aluno_chatSidebar-user-itemContent">
                    <div className="aluno_chatSidebar-user-itemContentInfo">
                        <h6 className="aluno_chatSidebar-user-name">{name}</h6>
                        <p className="aluno_chatSidebar-userLastMenssage">   {lastMessage ? (lastMessage.length > 30 ? `${lastMessage.slice(0, 20)}...` : lastMessage) : "Sem mensagens"}</p>
                    </div>
                    <div className="aluno_chatSidebar-messageStatusUser">
                        <p className="aluno_chatSidebar-barStatusUser">{'N/A'}</p>
                        <div className="aluno_chatSidebar-barStatusUser-NotificationPart">
                            <i className={isFixed ? "bx bxs-message-square-x" : "bx bxs-pin"} onClick={(e) => { e.stopPropagation(); toggleFixed(user, true); }} style={{ cursor: 'pointer' }}></i>
                            <div className="aluno_chatSidebar-barStatusUser-NotificationUser">
                                <p className="aluno_chatSidebar-barStatusUser-NotificationAmount">
                                    {userNotifications[user.id] || 0}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </button>
        );
    };


    const filterItems = (items) => items.filter(item => item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleCloseAlert = () => {
        setShowAlert(false);
        setAlertMessage('');
    };

    return (
        <div className="aluno_chatSidebar-container">
            <div className="aluno_chatSidebar-search-bar">
                <input type="text" className="form-control aluno_chatSidebar-search-input" placeholder="Pesquisar um usuário ou grupo..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                <i className="bi bi-search aluno_chatSidebar-search-icon"></i>
            </div>

            {showAlert && alertMessage && (
                <div className="alert alert-warning fixed-alert d-flex justify-content-between align-items-center">
                    {alertMessage}
                    <button className="close" onClick={handleCloseAlert}>×</button>
                </div>
            )}

            <h6 className="aluno_chatSidebar-titleFixed"><i class='bx bxs-down-arrow'></i>Usuários Fixos</h6>
            <div className="aluno_chatSidebar-user-container">
                {fixedUsers.length > 0 ? (
                    filterItems(fixedUsers).map(user => renderUserItem(user, true))
                ) : (
                    <p className="aluno_chatSidebar-Nenhum-usuário-fixado">Nenhum usuário fixado</p>
                )}
            </div>

            <h6 className="aluno_chatSidebar-titleRecents"><i class='bx bxs-down-arrow'></i>Usuários</h6>
            <div className="aluno_chatSidebar-user-container">
                {filterItems(users).map(user => renderUserItem(user, false))}
            </div>


        </div>
    );
}

export default Sidebar;
