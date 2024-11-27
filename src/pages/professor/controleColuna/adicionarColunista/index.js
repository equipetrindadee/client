import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { db } from '../../../../config/firebaseImgConfig.js'; // Ajuste o caminho conforme necessário
import api from '../../../../config/configApi.js'; // Importando 'api'

import './adicionarColunista.css';

function ModalAdicionarColunista({ columnName }) {
    const [show, setShow] = useState(false);
    const [selectedColunistas, setSelectedColunistas] = useState([]);
    const [colunistas, setColunistas] = useState([]);
    const [searchText, setSearchText] = useState('');

    const [colunistaImg, setcolunistaImg] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        fetchColunistas();
    };

    const handleCheckboxChange = (event, colunista) => {
        if (event.target.checked) {
            setSelectedColunistas([...selectedColunistas, colunista]);
        } else {
            setSelectedColunistas(selectedColunistas.filter(c => c.id !== colunista.id));
        }
    };

    const fetchColunistas = async () => {
        try {
            const response = await api.get('/users'); // Obtenha todos os usuários
    
            if (response.data && !response.data.error) {
    
                const userData = await Promise.all(response.data.users.map(async (user) => {
                    return {
                        id: user.id,
                        nome: user.name || user.email,
                        anoEscolar: user.anoEscolar || 'Não informado',
                        img: user.imagemUrl || 'url_da_imagem_padrao', // Corrigido para 'imagemUrl'
                        categoria: user.categoria,
                        coluna: user.coluna
                    };
                }));
    
                const alunos = userData.filter(user => user.categoria === 'aluno');
                setColunistas(alunos);
    
                const alunosNaColuna = alunos.filter(user => user.coluna === columnName);
                setSelectedColunistas(alunosNaColuna);
            } else {
                console.error("Erro na resposta da API:", response.data.mensagem);
            }
        } catch (error) {
            console.error("Erro ao buscar alunos:", error);
        }
    };

    const handleAddColunistas = async () => {
        try {
            // Atualizando a coluna apenas para os colunistas selecionados
            for (const colunista of selectedColunistas) {
                const userDocRef = doc(db, 'users', colunista.id);
                await setDoc(userDocRef, { coluna: columnName }, { merge: true }); // Atualiza o campo coluna
            }

            // Não atualiza o campo 'coluna' dos colunistas não selecionados
            console.log("Colunistas atualizados com a coluna:", columnName);
            handleClose(); // Fecha o modal após adicionar
        } catch (error) {
            console.error("Erro ao atualizar colunistas:", error);
        }
    };

    // Filtra colunistas com base no texto de pesquisa
    const filteredColunistas = colunistas.filter(colunista =>
        colunista.nome && colunista.nome.toLowerCase().includes(searchText.toLowerCase())
    );

    useEffect(() => {
        fetchColunistas();
    }, []);

    const [colunistaImgs, setColunistaImgs] = useState({}); // Estado para armazenar as URLs das imagens

    // const fetchColunistaImage = async (id) => {
    //     try {
    //         const response = await api.get(`/users/${id}/image`);
    //         if (response.data && response.data.imageUrl) {
    //             setColunistaImgs(prevState => ({
    //                 ...prevState,
    //                 [id]: response.data.imageUrl
    //             }));
    //         }
    //     } catch (error) {
    //         console.error(`Erro ao buscar a imagem do colunista ${id}:`, error);
    //     }
    // };

    // Chame essa função para cada colunista ao renderizar
    // useEffect(() => {
    //     colunistas.forEach(colunista => {
    //         if (!colunistaImgs[colunista.id]) { // Verifique se a imagem já foi buscada
    //             fetchColunistaImage(colunista.id);
    //         }
    //     });
    // }, [colunistas]); // Dependência para chamar ao modificar colunistas

    const [isExpanded, setIsExpanded] = useState(false); // Controla se o input está expandido
    const [inputValue, setInputValue] = useState(''); // Controla o valor do input

    const handleFocus = () => {
        setIsExpanded(true); // Expande o input ao clicar
    };

    const handleBlur = () => {
        if (inputValue === '') {
            setIsExpanded(false); // Encolhe o input se não houver texto
        }
    };

    const handleSearchChange = (e) => {
        const text = e.target.value;
        setSearchText(text);
    };

    return (
        <div>
            <Button onClick={handleShow} className='buttonModalAdicionarColuna'>
                <i className='bx bx-plus-circle'></i>
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                className='modalAdiconarColunaDesign'
                keyboard={false}
                centered
            >
                <Modal.Header closeButton className="modalAdicionarColunistaHeader">
                    <Modal.Title className="titleModalCriarColuna">ADICIONAR COLUNISTAS</Modal.Title>
                </Modal.Header>
                <Modal.Body className='modalBodyControleColunaAdicionarColuna'>
                    {/* Exibe o nome da coluna no modal */}
                    <div className='modalAdicionarColunistaHeaderBody'>
                        <Modal.Title className='titleModalAdicionarColunaAlunos'>Alunos</Modal.Title>
                        <div className={`search-containerMaster ${isExpanded ? 'expandedMaster' : ''}`}>
                            <input
                                type="text"
                                value={searchText}
                                onChange={handleSearchChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                className="search-inputMaster"
                            />
                            <i class='bx bx-search search-iconMaster'></i>
                        </div>
                    </div>
                    <div className='modalAdicionarColunistaBody'>
                        <div className="ListColunistasControleColuna">
                            {filteredColunistas.map((colunista) => (
                                <div key={colunista.id} className="ListColunistasControleColuna-item">
                                    <Form.Check
                                        type="checkbox"
                                        checked={selectedColunistas.some(c => c.id === colunista.id)} // Marca a checkbox se o colunista está na coluna
                                        onChange={(e) => handleCheckboxChange(e, colunista)}
                                        className="checkboxColunista"
                                    />
                                    <div className="ListColunistasControleColuna-info">
                                        <img
                                            src={colunista.img || 'url_da_imagem_padrao'} // Usa a URL obtida ou uma URL padrão
                                            alt={colunista.nome}
                                            className="colunistaAdicionar-img"
                                        />
                                        <div className="ListColunistasControleColuna-details">
                                            <span className="AdicionarColunista-nome">{colunista.nome}</span>
                                            <span className="AdicionarColunista-ano">{colunista.anoEscolar}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modalCriarColunaFooter justify-content-center">
                    <Button className='buttonAdicionarColunistas' onClick={handleAddColunistas}>
                        <p className='buttonAdicionarColunistasP'>ADICIONAR COLUNISTAS</p>
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalAdicionarColunista;
