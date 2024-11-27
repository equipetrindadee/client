// ModalExcluirUsuario.js
import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import './modalExcluirUsuario.css'; // Importando o arquivo de estilo para aplicar as classes

const firebaseConfig = {
    apiKey: "AIzaSyBNIaO0le5Mn4UDxWX32YDoY_b4xNZikDg",
    authDomain: "reactfirebase-140c5.firebaseapp.com",
    projectId: "reactfirebase-140c5",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function ModalExcluirUsuario({ show, onHide, selectedAluno, onConfirmDelete }) {
    const handleDelete = async () => {
        try {
            const alunoDocRef = doc(db, 'users', selectedAluno.id);
            await deleteDoc(alunoDocRef);
            onConfirmDelete(selectedAluno.id);
            onHide(); // Fechar o modal
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
        }
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            backdrop="static"
            keyboard={false}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        
        >
            <Modal.Header closeButton className="professor_controleUsuario_modalExcluir-header">
                <Modal.Title className="professor_controleUsuario_modalExcluir-title">
                    Você tem certeza da exclusão?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className='professor_controleUsuario_modalExcluir-form'>
                    <p className='professor_controleUsuario_modalExcluir-contentText'>
                        Por favor, confirme se deseja prosseguir com a exclusão do(a) <strong>{selectedAluno?.name}</strong>. Lembre-se de que essa ação é permanente e não poderá ser desfeita.
                    </p>
                </Form>
            </Modal.Body>
            <Modal.Footer className="professor_controleUsuario_modalExcluir-footer justify-content-center">
                <Button className='professor_controleUsuario_modalExcluir-buttonPositivo' onClick={handleDelete}>
                    SIM
                </Button>
                <Button className='professor_controleUsuario_modalExcluir-buttonNegativo' onClick={onHide}>
                    NÃO
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalExcluirUsuario;
