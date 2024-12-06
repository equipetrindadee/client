import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './modalCriarColuna.css';
import api from '../../../../config/configApi.js'; // Importando a configuração da API

function ModalCriarColuna() {
    const [show, setShow] = useState(false);
    const [columname, setColumname] = useState(''); // Estado para o nome da coluna
    const [color, setColor] = useState('#000000'); // Estado para a cor da coluna
    const [imageColumn, setImageColumn] = useState(null); // Estado para a imagem da coluna
    const [imagePreview, setImagePreview] = useState(''); // Estado para pré-visualizar a imagem
    const [isSaving, setIsSaving] = useState(false); // Estado para controlar o botão "Salvar"
    const [imageError, setImageError] = useState(''); // Estado para armazenar erros de imagem
    const [isImageValid, setIsImageValid] = useState(true); // Estado para verificar se a imagem é válida

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Função para salvar a coluna
    const handleSave = async () => {
        setIsSaving(true); // Ativa o estado de "salvando" (desativa o botão)
        
        const formData = new FormData();
        formData.append('columname', columname);
        formData.append('color', color);
        formData.append('estadoColuna', 'ativo'); // Sempre começa como 'ativo'
        if (imageColumn) {
            formData.append('imageColumn', imageColumn); // Adiciona a imagem ao FormData
        }

        try {
            const response = await api.post('/colunas', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Importante para enviar arquivos
                },
            });
            console.log('Coluna criada com ID:', response.data.id);
            handleClose(); // Fecha o modal após salvar
        } catch (error) {
            console.error('Erro ao criar coluna:', error);
        } finally {
            setIsSaving(false); // Restaura o estado para "não salvando"
        }
    };

    // Função para lidar com a seleção de imagem
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        
        // Verifica se o arquivo é uma imagem PNG
        if (file && file.type === 'image/png') {
            setImageColumn(file);
            setImageError(''); // Limpa qualquer erro anterior
            setIsImageValid(true); // Marca a imagem como válida

            // Gerar pré-visualização da imagem
            const objectUrl = URL.createObjectURL(file);
            setImagePreview(objectUrl);
        } else {
            setImageColumn(null); // Reseta o arquivo se não for .png
            setImagePreview(''); // Reseta a pré-visualização
            setImageError('Por favor, envie apenas imagens no formato .png.'); // Exibe a mensagem de erro
            setIsImageValid(false); // Marca a imagem como inválida
        }
    };

    return (
        <div>
            <Button
                onClick={handleShow}
                className="contentColunaHeaderContentProfessor-buttonCriarColuna"
            >
                <i className="bx bx-plus-circle plusColunaCriarColuna"></i> 
                <p className="contentColunaHeaderContentProfessor-buttonCriarColunaP">Criar coluna</p>
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
                    <Modal.Title className="titleModalCriarColuna">CRIAR COLUNA</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className='formCriarColuna'>
                        {/* Campo de Texto */}
                        <Form.Group className="mb-3 criarColunaChoiceColunaColor" controlId="formText">
                            <Form.Label className='labelCriarColuna'>Nome da coluna: </Form.Label>
                            <Form.Control
                                className='criarColunaInput'
                                type="text"
                                value={columname} // Liga o estado ao input
                                onChange={(e) => setColumname(e.target.value)} // Atualiza o estado ao digitar
                            />
                        </Form.Group>

                        {/* Campo para Seleção de Cor */}
                        <Form.Group className="mb-3 criarColunaInsertColunaColor" controlId="formColor">
                            <Form.Label className='labelCriarColuna'>Selecione uma cor para coluna criada:</Form.Label>
                            <Form.Control
                                className='criarColunaInputColor'
                                type="color"
                                value={color} // Liga o estado ao input
                                onChange={(e) => setColor(e.target.value)} // Atualiza o estado ao selecionar a cor
                                title="Escolha a cor da coluna"
                            />
                        </Form.Group>

                        {/* Campo para Upload de Imagem */}
                        <Form.Group className="mb-3 criarColunaIUploadColunaColor" controlId="formFile">
                            <Form.Label className='labelCriarColuna'>Selecione um banner para coluna:</Form.Label>
                            <Form.Control 
                                type="file" 
                                accept="image/png" // Limita a seleção para arquivos .png
                                onChange={handleImageChange} // Atualiza o estado com o arquivo selecionado
                            />
                        </Form.Group>

                        {/* Mensagem de erro se o arquivo não for .png */}
                        {imageError && <Alert variant="danger">{imageError}</Alert>}

                        {/* Exibindo a imagem pré-visualizada */}
                        {imagePreview && (
                            <div className="imagePreviewContainer">
                                <img 
                                    src={imagePreview} 
                                    alt="Pré-visualização" 
                                    className="imagePreview" 
                                />
                            </div>
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer className="modalCriarColunaFooter justify-content-start">
                    <Button 
                        className='buttonSalvarColuna' 
                        onClick={handleSave}
                        disabled={isSaving || !isImageValid} // Desativa o botão se não for uma imagem válida
                    >
                        <p className='buttonSalvarColunaP'>
                            {isSaving ? 'Aguarde...' : 'SALVAR'} {/* Exibe "Aguarde..." enquanto está salvando */}
                        </p>
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalCriarColuna;
