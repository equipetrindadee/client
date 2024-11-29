import React, { useState } from 'react';
import '../MudarSenhaModal/MudarSenhaModal.css';

const MudarSenhaModal = ({ userId, closeModal }) => {
    const [newPassword, setNewPassword] = useState('');

    const handleChangePassword = () => {
        // Lógica para alterar a senha
        console.log(`Alterando senha do usuário ID: ${userId} para: ${newPassword}`);
        closeModal(); // Fecha o modal após a mudança de senha
    };

    return (
        <div className="master_listarUsuario-modalMudarSenha-modal">
            <div className="master_listarUsuario-modalMudarSenha-modalContent">
                <span className="master_listarUsuario-modalMudarSenha-close" onClick={closeModal}>&times;</span>
                <h2>Alterar Senha do Usuário ID: {userId}</h2>
                <div className="master_listarUsuario-modalMudarSenha-modalBody">
                    <input
                        type="password"
                        placeholder="Nova Senha"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button onClick={handleChangePassword} className="master_listarUsuario-modalMudarSenha-changePasswordBtn">Alterar Senha</button>
                </div>
            </div>
        </div>
    );
};

export default MudarSenhaModal;
