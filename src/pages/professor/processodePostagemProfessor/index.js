import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../processodePostagemProfessor/processodePostagemProfessor.css'
import NavBaraluno from '../../navBar/navBarAluno';
import NavBarProfessor from '../../navBar/navBarProfessor';
import { useCalendarState } from '@mui/x-date-pickers/internals';

export const ProcessodePostagemProfessor = () => {

    const [showModal, setShowModal] = useState(false);
    const [showModalConcluido, setShowModalConcluido] = useState(false);

    const [postarClass, setPostarClass] = useState('');
    const [avisoPostarClass, setAvisoPostarClass] = useState('');
    const [postadoAviso, setPostadoAviso] = useState(true)

    const [concluidoPostado, setConcluidoPostado] = useState(false)
    const [concluidoClass, setConcluidoClass] = useState('');
    const [avisoConcluidoClass, setAvisoConcluidoClass] = useState('');

    const [voltarParaEditar, setVoltarParaEditar] = useState(false)

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleOpenModalConcluido = () => setShowModalConcluido(true);
    const handleCloseModalConcluido = () => setShowModalConcluido(false);

    const processoPostar = () => {
        setPostarClass('buttoEnviar-processodePostagem-postado'); // Adicione a classe desejada
        setAvisoPostarClass('materiaPostada-processoPostagem');

        setConcluidoPostado(true)
        setConcluidoClass('');
        setAvisoConcluidoClass('');
        setVoltarParaEditar(true)
        setPostadoAviso(true)

        handleCloseModal(); // Fecha o modal
    };

    const voltarConcluir = () => {
        setConcluidoClass('');
        setPostadoAviso(true);
        setShowModalConcluido(false);
    }

    const processoConcluir = () => {
        setConcluidoClass('buttoEnviar-processodePostagem-concluido'); // Adicione a classe desejada
        setAvisoConcluidoClass('materiaConcluida-processoPostagem');
        handleCloseModalConcluido(); // Fecha o modal

        setPostadoAviso(false)
    };

    return (

        <div>
            <NavBarProfessor />

            <div className='container-postadoConcluido-processoPostagem'>
                <div className={`materiaNaoPostada-processoPostagem ${avisoPostarClass}`}>
                    <h1>SUA MÁTERIA FOI POSTADA</h1>
                </div>

                <div className={`materiaNaoConcluida-processoPostagem ${avisoConcluidoClass}`}>
                    <h1>SUA MÁTERIA FOI CONCLUÍDA</h1>
                </div>
            </div>

            <section className="container-processodePostagem">

                <Row className="top-Educador">
                    <Col>
                        <h1 className="title-processodePostagem">O EDUCADOR</h1>
                        <p className="subtitle-processodePostagem">Te manter informado é a nossa função</p>
                        <div className="linha-processodePostagem"></div>
                    </Col>
                </Row>

                <Col className="content-processodePostagem">

                    <div className="row">
                        <div className="infoJornal-processodePostagem">
                            <img src="../img/banner_rosa.svg" alt="teste" className="imagemAutor-processodePostagem" />

                            <div className="autor-processorPostagem">
                                <img src="../img/processoPostagemJornalista.svg" alt="teste" className="imagemAutor-processodePostagem" />
                                <div>
                                    <p className="nome-processodePostagem">Por Catarina Benedetto</p>
                                    <p className="data-processodePostagem">01/01/2001</p>
                                </div>
                            </div>

                            <div className='audio-processorPostagem'>
                                <i class='bx bx-play'></i>
                                <div className='linhaAudio-processorPostagem'></div>
                            </div>

                            <h3 className='titlecontent-processorPostagem'>O papel das olímpiadas</h3>

                            <section className="firstParagrafo-processorPostagem">
                                <p className="campoTexto1-processorPostagem">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non malesuada mi. In pellentesque nunc sit amet erat sodales cursus. Aenean scelerisque nunc id ipsum varius, a ultricies metus convallis. Donec vitae nulla dolor. Morbi venenatis tincidunt metus, in elementum felis pharetra ac. Etiam vitae felis vel felis feugiat gravida quis sed nulla. Mauris efficitur tempor enim, quis iaculis nisi hendrerit vel.</p>
                                <div className="campoImagem1-processorPostagem"></div>
                            </section>

                            <section className="segundoParagrafo-processorPostagem">
                                <p className="campoTexto2-processorPostagem">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non malesuada mi. In pellentesque nunc sit amet erat sodales cursus. Aenean scelerisque nunc id ipsum varius, a ultricies metus convallis. Donec vitae nulla dolor. Morbi venenatis tincidunt metus, in elementum felis pharetra ac. Etiam vitae felis vel felis feugiat gravida quis sed nulla. Mauris efficitur tempor enim, quis iaculis nisi hendrerit vel.</p>
                            </section>

                            <section className="terceiroParagrafo-processorPostagem">
                                <div className="campoImagem2-processorPostagem"></div>
                                <p className="campoTexto3-processorPostagem">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non malesuada mi. In pellentesque nunc sit amet erat sodales cursus. Aenean scelerisque nunc id ipsum varius, a ultricies metus convallis. Donec vitae nulla dolor. Morbi venenatis tincidunt metus, in elementum felis pharetra ac. Etiam vitae felis vel felis feugiat gravida quis sed nulla. Mauris efficitur tempor enim, quis iaculis nisi hendrerit vel.</p>
                            </section>

                            <section className="quartoParagrafo-processorPostagem">
                                <div className="campoImagem3-processorPostagem"></div>
                                <p className="campoTexto4-processorPostagem">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non malesuada mi. In pellentesque nunc sit amet erat sodales cursus. Aenean scelerisque nunc id ipsum varius, a ultricies metus convallis. Donec vitae nulla dolor. Morbi venenatis tincidunt metus, in elementum felis pharetra ac. Etiam vitae felis vel felis feugiat gravida quis sed nulla. Mauris efficitur tempor enim, quis iaculis nisi hendrerit vel.</p>
                            </section>

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

                        <div className="areaColunista-processodePostagem-professor">

                            <h1 className="titleAreaColunista-processodePostagem">ÁREA DO COLUNISTA</h1>

                            <button className="buttoEnviar-processodePostagem"><p>Imprimir página</p> <i class='bx bxs-printer'></i></button>

                            <button className={`buttoEnviar-processodePostagem ${concluidoClass}`} onClick={handleOpenModalConcluido} disabled={concluidoPostado}><p>Concluído</p> <i class="bi bi-patch-check"></i></button>

                            <button className={`buttoEnviar-processodePostagem ${postarClass}`} disabled={postadoAviso} onClick={handleOpenModal}><p>Postar</p> <i class='bx bx-paper-plane'></i></button>

                            <button className="buttoEnviar-processodePostagem" disabled={voltarParaEditar}><p>Voltar para Editar</p> <i class='bx bxs-edit'></i></button>

                        </div>

                    </div>
                </Col>
            </section>

            {showModal && (
                <div className="modal show" style={{ display: 'block' }} aria-labelledby="exampleModalLabel">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="areaColunista-processodePostagem-certeza" id="exampleModalLabel">VOCÊ TEM CERTEZA QUE DESEJA REALIZAR ESSA POSTAGEM ?</h1>
                                <button type="button" className="buttonFechar-Modal-processoPostagem" onClick={handleCloseModal} aria-label="Close">
                                    <i className="bi bi-x-lg"></i>
                                </button>
                            </div>

                            <div className="modal-body">
                                <h2>Lembre-se que após clicar em SIM não será possível anular a publicação.</h2>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary buttonNao-modal-processoPostagem-professor" onClick={handleCloseModal}>NÃO</button>
                                <button type="button" className="btn btn-primary buttonSim-modal-processoPostagem-professor" onClick={processoPostar}>SIM</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showModal && <div className="modal-backdrop fade show"></div>}

            {showModalConcluido && (
                <div className="modal show" style={{ display: 'block' }} aria-labelledby="exampleModalLabel">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5 titleModal-enviar-processoPostagem" id="exampleModalLabel">VOCÊ TEM CERTEZA QUE DESEJA ENVIAR ESSE ARTIGO?</h1>
                                <button type="button" className="buttonFechar-Modal-processoPostagem" onClick={handleCloseModalConcluido} aria-label="Close">
                                    <i className="bi bi-x-lg"></i>
                                </button>
                            </div>

                            <div className="modal-body">
                                <h2>Lembre-se de que, após clicar em SIM, não será possível cancelar o envio do artigo.</h2>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary buttonNao-modal-processoPostagem-professor" onClick={voltarConcluir}>NÃO</button>
                                <button type="button" className="btn btn-primary buttonSim-modal-processoPostagem-professor" onClick={processoConcluir}>SIM</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showModalConcluido && <div className="modal-backdrop fade show"></div>}

        </div>

    )
}

export default ProcessodePostagemProfessor;