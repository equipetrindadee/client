import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import './criarUsuario.css';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../../../../config/firebaseImgConfig.js'; // Importando a configuração do Firebase
import api from '../../../../config/configApi.js'; // Importando a configuração do Axios


function ModalCriarUsuario() {
    const [show, setShow] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [categoria, setcategoria] = useState('aluno');
    const [acesso, setacesso] = useState('ilimitado');
    const [email, setEmail] = useState('');
    const [name, setname] = useState(''); // Estado para o name
    const [password, setPassword] = useState('');
    const [anoEscolar, setanoEscolar] = useState('Ano escolar');
    const [column, setColumn] = useState('Colunas');
    const [anoEscolars] = useState(['8°B do Ensino Fundamental', '8°A do Ensino Fundamental',
        '9°B do Ensino Fundamental', '9°A do Ensino Fundamental',
        '1°A do Ensino Médio', '1°B do Ensino Médio', '2°A do Ensino Médio',
        '2°B do Ensino Médio', '3°A do Ensino Médio', '3°B do Ensino Médio', 'N/A']);
    const [columns, setColumns] = useState([]); // Estado para armazenar colunas
    const [selectedImage, setSelectedImage] = useState(null);
    const [file, setFile] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [fetchedImages, setFetchedImages] = useState([]);
    const [userId, setUserId] = useState(null);

    const [userData, setUserData] = useState({
        image: "", // ou outro valor padrão que precisar
        // Outros campos de dados do usuário
    });



    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        fetchColumns(); // Chama a função ao montar o componente
    }, []);

    const fetchColumns = async () => {
        try {
            const columnRef = collection(db, 'colunas');
            const columnSnap = await getDocs(columnRef);
            const columnData = columnSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Adiciona o ID do documento aos dados
            setColumns(columnData);
        } catch (error) {
            console.error('Erro ao buscar colunas:', error);
        }
    };



    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            // Atualiza o estado para exibir a imagem de pré-visualização
            setSelectedImage(URL.createObjectURL(file));
            setFile(file);

            try {
                // Chama o método de upload de imagem
                const imageUrl = await api.uploadImage(file);

                // Armazena a URL da imagem no estado do usuário
                setUserData((prevData) => ({
                    ...prevData,
                    image: imageUrl, // Salva a URL retornada no campo de imagem
                }));
            } catch (error) {
                console.error("Erro ao fazer upload da imagem:", error);
            }
        }
    };



    const handlecategoriaChange = (e) => {
        setcategoria(e.target.value);
        if (e.target.value === 'aluno') {
            setacesso('ilimitado');
            setanoEscolar('Ano escolar'); // Mantém o valor padrão para alunos
        } else if (e.target.value === 'professor') {
            setanoEscolar('N/A'); // Preenche automaticamente com "N/A" para professores
        }
    };


    const handleacessoChange = (e) => setacesso(e.target.value);
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleNameChange = (e) => {
        const inputName = e.target.value;
        const capitalized = inputName.charAt(0).toUpperCase() + inputName.slice(1);
        setname(capitalized);
    };


    const handlePasswordChange = (e) => setPassword(e.target.value);

    // Funções para lidar com a seleção de ano e coluna
    const handleanoEscolarSelect = (selectedanoEscolar) => {
        const anoEscolarCode = selectedanoEscolar.split(' ')[0]; // Extrai o código do ano
        setanoEscolar(anoEscolarCode);
    };
    const handleColumnSelect = (selectedColumn) => {
        setColumn(selectedColumn); // Salva o name da coluna diretamente
    };

    // Função para criar o usuário no Firestore
    const handleCreateUser = async () => {
        if (!file) {
            setErrorMessage('Por favor, selecione uma imagem.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('coluna', column); // Altera de 'column' para 'coluna'
        formData.append('categoria', categoria);
        formData.append('acesso', categoria === 'aluno' ? '' : acesso);
        formData.append('anoEscolar', anoEscolar);
        formData.append('image', file); // Adicionando a imagem ao FormData

        try {
            // Fazendo uma requisição POST para criar o usuário e enviar a imagem
            const response = await api.post('/formulario', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data.mensagem); // Exibe a mensagem de sucesso
            setSuccessMessage('Usuário criado e imagem enviada com sucesso!');
            setSelectedImage(null);
            setFile(null);
            handleClose(); // Fecha o modal após salvar
        } catch (error) {
            console.error('Erro ao criar usuário e enviar imagem:', error);
            setErrorMessage('Erro ao criar usuário e enviar imagem. Tente novamente.');
        }
    };




    return (
        <div>
            <button
                onClick={handleShow}
                className='contentColunaHeaderContentProfessor-buttonCriarUsuario'>
                <i className='bx bx-plus plusCriarUsuarioColuna'></i>
                <p className='contentColunaHeaderContentProfessor-buttonCriarUsuarioP' >Criar Usuário</p>
            </button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton className="modalHeaderCloseButtonCriarUsuario"></Modal.Header>
                <Modal.Header className="imgProfileContainerModalCriarUsuario">
                    <div className='imgProfileContainerModalCriarUsuarioDivBody'>
                        <div className="profileImgCircleReceiveImg">
                            {selectedImage ? (
                                <img src={selectedImage} alt="Perfil" className="profileImgCriarUsuarioModal" />
                            ) : (
                                <div className="placeholder-image"><i className='bx bx-user userNotImgCriarUsuario'></i></div>
                            )}
                        </div>
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: 'none' }} // Esconde o input
                            accept="image/*"
                            onChange={handleImageChange} // Atualiza o estado quando a imagem for selecionada
                        />

                        <div className="profileImgCircleInputImgCriarUsuario" onClick={() => document.getElementById('fileInput').click()}>
                            <div className="profileImgCircleSelectorImgCriarUsuario">
                                <i className='bx bxs-pencil'></i>
                            </div>

                        </div>

                    </div>
                    <div className="divAcceptImgProfileLineCriarUsuario"></div>
                    <Modal.Title className="imgProfileTitleModalCriarUsuario">CRIAR USUÁRIO</Modal.Title>
                </Modal.Header>

                <Modal.Body className="modalBodyContainerCriarUsuario">
                    <Form className='formContentModalBody'>
                        <Form.Group controlId="formname">
                            <Form.Label className="labelControleColunaCriarUsuario">Nome</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={handleNameChange} // Permite que o usuário edite o name manualmente
                                className="inputControleColunaCriarUsuario"
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label className="labelControleColunaCriarUsuario">Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                className="inputControleColunaCriarUsuario"
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label className="labelControleColunaCriarUsuario">Senha</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                className="inputControleColunaCriarUsuario"
                            />
                        </Form.Group>
                        <Form.Group controlId="formcategoria">
                            <div className="firstRadialGroupCriarUsuarioControleColuna">
                                <Form.Check
                                    type="radio"
                                    label="Aluno"
                                    name="categoria"
                                    value="aluno"
                                    checked={categoria === 'aluno'}
                                    onChange={handlecategoriaChange}
                                    className="typeUserControleColuna"
                                />
                                <Form.Check
                                    type="radio"
                                    label="Professor"
                                    name="categoria"
                                    value="professor"
                                    checked={categoria === 'professor'}
                                    onChange={handlecategoriaChange}
                                    className="typeUserControleColuna"
                                />
                            </div>
                        </Form.Group>

                        {/* Dropdown de Ano Escolar */}
                        <Dropdown drop='up'>
                            <Dropdown.Toggle id="dropdown-anoEscolar" className="dropdownChoiceControleColunaCriarUsuario">
                                {anoEscolar || 'Ano escolar'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdownMenuControleColunaCriarUsuario">
                                {anoEscolars
                                    .filter((anoEscolarOption) => categoria === 'professor' || anoEscolarOption !== 'N/A')
                                    .map((anoEscolarOption, index) => (
                                        <Dropdown.Item
                                            key={index}
                                            onClick={() => handleanoEscolarSelect(anoEscolarOption)}
                                            className="dropdownItemControleColunaCriarUsuario"
                                        >
                                            {anoEscolarOption}
                                        </Dropdown.Item>
                                    ))}
                            </Dropdown.Menu>
                        </Dropdown>

                        {/* Dropdown de Colunas */}
                        <Dropdown drop='up'>
                            <Dropdown.Toggle id="dropdown-column" className="dropdownChoiceControleColunaCriarUsuario">
                                {column || 'Colunas'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdownMenuControleColunaCriarUsuario colunasMenuMt">
                                {columns.map((columnOption) => (
                                    <Dropdown.Item key={columnOption.id} onClick={() => handleColumnSelect(columnOption.columname)} className="dropdownItemControleColunaCriarUsuario">
                                        {columnOption.columname}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Form.Label className="criarUsuarioControleColunasCampoObrigatorio">*Este campo é obrigatório</Form.Label>

                        {categoria === 'professor' && (
                            <Form.Group controlId="formacesso">
                                <div className="secondRadialGroupCriarUsuarioControleColuna">
                                    <div className="secondRadialGroupCriarUsuarioControleColunaFormCheck">
                                        <Form.Check
                                            type="radio"
                                            label="Acesso ilimitado"
                                            name="acesso"
                                            value="ilimitado"
                                            className="typeUserControleColuna"
                                            checked={acesso === 'ilimitado'}
                                            onChange={handleacessoChange}
                                        />
                                        <p className='secondRadialGroupCriarUsuarioControleColunaP'>* O professor terá acesso a todos os recursos disponíveis</p>
                                    </div>
                                    <div className="secondRadialGroupCriarUsuarioControleColunaFormCheck">
                                        <Form.Check
                                            type="radio"
                                            label="Acesso limitado"
                                            name="acesso"
                                            value="limitado"
                                            className="typeUserControleColuna"
                                            checked={acesso === 'limitado'}
                                            onChange={handleacessoChange}
                                        />
                                        <p className='secondRadialGroupCriarUsuarioControleColunaP'>* O professor terá acesso apenas na coluna em que ele é responsável</p>
                                    </div>
                                </div>
                            </Form.Group>
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer className="modalFooterContainerCriarUsuario">
                    <Button
                        className='buttonControleDeColunaModalCriarUsuarioCriar'
                        onClick={handleCreateUser}
                    >
                        <p className='buttonControleDeColunaModalCriarUsuarioCriarButton'>CRIAR</p>
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}

export default ModalCriarUsuario;