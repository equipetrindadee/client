import React, { useState, useEffect } from 'react';
import './EditarModal.css'; // Certifique-se de que o arquivo CSS esteja sendo importado corretamente

// Importação do Firebase Firestore
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyBNIaO0le5Mn4UDxWX32YDoY_b4xNZikDg",
    authDomain: "reactfirebase-140c5.firebaseapp.com",
    projectId: "reactfirebase-140c5",
};

// Inicialização do Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const EditarModal = ({ userId, closeModal }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [category, setCategory] = useState('');
    const [dropdown2, setDropdown2] = useState('n/a'); // Inicializando como 'n/a'
    const [dropdownSchoolYear, setDropdownSchoolYear] = useState('n/a'); // Estado do dropdown de anos escolares
    const [isLimited, setIsLimited] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [colunas, setColunas] = useState([]); // Estado para armazenar as colunas
    const schoolYears = ['8°A do Ensino Fundamental', '8°B do Ensino Fundamental',
        '9°A do Ensino Fundamental', '9°B do Ensino Fundamental',
        '1°A do Ensino Médio', '1°B do Ensino Médio', '2°A do Ensino Médio',
        '2°B do Ensino Médio', '3°A do Ensino Médio', '3°B do Ensino Médio', 'N/A']; // Array de anos escolares

    // Função para buscar as colunas do Firestore
    const fetchColunas = async () => {
        try {
            const colunasRef = collection(db, 'colunas');
            const colunasSnapshot = await getDocs(colunasRef);
            const colunasData = colunasSnapshot.docs.map(doc => ({
                id: doc.id,
                name: doc.data().columname, // Ajuste para usar 'columname' no lugar de 'name'
            }));

            console.log(colunasData); // Verifique os dados que estão sendo recebidos
            setColunas(colunasData);
        } catch (error) {
            console.error('Erro ao buscar as colunas:', error);
        }
    };

    useEffect(() => {
        fetchColunas(); // Carregar as colunas quando o componente for montado
    }, []);

    const handleSave = () => {
        // Lógica para salvar as alterações no usuário
        console.log({
            userId,
            name,
            email,
            category,
            dropdown2, // Enviando o valor selecionado do segundo dropdown
            dropdownSchoolYear, // Valor do dropdown de anos escolares
            isLimited,
        });

        // Fechar o modal após salvar
        closeModal();
    };

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setCategory(selectedCategory);

        // Se for "administrador" ou "comum", setar os valores dos dropdowns como 'n/a'
        if (selectedCategory === 'administrador' || selectedCategory === 'comum') {
            setDropdown2('n/a');
            setDropdownSchoolYear('n/a');
        } else {
            setDropdown2('');
            setDropdownSchoolYear(''); // Limpa o valor do dropdown de anos escolares
        }

        if (selectedCategory !== 'administrador') {
            setConfirmationMessage('');
        }
    };

    return (
        <div className="master_listarUsuário-modalEditar-modal">
            <div className="master_listarUsuário-modalEditar-modal-content">
                <span className="master_listarUsuário-modalEditar-close" onClick={closeModal}>&times;</span>
                <h2 className="master_listarUsuário-modalEditar-modal-title">Editando o usuário ID: {userId}</h2>
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
                                <option key={index} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>

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
