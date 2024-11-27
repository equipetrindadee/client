import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './excluirColuna.css';

function ModalExcluirColuna({ column, onConfirmDelete }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleConfirmDelete = () => {
        onConfirmDelete(column.id); // Chama a função para mover a coluna
        handleClose(); // Fecha o modal
    };

    return (
        <div>
            <Button
                onClick={handleShow}
                className='buttonModalExcluirColuna'
            >
                <i className='bx bxs-trash'></i>
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton className="modalCriarColunaHeader">
                    <Modal.Title className="titleModalCriarColuna">Tem certeza que deseja excluir essa coluna?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className='formCriarColuna'>
                        <p className='contentTextModalExcluirColuna'>Por favor, confirme se deseja prosseguir com a exclusão. Lembre-se de que essa ação é permanente e não poderá ser desfeita.</p>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="modalExcluirColunaFooter justify-content-center">
                    <Button className='buttonExcluirPositivoColuna' onClick={handleConfirmDelete}>
                    <p className='modalExcluirColunaFooterp' >SIM</p>
                    </Button>
                    <Button className='buttonExcluirNegativoColuna' onClick={handleClose}>
                       <p className='modalExcluirColunaFooterp' > NÃO</p>
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalExcluirColuna;
