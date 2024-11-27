import React, { useState, useEffect } from 'react';
import './content.css';
import ModalCriarColuna from '../modalCriarColuna/index.js';
import ModalCriarUsuario from '../criarUsuario/index.js';
import ModalEditarColuna from '../editarColuna/index.js';
import ModalExcluirColuna from '../excluirColuna/index.js';
import ModalRestaurarColuna from '../restaurarColuna/index.js';
import ModalAdicionarColunista from '../adicionarColunista/index.js'
import { useNavigate } from 'react-router-dom';

import { collection, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore'; // Assegurando que todas as funções estejam importadas
import { db } from '../../../../config/firebaseImgConfig.js'; // Importando a configuração do Firebase
import { jwtDecode } from 'jwt-decode'; // Importando jwtDecode

function ContentColuna() {
    const [searchText, setSearchText] = useState('');
    const [users, setUsers] = useState([]); // Estado para armazenar colunas
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [deletedUsers, setDeletedUsers] = useState([]); // Estado para colunas restauradas
    const [alunos, setAlunos] = useState([]); // Estado para armazenar alunos
    const [acesso, setAcesso] = useState(''); // Estado para armazenar o acesso do professor
    const [coluna, setColuna] = useState(''); // Estado para armazenar a coluna do professor
    const [userName, setUserName] = useState(''); // Estado para armazenar o nome do usuário

    const navigate = useNavigate();

    useEffect(() => {
        const fetchColunas = async () => {
            const colunasRef = collection(db, 'colunas');
            const colunasSnapshot = await getDocs(colunasRef);
            const colunasList = colunasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            // Filtra as colunas com base no estado 'estadoColuna'
            const activeColumns = colunasList.filter(coluna => coluna.estadoColuna === 'ativo');
            const deletedColumns = colunasList.filter(coluna => coluna.estadoColuna === 'excluido');

            // Atualiza as listas com base no Firestore
            setUsers(activeColumns); // Atualiza colunas ativas
            setDeletedUsers(deletedColumns); // Atualiza colunas excluídas
            setFilteredUsers(activeColumns); // Mantém as colunas ativas no filtro
        };

        fetchColunas();
    }, []);



    // Função para buscar alunos do Firestore
    const fetchAlunos = async () => {
        try {
            const alunoRef = collection(db, 'users'); // Coleção de usuários
            const alunoSnap = await getDocs(alunoRef);
            const alunoData = alunoSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAlunos(alunoData);
        } catch (error) {
            console.error("Erro ao buscar alunos: ", error);
        }
    };

    // Função para buscar colunas do Firestore
    const fetchUsers = async () => {
        try {
            const userRef = collection(db, 'colunas'); // Coleção de colunas
            const userSnap = await getDocs(userRef);
            const userData = userSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            // Filtrar colunas com base no acesso do professor
            if (acesso === "ilimitado") {
                setUsers(userData); // Exibir todas as colunas
                setFilteredUsers(userData); // Inicialmente, todos os usuários são exibidos
            } else if (acesso === "limitado") {
                const filteredData = userData.filter(user => user.columname === coluna); // Filtra apenas a coluna do professor limitado
                setUsers(filteredData); // Define apenas as colunas que o professor pode ver
                setFilteredUsers(filteredData); // Define as colunas filtradas
            }
        } catch (error) {
            console.error("Erro ao buscar colunas: ", error);
        }
    };


    // Função para decodificar o token e obter o acesso do professor
    const fetchUserName = async () => {
        const storedToken = localStorage.getItem('token');

        if (storedToken) {
            try {
                const decoded = jwtDecode(storedToken);
                const userId = decoded.id;
                const docRef = doc(db, "users", userId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setUserName(data.name || "Nome não encontrado");
                    setAcesso(data.acesso); // Obter acesso
                    setColuna(data.coluna); // Obter coluna
                }
            } catch (error) {
                console.error("Erro ao decodificar o token ou consultar o Firestore:", error);
            }
        }
    };


    useEffect(() => {
        fetchUserName(); // Chama a função para buscar o usuário e seu acesso
    }, []); // Inicializa a busca do usuário apenas uma vez

    useEffect(() => {
        fetchUsers(); // Chama a função para buscar colunas sempre que o acesso mudar
        fetchAlunos(); // Busca alunos
    }, [acesso]); // Dependência de 'acesso' para recarregar colunas quando o acesso mudar


    // Função para contar alunos participantes por coluna
    const countAlunosForColuna = (columname) => {
        return alunos.filter(aluno => aluno.coluna === columname).length; // Altere 'coluna' para o campo correto em sua coleção de usuários
    };

    // Função para lidar com mudanças na barra de pesquisa
    const handleSearchChange = (e) => {
        const text = e.target.value;
        setSearchText(text);

        // Filtrar colunas com base no texto de pesquisa
        const filtered = users.filter(user =>
            user.columname.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredUsers(filtered);
    };

    // Função para excluir a coluna
    const handleDeleteColumn = async (id) => {
        const columnToDelete = users.find(user => user.id === id);
        if (columnToDelete) {
            const updatedColumn = { ...columnToDelete, estadoColuna: 'excluido' };

            try {
                const docRef = doc(db, 'colunas', id);
                await updateDoc(docRef, { estadoColuna: 'excluido' }); // Atualiza no Firestore

                // Atualiza as listas no frontend
                setUsers(prevUsers => prevUsers.filter(user => user.id !== id));  // Remove da lista ativa
                setDeletedUsers(prevDeleted => [...prevDeleted, updatedColumn]); // Adiciona à lista de excluídos
                setFilteredUsers(prevFiltered => prevFiltered.filter(user => user.id !== id));  // Remove da lista filtrada
            } catch (error) {
                console.error("Erro ao atualizar a coluna: ", error);
            }
        }
    };



    // Função para restaurar a coluna
    const handleRestoreColumn = async (column) => {
        const updatedColumn = { ...column, estadoColuna: 'ativo' };

        try {
            const docRef = doc(db, 'colunas', column.id);
            await updateDoc(docRef, { estadoColuna: 'ativo' }); // Atualiza no Firestore

            // Atualiza as listas no frontend
            setDeletedUsers(prevDeleted => prevDeleted.filter(user => user.id !== column.id)); // Remove da lista de excluídos
            setUsers(prevUsers => [...prevUsers, updatedColumn]); // Adiciona à lista ativa
            setFilteredUsers(prevFiltered => [...prevFiltered, updatedColumn]); // Adiciona à lista filtrada
        } catch (error) {
            console.error("Erro ao restaurar a coluna: ", error);
        }
    };


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



    return (
        <div>
            <div className='contentColunaBodyContainer'>
                <div className='contentColunaHeaderContentProfessor'>
                    <div className='contentColunaHeaderContentProfessor-interDiv'>
                        <div className='contentColunaHeaderContentProfessor-titleContent'>
                            <h1 className='contentColunaHeaderContentProfessor-titleH1'>CONTROLE DE COLUNAS</h1>
                        </div>
                        <div className='contentColunaHeaderContentProfessor-actionsButtons'>

                            <div className={`contentColunaHeaderContentProfessor-actionsButtonsSearch-wrapper ${searchText ? 'no-hover' : ''}`}>
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
                            <div className='contentColunaHeaderContentProfessor-buttonsContent'>
                                <ModalCriarColuna />
                                <ModalCriarUsuario />
                            </div>
                        </div>
                    </div>
                    <div className='contentColunaHeaderContentProfessor-lineBottom'></div>
                </div>
                <div className='contentColunaContentProfessor'>
                    {filteredUsers.filter(user => user.estadoColuna === 'ativo').length > 0 ? (
                        filteredUsers.filter(user => user.estadoColuna === 'ativo').map(user => (
                            <div key={user.id} className='createColumnMiniContainer'>
                                <div
                                    className='createColumnMiniContainer-Header'
                                    style={{ backgroundColor: user.color }}
                                >
                                    <div className='createColumnNameColumn'>
                                        <h2 className='NameColumn'>{user.columname}</h2>
                                    </div>
                                </div>
                                <div className='createColumnMiniContainer-bodyContent'>
                                    <div className='createColumnMiniContainer-bodyContentAmountPart'>
                                        <i className='bx bxs-user userIconControleColuna'></i>
                                        <h6 className='createColumnMiniContainer-bodyContentNumberOfMembers'>
                                            {countAlunosForColuna(user.columname)} {/* Mostrando o número de alunos */}
                                        </h6>
                                        <p className='createColumnMiniContainer-bodyContentDescription'>
                                            Alunos participantes
                                        </p>
                                    </div>
                                    <a
                                        href="#"
                                        className="irParaColunaDirecionamento"
                                        onClick={() => {
                                            localStorage.setItem('colunaColor', user.color); // Salvando a cor no localStorage
                                            localStorage.setItem('ColumName', user.columname); // Salvando o nome da coluna no localStorage
                                            localStorage.setItem('imageColumn', user.imageColumn); // Salvando a URL da imagem da coluna no localStorage
                                            localStorage.setItem('idColum', user.id)
                                            navigate(`/materiaColuna`); // Redirecionando para a página da coluna
                                        }}
                                    >
                                        Ir para tela da coluna
                                    </a>

                                </div>
                                <div className='createColumnMiniContainer-Footer'>
                                    <div className='createColumnFooterIconsFunctions'>
                                        <div className='createColumnFooterIconsFunctionsLeftPart'>
                                            <ModalExcluirColuna
                                                onConfirmDelete={handleDeleteColumn}
                                                column={user}
                                            />
                                        </div>
                                        <div className='createColumnFooterIconsFunctionsRightPart'>
                                            <ModalEditarColuna
                                                colunaId={user.id}
                                                colunaNomeOriginal={user.columname}
                                                corColunaOriginal={user.color}
                                            />
                                            <ModalAdicionarColunista columnName={user.columname} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Nenhum usuário encontrado.</p>
                    )}
                </div>

            </div>
            <div className='contentColunaBodyContainerRestaurarColuna'>
                <div className='contentColunaHeaderContentProfessor-interDiv'>
                    <div className='contentColunaHeaderContentProfessor-titleContent'>
                        <h1 className='contentColunaHeaderContentProfessor-titleH1'>RESTAURAR COLUNAS</h1>
                    </div>
                </div>
                <div className='contentColunaHeaderContentProfessor-lineBottom'></div>
                <div className='contentColunaContentProfessor'>
                    {deletedUsers.length > 0 ? (
                        deletedUsers.map(column => (
                            <div key={column.id} className='createColumnMiniContainer'>
                                <div
                                    className='createColumnMiniContainer-Header restaurarColunaMiniContent'
                                    style={{ backgroundColor: column.color }}
                                >
                                    <div className='createColumnNameColumn'>
                                        <h2 className='NameColumn'>{column.columname}</h2>
                                    </div>
                                </div>
                                <div className='createColumnMiniContainer-bodyContent restaurarColunaMiniContent'>
                                    <div className='createColumnMiniContainer-bodyContentAmountPart'>
                                        <i className='bx bxs-user userIconControleColuna'></i>
                                        <h6 className='createColumnMiniContainer-bodyContentNumberOfMembers'>
                                            0 {/* Aqui pode ser ajustado se tiver um método para contar alunos excluídos */}
                                        </h6>
                                        <p className='createColumnMiniContainer-bodyContentDescription'>
                                            Alunos participantes
                                        </p>
                                    </div>
                                    <a href='#' className='irParaColunaDirecionamento'>Ir para tela da coluna</a>
                                </div>
                                <div className='createColumnMiniContainer-Footer'>
                                    <div className='createColumnFooterIconsFunctions'>
                                        <div className='createColumnFooterIconsFunctionsLeftPart'>
                                            <ModalRestaurarColuna onRestore={handleRestoreColumn} column={column} />
                                        </div>
                                        <div className='createColumnFooterIconsFunctionsRightPart '>
                                           
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Nenhuma coluna para restaurar.</p>
                    )}
                </div>
            </div>

        </div>
    );
}

export default ContentColuna;
