import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    onSnapshot,
    arrayUnion,
    increment
} from 'firebase/firestore';
import { jwtDecode } from 'jwt-decode';
import 'bootstrap/dist/css/bootstrap.min.css';
import './chatComponet.css';

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBNIaO0le5Mn4UDxWX32YDoY_b4xNZikDg",
    authDomain: "reactfirebase-140c5.firebaseapp.com",
    projectId: "reactfirebase-140c5",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);




function Chat({ selectedUser }) {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [userName, setUserName] = useState('');
    const [userColum, setColumName] = useState('');
    const [image, setImage] = useState('');
    const [images, setImages] = useState('');
    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [conversationId, setConversationId] = useState('');

    // Referência para rolar automaticamente para a última mensagem
    const messagesEndRef = useRef(null);


    const fetchUserName = async () => {
        const storedToken = localStorage.getItem('token');

        if (storedToken) {
            try {
                const decoded = jwtDecode(storedToken);
                const userId = decoded.id;
                const docRef = doc(db, "users", userId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setImage(data.imagemUrl)

                }
            } catch (error) {
                console.error("Erro ao decodificar o token ou consultar o Firestore:", error);
            }
        }
    };



    // Função para rolar até a última mensagem
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Recupera o ID e nome do usuário logado
    useEffect(() => {
        const fetchUserData = async () => {
            const storedToken = localStorage.getItem('token');

            if (storedToken) {
                try {
                    const decoded = jwtDecode(storedToken);
                    const userId = decoded.id;
                    const docRef = doc(db, "users", userId);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        console.log("Dados do usuário:", data);  // Verifique os dados retornados

                        // Atribuindo os dados ao estado
                        setUserName(data.name || "Nome não encontrado");
                        setColumName(data.coluna || "Coluna não encontrada");
                        setImages(data.imagemUrl || "Imagem não encontrada");
                        setUserId(userId);
                        setEmail(data.email || "Email não encontrado"); // Verifique se o campo "email" existe e está sendo recuperado corretamente

                    }
                } catch (error) {
                    console.error("Erro ao decodificar o token ou consultar o Firestore:", error);
                }
            }
        };


        fetchUserData();
    }, []);


    // Recupera a conversa entre o usuário logado e o usuário selecionado
    useEffect(() => {
        if (selectedUser && userId) {
            const id = userId < selectedUser.id ? `${userId}-${selectedUser.id}` : `${selectedUser.id}-${userId}`;
            setConversationId(id);

            const conversationDoc = doc(db, "conversas", id);
            const unsubscribe = onSnapshot(conversationDoc, (docSnap) => {
                if (docSnap.exists()) {
                    setMessages(docSnap.data().messages || []);
                } else {
                    setMessages([]);
                }
                scrollToBottom();
            });

            return () => unsubscribe();
        }
    }, [selectedUser, userId]);

    // Rola para a última mensagem ao selecionar uma nova conversa
    useEffect(() => {
        if (selectedUser) {
            scrollToBottom();
        }
    }, [selectedUser]);

    const handleSendMessage = async () => {
        if (!userId || !userName) {
            setAlertMessage('Você precisa estar logado para enviar mensagens.');
            setShowAlert(true);
            return;
        }

        if (inputMessage.trim() && selectedUser) {
            const messageData = {
                text: inputMessage,
                senderId: userId,
                senderName: userName,
                timestamp: new Date(),
            };

            try {
                const conversationDocRef = doc(db, "conversas", conversationId);
                const conversationDocSnap = await getDoc(conversationDocRef);

                if (conversationDocSnap.exists()) {
                    await updateDoc(conversationDocRef, {
                        messages: arrayUnion(messageData),
                        [`notificações.${selectedUser.id}`]: increment(1),
                        lastMessage: inputMessage,
                    });
                } else {
                    await setDoc(conversationDocRef, {
                        messages: [messageData],
                        userIds: [userId, selectedUser.id],
                        notificações: { [selectedUser.id]: 1 },
                        lastMessage: inputMessage,
                    });
                }
                setInputMessage('');
                scrollToBottom();
            } catch (error) {
                console.error("Erro ao enviar a mensagem:", error);
            }
        }
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
        setAlertMessage('');
    };

    if (!selectedUser) {
        return (
            <div className="aluno_chat-container">
                <img
                    src="../../img/logoChatBgUserNotPChat.svg"
                    className='imgChatBgUserNotSelected'
                    alt="Nenhum usuário selecionado"
                />
            </div>
        );
    }

    return (
        <div className="aluno_chat-container">
            <div className="aluno_chat-header">
                <div className="aluno_chat-header-withImg">
                    <img src={selectedUser.img} className="userChatMenssage" alt={selectedUser.name || "Usuário"} />
                    <div className="aluno_chat-messageInformationUserStatus">
                        <h5 className="aluno_chat-messageStatus-userName">{selectedUser.name}</h5>
                        {/* <p className="aluno_chat-messageStatus">{selectedUser.name}</p>  */}
                    </div>
                </div>
            </div>

            {showAlert && alertMessage && (
                <div className="alert alert-warning fixed-alert d-flex justify-content-between align-items-center">
                    <span>{alertMessage}</span>
                    <button className="close" onClick={handleCloseAlert}>&times;</button>
                </div>
            )}

            <div className="aluno_chat-body" onClick={scrollToBottom}>
                {messages.map((msg, index) => (
                    <div key={index} className={`aluno_chat-message ${msg.senderId === userId ? 'right' : 'left'}`}>
                        {msg.senderId !== userId && ( // Imagem à esquerda para mensagens do outro usuário
                            <img
                                src={selectedUser.img}
                                className="userChatMenssage"
                                alt={msg.senderName}
                            />
                        )}
                        <div className="aluno_chat-message-content">
                            <p className={`${msg.senderId === userId ? 'RightUser' : 'LeftUser'}`}>
                                {msg.text}
                            </p>
                        </div>
                        {msg.senderId === userId && ( // Imagem à direita para mensagens do usuário atual
                            <img
                                src={images}
                                className="userChatMenssage"
                                alt={msg.senderName}
                            />
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef}></div>
            </div>


            <div className="aluno_chat-footer">
                <input
                    type="text"
                    className="form-control aluno_chat-footer-input"
                    placeholder="Envie sua mensagem..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleSendMessage();
                        }
                    }}
                />
                <i className='bx bx-right-arrow-circle arrowChatUserSend' onClick={handleSendMessage}></i>
            </div>
        </div>
    );
}

export default Chat;
