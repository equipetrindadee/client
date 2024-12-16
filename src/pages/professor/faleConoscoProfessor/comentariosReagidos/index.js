import React, { useState } from 'react';
import './comentariosReagidos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap'; // Importa o modal do Bootstrap

function ComentariosReagidos({ email, mensagem, resposta, tipoAtivo }) {
    const [showFullMessageModal, setShowFullMessageModal] = useState(false);
    const [modalMessages, setModalMessages] = useState(["", ""]);

    const abrirModal = (mensagemOriginal, novaMensagem) => {
        setModalMessages([mensagemOriginal, novaMensagem]); // Atualiza o estado do modal
        setShowFullMessageModal(true); // Abre o modal
    };
    const [liked, setLiked] = useState(false);
    const [commented, setCommented] = useState(false);

    const toggleLike = () => {
        setLiked(!liked);
    };

    const toggleComment = () => {
        setCommented(!commented);
    };

    return (
        <div className="comentariosReagidos_cardReagido container mt-3  border rounded">
            <div className="row align-items-center">
                <div className="col-2 d-flex justify-content-center comentariosReagidos_imagem">
                <i className="bx bxs-user-circle faleConoscoProfessor_profileImage"></i> 
                </div>
                <div className="col-6">
                    <span className="comentariosReagidos_email  d-block mb-1">De: {email}</span>
                    <button
                        className="comentariosReagidos_statusBtn  btn-sm"
                        onClick={() => abrirModal(mensagem, resposta)}
                    >
                        Essa mensagem já foi respondida
                    </button>
                </div>
                <div className="col-4 d-flex justify-content-end iconsComentariosReagidosFlexEnd ">
                    <button
                        className={`comentariosReagidos_reactBtn btn btn-sm me-2 ${liked ? 'active' : ''}`}
                        onClick={toggleLike}
                    >
                        <i className={`bi bi-heart ${liked ? 'liked' : ''}`}></i>
                    </button>
                    <button
                        className={`comentariosReagidos_reactBtn btn btn-sm ${commented ? 'active' : ''}`}
                        onClick={toggleComment}
                    >
                        <i className="bi bi-chat-left-text"></i>
                    </button>
                </div>
            </div>


            {/* Modal para exibir mensagens */}
            {/* <Modal show={showFullMessageModal} onHide={() => setShowFullMessageModal(false)} className="faleConoscoProfessor_modal" >
                <Modal.Header className='faleConoscoModalHistoricoDeMensagemHeader'>
                    <Modal.Title className='faleConoscoModalHistoricoDeMensagemTitle'  >HISTÓRICO DA MENSAGEM</Modal.Title>
                    <Button variant="link" onClick={() => setShowFullMessageModal(false)} className="faleConoscoModalHistoricoDeMensagemtext-white  justify-content-end">
                        <i className="bi bi-x-circle"></i>
                    </Button>
                </Modal.Header>
                <Modal.Body className="text-light">
                    <p className='faleConoscoModalHistoricoDeMensagemTitleP'><strong className='faleConoscoModalHistoricoDeMensagemTitleStrong'>Mensagem Original:</strong> {modalMessages[0]}</p>
                    <p className='faleConoscoModalHistoricoDeMensagemTitleP'><strong className='faleConoscoModalHistoricoDeMensagemTitleStrong'>Resposta Recebida:</strong> {modalMessages[1]}</p>
                </Modal.Body>


            </Modal> */}
        </div>
    );
}

export default ComentariosReagidos;
