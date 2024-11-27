import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './chatAreaProfessor.css';

export const ChatAreaProfessor = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const chatRef = useRef(null);

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    // Função para fechar o chat ao clicar fora dele
    const handleClickOutside = (event) => {
        if (chatRef.current && !chatRef.current.contains(event.target)) {
        setIsChatOpen(false);
        }
    };

    useEffect(() => {
        // Adiciona o listener apenas quando o chat está aberto
        if (isChatOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        } else {
        document.removeEventListener('mousedown', handleClickOutside);
        }

        // Cleanup para remover o listener
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isChatOpen]);

    return (

        <div className="containerChat-chatAreaProfessor-professor">

            <div ref={chatRef} className={`chatBox-chatAreaProfessor-professor ${isChatOpen ? 'open' : ''}`}>
                
                {/* Botão de Fechar "X" */}
                <button className="closeButton-chatAreaProfessor-professor" onClick={toggleChat}>
                &times;
                </button>

                <h2 className='titleChat-chatAreaProfessor-professor'>MENSAGEM</h2>

                <div className="chatMessages-chatAreaProfessor-professor">

                    <div className="messageProfessor-chatAreaProfessor-professor">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
                    
                    <div className="messageAluno-chatAreaProfessor-professor">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>

                    <div className="messageProfessor-chatAreaProfessor-professor">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>

                    <div className="messageAluno-chatAreaProfessor-professor">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>

                    <div className="messageProfessor-chatAreaProfessor-professor">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>

                    <div className="messageAluno-chatAreaProfessor-professor">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>

                </div>

                <div className='areaEnviarMensagem-chatAreaProfessor-professor'>
                    
                    <input
                    type="text"
                    placeholder="Escreva aqui..."
                    className="chatInput-chatAreaProfessor-professor"
                    />

                    <button className='buttonEnviar-chatAreaProfessor-professor'>   
                        <i class='bx bx-right-arrow-alt'></i>
                    </button>

                </div>

            </div>

            <button
                onClick={toggleChat}
                className={`chatButton-chatAreaProfessor-professor ${isChatOpen ? 'hidden' : ''}`}
            >
                <i class='bx bx-conversation'></i>
            </button>

        </div>
        
    );

};

export default ChatAreaProfessor;
