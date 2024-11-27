import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Dropdown } from "react-bootstrap";
import { getDoc, doc, getDocs, collection, updateDoc } from 'firebase/firestore';
import { db } from '../../../../config/firebaseImgConfig.js'; // Importando a configuração do Firebase
import "../modalEditarUsuario/modalEditarUsuario.css"

function ModalEditarUsuario({ showModal, setShowModal, userId }) {
    const [profileImage, setProfileImage] = useState(null);
    const [categoria, setCategoria] = useState('aluno');
    const [acesso, setAcesso] = useState('ilimitado'); // Estado inicial, mas será alterado se categoria for "aluno"
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [password, setPassword] = useState('');
    const [anoEscolar, setAnoEscolar] = useState('Ano escolar');
    const [column, setColumn] = useState('Colunas'); // Valor inicial atualizado
    const [years, setYears] = useState(['8°A do Ensino Fundamental', '8°B do Ensino Fundamental',
        '9°A do Ensino Fundamental', '9°B do Ensino Fundamental',
        '1°A do Ensino Médio', '1°B do Ensino Médio', '2°A do Ensino Médio',
        '2°B do Ensino Médio', '3°A do Ensino Médio', '3°B do Ensino Médio', 'N/A']); // Exemplos de anos escolares
    const [columns, setColumns] = useState([]); // Inicializa como um array vazio
    const [confirmationMessage, setConfirmationMessage] = useState(''); // Estado para a mensagem de confirmação

    const handleClose = () => {
        setShowModal(false);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleYearSelect = (year) => {
        const yearPart = year.split(' ')[0]; // Divide a string e pega a primeira parte
        setAnoEscolar(yearPart); // Atualiza o estado com apenas a parte do ano
    };

    const handleColumnSelect = (column) => {
        setColumn(column);
    };

    const handleUserTypeChange = (e) => {
        const selectedCategory = e.target.value;
        setCategoria(selectedCategory);

        // Se a categoria for "aluno", o acesso deve ser uma string vazia
        if (selectedCategory === 'aluno') {
            setAcesso('');
        } else {
            setAcesso('ilimitado'); // Se for professor, redefine para 'ilimitado'
        }
    };

    const handleAccessTypeChange = (e) => {
        const selectedAccess = e.target.value;

        // Não permite que o tipo de acesso seja alterado se a categoria for "aluno"
        if (categoria !== 'aluno') {
            setAcesso(selectedAccess);
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            if (userId) {
                const docRef = doc(db, 'users', userId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setName(data.name || '');
                    setEmail(data.email || '');
                    setAnoEscolar(data.anoEscolar || 'Ano escolar');
                    setColumn(data.coluna || 'Colunas');
                    setProfileImage(data.profileImage || null);
                    setCategoria(data.categoria || 'aluno');
                    setAcesso(data.categoria === 'aluno' ? '' : (data.acesso || 'ilimitado')); // Ajusta o acesso baseado na categoria
                    setImage(data.imagemUrl || "imagem de perfil")
                }
            }
        };

        const fetchColumns = async () => {
            try {
                const columnsSnapshot = await getDocs(collection(db, 'colunas'));
                const columnsData = columnsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    name: doc.data().columname // Aqui estamos usando 'columname'
                }));
                console.log('Colunas recuperadas:', columnsData); // Verifique se as colunas estão sendo recuperadas
                setColumns(columnsData);
            } catch (error) {
                console.error('Erro ao buscar colunas: ', error);
            }
        };

        fetchUserData();
        fetchColumns(); // Chama a função para buscar colunas
    }, [userId]);

    const handleSaveChanges = async () => {
        if (userId) {
            try {
                const userRef = doc(db, 'users', userId);
                await updateDoc(userRef, {
                    name,
                    email,
                    anoEscolar,
                    coluna: column,
                    categoria,
                    profileImage,
                    acesso,
                    image
                });

                // Define a mensagem de confirmação
                setConfirmationMessage('Usuário atualizado com sucesso!');

                // Fecha o modal após 2 segundos
                setTimeout(() => {
                    handleClose();
                    setConfirmationMessage(''); // Limpa a mensagem de confirmação
                }, 2000);
            } catch (error) {
                console.error('Erro ao atualizar usuário: ', error);
                alert('Erro ao atualizar usuário. Tente novamente.');
            }
        } else {
            handleClose();
        }
    };

    return (
        <Modal show={showModal} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton className="modalHeaderCloseButtonEditarUsuario"></Modal.Header>
            <Modal.Header className="imgProfileContainerModalEditarUsuario">
                <div className='imgProfileContainerModalEditarUsuarioDivBody'>
                    <div className="profileImgCircleReceiveImgEditarUsuario">
                        {image ? (
                            <img src={image} alt="Perfil" className="profileImgEditarUsuarioModal" />
                        ) : (
                            <div className="placeholder-image"><i className='bx bx-user userNotImgEditarUsuario'></i></div>
                        )}
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="inputFile"
                        id="fileInput"
                        style={{ display: 'none' }}
                    />
                    <div className="profileImgCircleInputImgEditarUsuario" onClick={() => document.getElementById('fileInput').click()}>
                        <div className="profileImgCircleSelectorImgEditarUsuario">
                            <i className='bx bxs-pencil'></i>
                        </div>
                    </div>

                </div>
                <div className="divAcceptImgProfileLineEditarUsuario"></div>

                <Modal.Title className="imgProfileTitleModalEditarUsuario">EDITAR USUÁRIO</Modal.Title>
            </Modal.Header>

            <Modal.Body className="modalBodyContainerEditarUsuario">
                <Form className='formContentModalBodyEditarUsuario'>
                    <Form.Group controlId="formName">
                        <Form.Label className="labelModalEditarUsuario">Nome</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="inputModalEditarUsuario"
                        />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label className="labelModalEditarUsuario">Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="inputModalEditarUsuario"
                        />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label className="labelModalEditarUsuario">Senha</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="inputModalEditarUsuario"
                        />
                    </Form.Group>
                    <Form.Group controlId="formUserType">
                        <div className="firstRadialGroupCriarUsuarioModalEditarUsuario">
                            <Form.Check
                                type="radio"
                                label="Aluno"
                                name="userType"
                                value="aluno"
                                checked={categoria === 'aluno'}
                                onChange={handleUserTypeChange}
                                className="typeUserModalEditarUsuario"
                            />
                            <Form.Check
                                type="radio"
                                label="Professor"
                                name="userType"
                                value="professor"
                                checked={categoria === 'professor'}
                                onChange={handleUserTypeChange}
                                className="typeUserModalEditarUsuario"
                            />
                        </div>
                    </Form.Group>

                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-year" className="dropdownChoiceModalEditarUsuario">
                            {anoEscolar}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdownMenuModalEditarUsuario">
                            {years.map((yearOption, index) => (
                                <Dropdown.Item key={index} onClick={() => handleYearSelect(yearOption)} className="dropdownItemModalEditarUsuario">
                                    {yearOption}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-column" className="dropdownChoiceModalEditarUsuario">
                            {column}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdownMenuModalEditarUsuario ">
                            {columns.length > 0 ? (
                                columns.map((columnOption) => (
                                    <Dropdown.Item
                                        key={columnOption.id}
                                        onClick={() => handleColumnSelect(columnOption.name)}
                                        className="dropdownItemControleColunaEditarUsuario"
                                    >
                                        {columnOption.name}
                                    </Dropdown.Item>
                                ))
                            ) : (
                                <Dropdown.Item disabled className="dropdownItemModalEditarUsuario">Sem colunas disponíveis</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Label className="modalEditarUsuarioCampoObrigatorio">*Este campo é obrigatório</Form.Label>


                    {categoria === 'professor' && (
                        <Form.Group controlId="formAccessType">
                            <div className="secondRadialGroupModalEditarUsuario">
                                <div className="secondRadialGroupModalEditarUsuarioFormCheck">
                                    <Form.Check
                                        type="radio"
                                        label="Acesso ilimitado"
                                        name="accessType"
                                        value="ilimitado"
                                        className="typeUserModalEditarUsuario"
                                        checked={acesso === 'ilimitado'}
                                        onChange={handleAccessTypeChange}
                                    />
                                    <p className='secondRadialGroupModalEditarUsuarioP'>* O professor terá acesso a todos os recursos disponíveis</p>
                                </div>
                                <div className="secondRadialGroupModalEditarUsuarioFormCheck">
                                    <Form.Check
                                        type="radio"
                                        label="Acesso limitado"
                                        name="accessType"
                                        value="limitado"
                                        className="typeUserModalEditarUsuario"
                                        checked={acesso === 'limitado'}
                                        onChange={handleAccessTypeChange}
                                    />
                                    <p className='secondRadialGroupModalEditarUsuarioP'>* O professor terá acesso apenas na coluna em que ele é responsável</p>
                                </div>
                            </div>
                        </Form.Group>
                    )}
                </Form>
            </Modal.Body>

            <Modal.Footer className="modalFooterContainerModalEditarUsuario">
                <Button className='buttonModalEditarUsuarioCriar' onClick={handleSaveChanges}>
                    SALVAR
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalEditarUsuario;
