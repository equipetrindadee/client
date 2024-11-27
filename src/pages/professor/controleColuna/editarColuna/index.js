import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios'; // Importando Axios
import 'bootstrap/dist/css/bootstrap.min.css';
import './editarColunaModal.css';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../../../config/firebaseImgConfig.js';  // Ajuste o caminho conforme necessário

import api from '../../../../config/configApi.js'

function ModalEditarColuna({ colunaId, colunaNomeOriginal, corColunaOriginal, bannerColunaOriginal }) {
    const [show, setShow] = useState(false);
    const [colunaNome, setColunaNome] = useState(colunaNomeOriginal);
    const [corColuna, setCorColuna] = useState(corColunaOriginal);
    const [bannerColuna, setBannerColuna] = useState(null);
    const [usuariosEncontrados, setUsuariosEncontrados] = useState([]); // Estado para armazenar os usuários


    const handleClose = () => {
        setShow(false);
        // Resetando os estados para o caso do modal ser aberto novamente
        setColunaNome(colunaNomeOriginal);
        setCorColuna(corColunaOriginal);
        setBannerColuna(null);
    };

    const handleShow = () => {
        console.log("Abrindo modal para coluna ID:", colunaId);
        setShow(true);
    };


    const handleNomeChange = (e) => {
        const value = e.target.value;
        const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
        setColunaNome(capitalizedValue);
    };

    const handleCorChange = (e) => {
        setCorColuna(e.target.value);
    };

    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBannerColuna(file);
        }
    };

    const handleSave = async () => {
        console.log("ID da coluna:", colunaId); // Adicione esta linha para debugar
        try {
            const response = await api.patch(`/colunas/${colunaId}`, {
                columname: colunaNome,
                color: corColuna,
            });
    
            console.log(response.data.mensagem);
            handleClose();  // Fecha o modal após salvar
        } catch (error) {
            console.error('Erro ao atualizar a coluna e os usuários:', error);
            alert(error.response?.data?.mensagem || 'Erro ao atualizar a coluna e os usuários.');
        }
    };
    
    useEffect(() => {
        async function buscarUsuariosColuna() {
            try {
                // Consulta os usuários e as colunas do Firestore
                const usersSnapshot = await getDocs(collection(db, "users"));
                const colunasSnapshot = await getDocs(collection(db, "colunas"));

                // Cria um array de nomes de colunas (columname)
                const colunas = colunasSnapshot.docs.map(doc => doc.data().columname);

                const usuarios = []; // Array para armazenar os usuários encontrados

                // Itera sobre os usuários
                usersSnapshot.forEach(userDoc => {
                    const userData = userDoc.data();
                    const userColuna = userData.coluna;  // Supondo que o campo 'coluna' exista no documento do usuári

                    // Verifica se o nome da coluna do usuário corresponde a algum 'columname'
                    if (colunas.includes(userColuna)) {
                       
                        usuarios.push(userData.nome); // Adiciona o nome do usuário ao array
                    }
                });

                // Atualiza o estado com os usuários encontrados
                setUsuariosEncontrados(usuarios);
               

            } catch (error) {
                console.error("Erro ao buscar usuários e colunas:", error);
            }
        }

        buscarUsuariosColuna(); // Chama a função quando o componente for montado
    }, []);


    return (
        <div>
            <Button onClick={handleShow} className='buttonDesignEditarColuna'>
                <i className='bx bxs-pencil editControleColuna'></i>
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
                    <Modal.Title className="titleModalCriarColuna">EDITAR COLUNA</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className='formCriarColuna'>
                        <Form.Group className="mb-3 criarColunaChoiceColunaColor" controlId="formText">
                            <Form.Label className='labelCriarColuna'>Nome da coluna: </Form.Label>
                            <Form.Control
                                className='criarColunaInput'
                                type="text"
                                value={colunaNome}
                                onChange={handleNomeChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3 criarColunaInsertColunaColor" controlId="formColor">
                            <Form.Label className='labelCriarColuna'>Selecione uma cor para coluna criada :</Form.Label>
                            <Form.Control
                                className='criarColunaInputColor'
                                type="color"fo
                                title="Escolha a cor da coluna"
                                value={corColuna}
                                onChange={handleCorChange}
                            />
                        </Form.Group>

                        {/* Campo para Upload de Imagem, agora desativado */}
                        <Form.Group className="mb-3 criarColunaIUploadColunaColor" controlId="formFile">
                            <Form.Label className='labelCriarColuna'>Selecione um banner para coluna:</Form.Label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleBannerChange}
                                disabled // Botão desativado
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="modalCriarColunaFooter justify-content-start">
                    <Button className='buttonSalvarColuna' onClick={handleSave}>
                        SALVAR
                    </Button>
                    <h3>Usuários Encontrados:</h3>
            {usuariosEncontrados.length > 0 ? (
                <ul>
                    {usuariosEncontrados.map((nome, index) => (
                        <li key={index}>{nome}</li>
                    ))}
                </ul>
            ) : (
                <p>Nenhum usuário encontrado com a coluna correspondente.</p>
            )}
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalEditarColuna;
