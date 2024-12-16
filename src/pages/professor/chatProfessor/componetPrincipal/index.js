// ChatTeste.js
import React, { useState } from 'react';
import Sidebar from '../sidebarComponet/index.js';
import Chat from '../chatComponet/index.js';
import '../componetPrincipal/componet.css'; // Certifique-se de que o caminho está correto
import NavBaraluno from '../../../navBar/navBarAluno/index.js';
import NavBarProfessor from '../../../navBar/navBarProfessor/index.js';

function ChatProfessor() {
  const [selectedUser, setSelectedUser] = useState(null); // Inicializa como null para que o texto apareça inicialmente

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  return (
    <div>
      {/* <NavBaraluno /> */}
      <NavBarProfessor />
      <div className="aluno_ChatAluno-container">
        <div className="aluno_ChatAluno-row">
          {/* Sidebar Component */}
          <div className="sidebar">
            <Sidebar onSelectUser={handleUserSelect} />
          </div>

          {/* Chat Component */}
          <div className="chat">
            <Chat selectedUser={selectedUser} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatProfessor;
