import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './restaurarColuna.css';

function ModalRestaurarColuna({ column, onRestore }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleConfirmRestore = () => {
        onRestore(column); // Chama a função para restaurar a coluna
        handleClose(); // Fecha o modal
    };

    return (
        <div>
            <Button
                onClick={handleShow}
                className='buttonModalRestaurarColuna'
            >
                <i className="bi bi-arrow-clockwise iconeRedoColunaTrash"></i>
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
                    <Modal.Title className="titleModalCriarColuna">Tem certeza que deseja restaurar essa coluna?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className='formCriarColuna'>
                        <p className='contentTextModalExcluirColuna'>Por favor, confirme se deseja prosseguir com a restauração dessa coluna.</p>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="modalExcluirColunaFooter justify-content-center">
                    <Button className='buttonExcluirPositivoColuna' onClick={handleConfirmRestore}>
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

export default ModalRestaurarColuna;
