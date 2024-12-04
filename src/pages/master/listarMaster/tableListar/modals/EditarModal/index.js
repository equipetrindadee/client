import React, { useState, useEffect } from 'react';
import './EditarModal.css'; // Certifique-se de que o arquivo CSS esteja sendo importado corretamente

// Importação do Firebase Firestore
import { collection, getDocs, getFirestore, updateDoc, doc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

// Inicialização do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBNIaO0le5Mn4UDxWX32YDoY_b4xNZikDg",
    authDomain: "reactfirebase-140c5.firebaseapp.com",
    projectId: "reactfirebase-140c5",
};

// Inicialização do Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const EditarModal = ({ user, closeModal }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [category, setCategory] = useState('');
    const [dropdown2, setDropdown2] = useState('n/a'); // Inicializando como 'n/a'
    const [dropdownSchoolYear, setDropdownSchoolYear] = useState('n/a'); // Estado do dropdown de anos escolares
    const [isLimited, setIsLimited] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [colunas, setColunas] = useState([]); // Estado para armazenar as colunas
    const [isAdminConfirmationVisible, setIsAdminConfirmationVisible] = useState(false); // Novo estado para controle da confirmação
    const schoolYears = ['8°A do Ensino Fundamental', '8°B do Ensino Fundamental',
        '9°A do Ensino Fundamental', '9°B do Ensino Fundamental', '1°A do Ensino Médio', '1°B do Ensino Médio', 
        '2°A do Ensino Médio', '2°B do Ensino Médio', '3°A do Ensino Médio', '3°B do Ensino Médio', 'N/A']; // Array de anos escolares

    // Função para buscar as colunas do Firestore
    const fetchColunas = async () => {
        try {
            const colunasRef = collection(db, 'colunas');
            const colunasSnapshot = await getDocs(colunasRef);
            const colunasData = colunasSnapshot.docs.map(doc => ({
                id: doc.id,
                name: doc.data().columname, // Ajuste para usar 'columname' no lugar de 'name'
            }));

            setColunas(colunasData);
        } catch (error) {
            console.error('Erro ao buscar as colunas:', error);
        }
    };

    // Função para preencher os dados do usuário no modal
    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
            setCategory(user.category || '');
            setDropdown2(user.dropdown2 || 'n/a');
            setDropdownSchoolYear(user.dropdownSchoolYear || 'n/a');
            setIsLimited(user.isLimited || false);
        }
    }, [user]); // O useEffect será executado sempre que a prop "user" mudar

    useEffect(() => {
        fetchColunas(); // Carregar as colunas quando o componente for montado
    }, []);

    // Função para salvar as alterações
    const handleSave = async () => {
        await saveUserData();
    };

    // Função para salvar os dados do usuário no Firestore
    const saveUserData = async () => {
        try {
            const userRef = doc(db, 'users', user.id);
            await updateDoc(userRef, {
                name,
                email,
                category,
                dropdown2,
                dropdownSchoolYear,
                isLimited,
            });

            setConfirmationMessage('Usuário atualizado com sucesso!');
            setTimeout(() => {
                setConfirmationMessage('');
                closeModal();
            }, 2000); // Fechar o modal após 2 segundos
        } catch (error) {
            console.error('Erro ao atualizar o usuário:', error);
        }
    };

    // Função para lidar com a mudança de categoria
    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setCategory(selectedCategory);

        // Se for "administrador" ou "comum", setar os valores dos dropdowns como 'n/a'
        if (selectedCategory === 'administrador' || selectedCategory === 'comum') {
            setDropdown2('n/a'); // Coluna será 'n/a'
            setDropdownSchoolYear('n/a'); // Ano Escolar será 'n/a'
        } else {
            setDropdown2('');  // Limpa o valor do dropdown de coluna
            setDropdownSchoolYear(''); // Limpa o valor do dropdown de anos escolares
        }
        
        // Se for "administrador", exibe a confirmação automaticamente
        if (selectedCategory === 'administrador') {
            setIsAdminConfirmationVisible(true); // Exibir a confirmação
        } else {
            setIsAdminConfirmationVisible(false); // Esconder a confirmação
        }
    };

    // Função para confirmar a criação do administrador
    const handleConfirmAdmin = async () => {
        setIsAdminConfirmationVisible(false); // Esconde a confirmação
        await saveUserData(); // Salva as alterações como "administrador"
    };

    // Função para cancelar a criação do administrador
    const handleCancelAdmin = () => {
        setIsAdminConfirmationVisible(false); // Fechar a confirmação sem salvar
    };

    return (
        <div className="master_listarUsuário-modalEditar-modal">
            <div className="master_listarUsuário-modalEditar-modal-content">
                <span className="master_listarUsuário-modalEditar-close" onClick={closeModal}>&times;</span>
                <h2 className="master_listarUsuário-modalEditar-modal-title">Editando o usuário ID: {user.id}</h2>
                <form className="master_listarUsuário-modalEditar-edit-form">
                    <div className="master_listarUsuário-modalEditar-form-group">
                        <label htmlFor="name">Nome:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Digite o nome"
                            className="master_listarUsuário-modalEditar-input"
                        />
                    </div>

                    <div className="master_listarUsuário-modalEditar-form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Digite o email"
                            className="master_listarUsuário-modalEditar-input"
                        />
                    </div>

                    <div className="master_listarUsuário-modalEditar-form-group">
                        <label htmlFor="category">Categoria:</label>
                        <select
                            id="category"
                            value={category}
                            onChange={handleCategoryChange}
                            className="master_listarUsuário-modalEditar-select"
                        >
                            <option value="">Selecione</option>
                            <option value="professor">Professor</option>
                            <option value="aluno">Aluno</option>
                            <option value="administrador">Administrador</option>
                            <option value="comum">Comum</option>
                        </select>
                    </div>

                    {/* Exibir informações adicionais com base na categoria selecionada */}
                    {category === 'professor' && (
                        <div className="master_listarUsuário-modalEditar-radio-group">
                            <label>Professor limitado?</label>
                            <label>
                                <input
                                    type="radio"
                                    name="limited"
                                    checked={isLimited}
                                    onChange={() => setIsLimited(true)}
                                />
                                Sim
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="limited"
                                    checked={!isLimited}
                                    onChange={() => setIsLimited(false)}
                                />
                                Não
                            </label>
                        </div>
                    )}

                    {/* Mostrar o dropdown de "Ano Escolar" somente se a categoria for "aluno" */}
                    {category === 'aluno' && (
                        <div className="master_listarUsuário-modalEditar-form-group">
                            <label htmlFor="school-year">Ano Escolar:</label>
                            <select
                                id="school-year"
                                value={dropdownSchoolYear}
                                onChange={(e) => setDropdownSchoolYear(e.target.value)}
                                className="master_listarUsuário-modalEditar-select"
                            >
                                <option value="n/a">Selecione</option>
                                {schoolYears.map((year, index) => (
                                    <option key={index} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Mostrar a confirmação para "administrador" */}
                    {isAdminConfirmationVisible && (
                        <div className="master_listarUsuário-modalEditar-admin-confirmation">
                            <p>Tem certeza de que deseja criar um administrador?</p>
                            <button type="button" onClick={handleConfirmAdmin}>Sim, tenho certeza</button>
                            <button type="button" onClick={handleCancelAdmin}>Cancelar</button>
                        </div>
                    )}

                    {/* Coluna - Agora será renderizada apenas se a categoria não for 'administrador' ou 'comum' */}
                    {category !== 'administrador' && category !== 'comum' && (
                        <div className="master_listarUsuário-modalEditar-form-group">
                            <label htmlFor="dropdown2">Coluna:</label>
                            <select
                                id="dropdown2"
                                value={dropdown2}
                                onChange={(e) => setDropdown2(e.target.value)}
                                className="master_listarUsuário-modalEditar-select"
                            >
                                <option value="n/a">Selecione</option>
                                {colunas.map((coluna) => (
                                    <option key={coluna.id} value={coluna.name}>
                                        {coluna.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <button
                        type="button"
                        className="master_listarUsuário-modalEditar-save-btn"
                        onClick={handleSave}
                    >
                        Salvar
                    </button>

                    {confirmationMessage && (
                        <div className="master_listarUsuário-modalEditar-confirmation-message">
                            {confirmationMessage}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default EditarModal;
