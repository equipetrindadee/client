import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../aluno/processodePostagem/processodePostagem.css';
import { Container, Row, Col } from 'react-bootstrap';
import NavBaraluno from '../../navBar/navBarAluno';
import ErrorCelular from '../../components/error';
import { Modal, Button } from 'react-bootstrap';
import SideNavBarNewAluno from '../../navBar/newNavBarSideBarAluno/index.js'

export const ProcessodePostagem = () => {

    const location = useLocation();
    const { rightSideHTML2 } = location.state || {}; // Recebe o HTML do `right-side`


    const [showModalPergunta, setShowModalPergunta] = useState(false);
    const [showModalSucesso, setShowModalSucesso] = useState(false);

    // Função para abrir o modal de pergunta
    const abrirModalPergunta = () => {
        setShowModalPergunta(true);
    };

    // Função para fechar o modal de pergunta e abrir o de sucesso
    const confirmarEnvio = () => {
        setShowModalPergunta(false);  // Fecha o modal de pergunta
        setShowModalSucesso(true);  // Abre o modal de sucesso
    };

    // Função para fechar o modal de sucesso
    const fecharModalSucesso = () => {
        setShowModalSucesso(false);
    };

    useEffect(() => {
        const buttonPergunta = document.getElementById("enviadoProcessoPostagem");
        const activeButton = document.getElementById("buttonActive_processoPostagem");
        const editarButton = document.getElementById("buttonVoltar_Editar_ProcessoPostagem");

        const handleButtonClick = () => {
            if (activeButton) {
                activeButton.classList.toggle('buttonPergunta-Active-processoPostagem');
            }
            if (editarButton) {
                editarButton.classList.toggle('buttonEditar-Active-processoPostagem')
            }
        };

        if (buttonPergunta) {
            buttonPergunta.addEventListener("click", handleButtonClick);
        }

        // Cleanup
        return () => {
            if (buttonPergunta) {
                buttonPergunta.removeEventListener("click", handleButtonClick);
            }
        };
    }, []);

    return (
        <div>
            <div className='errorCelular-processoPostagem'>
                <ErrorCelular />
            </div>

            <div className='fullContainer-div-processoPostagem'>
                <SideNavBarNewAluno />
                {/* Container Processo de Postagem */}
                <section className="container-processodePostagem">
                    {/* Topo Processo de Postagem */}
                    <Row className="top-Educador">
                        <Col>
                            {/* Logo Processo de Postagem */}
                            <h1 className="title-processodePostagem"> O EDUCADOR</h1>
                            <p className="subtitle-processodePostagem">Te manter informado é a nossa função</p>
                            <div className="linha-processodePostagem"></div>
                        </Col>
                    </Row>

                    {/* Conteudo Processo de Postagem */}
                    <Col className="content-processodePostagem">
                        <div className='row'>
                            {/* Jornal Processo de Postagem */}
                            <div className='miri' dangerouslySetInnerHTML={{ __html: rightSideHTML2 }} />
                            <section className="areaColunista-processodePostagem">
                            <h1 className="titleAreaColunista-processodePostagem">Área Colunista</h1>
                            <button
                                className="buttoEnviar-processodePostagem"
                                id='buttonActive_processoPostagem'
                                onClick={abrirModalPergunta} // Aqui, chamamos diretamente a função para abrir o modal
                            >
                                Enviar para Revisão <i className='bx bx-paper-plane'></i>
                            </button>
                            <button
                                className="buttoEditar-processodePostagem"
                                id='buttonVoltar_Editar_ProcessoPostagem'
                            >
                                Voltar para Editar <i className='bx bxs-edit'></i>
                            </button>
                        </section>
                        </div>
                     

                    </Col>

                </section>

                {/* Modal de Pergunta */}
                <Modal
                    show={showModalPergunta}
                    onHide={() => setShowModalPergunta(false)}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>VOCÊ TEM CERTEZA QUE DESEJA ENVIAR ESSE ARTIGO?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h2>Lembre-se de que, após clicar em SIM, não será possível cancelar o envio do artigo.</h2>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModalPergunta(false)}>
                            NÃO
                        </Button>
                        <Button variant="primary" onClick={confirmarEnvio}>
                            SIM
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Modal de Sucesso */}
                <Modal
                    show={showModalSucesso}
                    onHide={fecharModalSucesso}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Parabéns!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h1>PARABÉNS!</h1>
                        <p>Parabéns pelo envio da sua matéria para avaliação! Agradecemos muito o seu esforço e o tempo dedicado a isso.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={fecharModalSucesso}>
                            Fechar
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        </div>
    );
}

export default ProcessodePostagem;
