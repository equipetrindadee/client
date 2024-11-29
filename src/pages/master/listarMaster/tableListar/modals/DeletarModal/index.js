import React from 'react';
import './DeletarModal.css';

const DeletarModal = ({ userId, closeModal, onDelete }) => {
    const handleDelete = async () => {
        try {
            // Chama a função onDelete (passada via props) para excluir o usuário
            await onDelete(userId);

            // Fecha o modal após a exclusão
            closeModal();
        } catch (error) {
            console.error("Erro ao deletar usuário", error);
        }
    };

    return (
        <div className="master_listarUsuario-modalDeletar-modal">
            <div className="master_listarUsuario-modalDeletar-modalContent">
                <span className="master_listarUsuario-modalDeletar-close" onClick={closeModal}>&times;</span>
                <h2>Você tem certeza que deseja excluir o usuário ID: {userId}?</h2>
                <div className="master_listarUsuario-modalDeletar-modalActions">
                    <button className="master_listarUsuario-modalDeletar-cancel" onClick={closeModal}>Cancelar</button>
                    <button className="master_listarUsuario-modalDeletar-confirm" onClick={handleDelete}>Confirmar</button>
                </div>
            </div>
        </div>
    );
};

export default DeletarModal;
