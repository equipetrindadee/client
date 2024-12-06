import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { getFirestore, doc, updateDoc, getDoc,collection, addDoc} from "firebase/firestore";  
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../areaProfessor/areaProfessor.css';

export const AreaProfessor = () => {

    const [showModal, setShowModal] = useState(false);
    const [showModalConcluido, setShowModalConcluido] = useState(false);
    const [postarClass, setPostarClass] = useState('');
    const [avisoPostarClass, setAvisoPostarClass] = useState('');
    const [postadoAviso, setPostadoAviso] = useState(true);
    const [concluidoPostado, setConcluidoPostado] = useState(false);
    const [concluidoClass, setConcluidoClass] = useState('');
    const [avisoConcluidoClass, setAvisoConcluidoClass] = useState('');
    const [voltarParaEditar, setVoltarParaEditar] = useState(false);
    const [selectedPublicationId, setSelectedPublicationId] = useState('');

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleOpenModalConcluido = () => setShowModalConcluido(true);
    const handleCloseModalConcluido = () => setShowModalConcluido(false);

    const processoPostar = () => {
        // Atualiza o estado para refletir o processo de postagem
        setPostarClass("buttoEnviar-processodePostagem-postado");
        setAvisoPostarClass("materiaPostada-processoPostagem");
        setConcluidoPostado(true);
        setConcluidoClass("");
        setAvisoConcluidoClass("");
        setVoltarParaEditar(true);
        setPostadoAviso(true);
        handleCloseModal();
    
        // Verifica se há um ID de publicação selecionado
        if (selectedPublicationId) {
            const db = getFirestore();
            const edicaoRef = doc(db, "edicao", selectedPublicationId);
    
            // Atualiza o status na coleção 'edicao'
            updateDoc(edicaoRef, { status: "Postado" })
                .then(() => {
                    console.log("Status atualizado com sucesso na coleção 'edicao'.");
    
                    // Obter os dados da publicação na coleção 'edicao'
                    return getDoc(edicaoRef);
                })
                .then((edicaoDoc) => {
                    if (edicaoDoc.exists()) {
                        const edicaoData = edicaoDoc.data();
    
                        // Adicionar o documento na coleção 'jornal' apenas se o status for 'Postado'
                        if (edicaoData.status === "Postado") {
                            const jornalCollection = collection(db, "jornal");
    
                            return addDoc(jornalCollection, {
                                ...edicaoData, // Copia os dados do documento original
                                dataPostagem: new Date(), // Adiciona a data de postagem
                            });
                        } else {
                            console.warn("O status não é 'Postado'. Nenhuma ação realizada na coleção 'jornal'.");
                        }
                    } else {
                        console.error("Documento na coleção 'edicao' não encontrado.");
                    }
                })
                .then(() => {
                    console.log("Documento adicionado com sucesso à coleção 'jornal'.");
                })
                .catch((error) => {
                    console.error("Erro ao processar postagem:", error);
                });
        } else {
            console.error("ID da publicação não encontrado.");
        }
    };

    const processoConcluir = () => {
        setConcluidoClass('buttoEnviar-processodePostagem-concluido');
        setAvisoConcluidoClass('materiaConcluida-processoPostagem');
        handleCloseModalConcluido();
        setPostadoAviso(false);

        if (selectedPublicationId) {
            const db = getFirestore();
            const edicaoRef = doc(db, "edicao", selectedPublicationId);

            updateDoc(edicaoRef, {
                status: 'Concluído',
            })
                .then(() => {
                    console.log("Status atualizado com sucesso!");
                })
                .catch((error) => {
                    console.error("Erro ao atualizar o status: ", error);
                });
        } else {
            console.error("ID da publicação não encontrado.");
        }
    };

    useEffect(() => {
        const fetchPublicationStatus = async () => {
            const publicationId = localStorage.getItem('selectedPublicationId');
            if (publicationId) {
                setSelectedPublicationId(publicationId);

                try {
                    const db = getFirestore();
                    const edicaoRef = doc(db, "edicao", publicationId);
                    const docSnap = await getDoc(edicaoRef);

                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        if (data.status === 'Concluido') {
                            setConcluidoClass('buttoEnviar-processodePostagem-concluido');
                            setAvisoConcluidoClass('materiaConcluida-processoPostagem');
                            setPostadoAviso(false); // desabilita "Postar"
                            setConcluidoPostado(true); // desabilita "Concluir"
                        }
                    } else {
                        console.error("Documento não encontrado.");
                    }
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        if (data.status === 'Postado') {
                            setPostarClass('buttoEnviar-processodePostagem-postado');
                            setAvisoPostarClass('materiaPostada-processoPostagem');
                            setConcluidoPostado(true);
                            setConcluidoClass('');
                            setAvisoConcluidoClass('');
                            setVoltarParaEditar(true);
                            setPostadoAviso(true);
                            handleCloseModal();
                        }
                    } else {
                        console.error("Documento não encontrado.");
                    }
                } catch (error) {
                    console.error("Erro ao buscar status da publicação: ", error);
                }
            }
        };

        fetchPublicationStatus();
    }, []);

    const voltarConcluir = () => {
        setConcluidoClass('');
        setPostadoAviso(true);
        setAvisoConcluidoClass('');
        setShowModalConcluido(false);
    };

    return (
        <div>
            <section className='container-postadoConcluido-processoPostagem'>
                <div className={`materiaNaoPostada-processoPostagem ${avisoPostarClass}`}>
                    <h1>SUA MÁTERIA FOI POSTADA</h1>
                </div>
                <div className={`materiaNaoConcluida-processoPostagem ${avisoConcluidoClass}`}>
                    <h1>SUA MÁTERIA FOI CONCLUÍDA</h1>
                </div>
            </section>

            <section className="container-areaColunista-processodePostagem">
                <Col className="content-areaColunista-processodePostagem">
                    <div className="areaColunista-processodePostagem-professor">
                        <h1 className="titleAreaColunista-processodePostagem">ÁREA DO PROFESSOR</h1>
                        <button className="buttoEnviar-processodePostagem"><p>Imprimir página</p> <i className='bx bxs-printer'></i></button>
                        <button className={`buttoEnviar-processodePostagem ${concluidoClass}`} onClick={handleOpenModalConcluido} disabled={concluidoPostado}><p>Concluído</p> <i className="bi bi-patch-check"></i></button>
                        <button className={`buttoEnviar-processodePostagem ${postarClass}`} disabled={postadoAviso} onClick={handleOpenModal}><p>Postar</p> <i className='bx bx-paper-plane'></i></button>
                        <button className="buttoEnviar-processodePostagem" disabled={voltarParaEditar}><p>Voltar para Editar</p> <i className='bx bxs-edit'></i></button>
                    </div>
                </Col>
            </section>

            {/* Modal de postagem */}
            {showModal && (
                <div className="modal show" style={{ display: 'block' }} aria-labelledby="exampleModalLabel">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5 titleModal-enviar-processoPostagem" id="exampleModalLabel">VOCÊ TEM CERTEZA QUE DESEJA REALIZAR ESSA POSTAGEM ?</h1>
                                <button type="button" className="buttonFechar-Modal-processoPostagem" onClick={handleCloseModal} aria-label="Close">
                                    <i className="bi bi-x-lg"></i>
                                </button>
                            </div>
                            <div className="modal-body avisoModal-modal-processoPostagem">
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

            {/* Modal de conclusão */}
            {showModalConcluido && (
                <div className="modal show" style={{ display: 'block' }} aria-labelledby="exampleModalLabel">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5 titleModal-enviar-processoPostagem" id="exampleModalLabel">VOCÊ TEM CERTEZA QUE DESEJA CONCLUIR ESSE ARTIGO?</h1>
                                <button type="button" className="buttonFechar-Modal-processoPostagem" onClick={handleCloseModalConcluido} aria-label="Close">
                                    <i className="bi bi-x-lg"></i>
                                </button>
                            </div>
                            <div className="modal-body avisoModal-modal-processoPostagem">
                                <h2>Lembre-se que após clicar em SIM não será possível anular a conclusão do artigo.</h2>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary buttonNao-modal-processoPostagem-professor" onClick={handleCloseModalConcluido}>NÃO</button>
                                <button type="button" className="btn btn-primary buttonSim-modal-processoPostagem-professor" onClick={processoConcluir}>SIM</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showModalConcluido && <div className="modal-backdrop fade show"></div>}
        </div>
    );
};


export default AreaProfessor;
