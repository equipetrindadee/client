import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../aluno/processodePostagem/processodePostagem.css';
import { Container, Row, Col } from 'react-bootstrap';
import NavBaraluno from '../../navBar/navBarAluno';
import ErrorCelular from '../../components/error';
import { Modal, Button } from 'react-bootstrap';

export const ProcessodePostagem = () => {

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
                <NavBaraluno />

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
                        {/* Jornal Processo de Postagem */}
                        <div className="row">
                            {/* Informação Processo de Postagem */}
                            <div className="infoJornal-processodePostagem">
                                {/* Autor Jornal Processo de Postagem */}
                                <div className="autor-processorPostagem">
                                    <img src="../img/processoPostagemJornalista.svg" alt="teste" className="imagemAutor-processodePostagem" />
                                    <div>
                                        <p className="nome-processodePostagem">Por Catarina Benedetto</p>
                                        <p className="data-processodePostagem">01/01/2001</p>
                                    </div>
                                </div>

                                {/* Audio Jornal Processo de Postagem */}
                                <div className='audio-processorPostagem'>
                                    <i className='bx bx-play'></i>
                                    <div className='linhaAudio-processorPostagem'></div>
                                </div>

                                {/* Titulo Jornal Processo de Postagem */}
                                <h3 className='titlecontent-processorPostagem'>O papel das olímpiadas</h3>

                                {/* Parágrafos do artigo */}
                                <section className="firstParagrafo-processorPostagem">
                                    <p className="campoTexto1-processorPostagem">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                                    <div className="campoImagem1-processorPostagem"></div>
                                </section>

                                <section className="segundoParagrafo-processorPostagem">
                                    <p className="campoTexto2-processorPostagem">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                                </section>

                                <section className="terceiroParagrafo-processorPostagem">
                                    <div className="campoImagem2-processorPostagem"></div>
                                    <p className="campoTexto3-processorPostagem">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                                </section>

                                <section className="quartoParagrafo-processorPostagem">
                                    <div className="campoImagem3-processorPostagem"></div>
                                    <p className="campoTexto4-processorPostagem">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                                </section>

                                {/* Footer Jornal Processo de Postagem */}
                                <footer className="fotter-processorPostagem">
                                    <h2 className="saibaMais-processoPostagem">Saiba Mais</h2>
                                    <div className="linkSaiba-processorPostagem">
                                        <p>nt here, content here', making it look like</p>
                                        <div className="qrCode-processorPostagem"></div>
                                    </div>
                                    <div className="linkSaiba-processorPostagem">
                                        <p>nt here, content here', making it look like</p>
                                        <div className="qrCode-processorPostagem"></div>
                                    </div>
                                </footer>
                            </div>

                            {/* Área Colunista Processo de Postagem */}
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
