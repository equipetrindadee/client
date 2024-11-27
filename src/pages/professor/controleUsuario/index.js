import React, { useState, useEffect } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import "../controleUsuario/controleUsuario.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, getDoc, doc } from 'firebase/firestore';
import { jwtDecode } from 'jwt-decode'; // Importando jwtDecode
import api from "../../../config/configApi";
import NavBarProfessor from '../../navBar/navBarProfessor';
import ModalEditarUsuario from "../../professor/controleUsuario/modalEditarUsuario/index.js";
import ModalExcluirUsuario from './modalExcluirUsuario/index.js';
import FilterButtonControUser from './FilterButtonControUser/index.js';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBNIaO0le5Mn4UDxWX32YDoY_b4xNZikDg",
  authDomain: "reactfirebase-140c5.firebaseapp.com",
  projectId: "reactfirebase-140c5",
};

// Inicialização do Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function ControleUsuario() {
  const [alunos, setAlunos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedAluno, setSelectedAluno] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredType, setFilteredType] = useState(''); // Armazenando o tipo de filtro selecionado
  const [sortOrder, setSortOrder] = useState('asc'); // Estado para controlar a ordem de classificação
  const [colunas, setColunas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserData();
      await fetchColunas();
    };
    fetchData();
  }, []);

  const fetchColunas = async () => {
    try {
      const response = await api.get('/colunas');
      setColunas(response.data);
    } catch (error) {
      console.error('Erro ao buscar colunas:', error);
    }
  };

  const fetchUserData = async () => {
    const storedToken = localStorage.getItem('token');
    const userAcesso = localStorage.getItem('UserAcesso'); // Obtém o valor de UserAcesso
    const userColuna = localStorage.getItem('UserColuna'); // Obtém o valor de UserColuna

    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        const userId = decoded.id;
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const alunosCollection = collection(db, 'users');
          const alunosSnapshot = await getDocs(alunosCollection);
          const alunosList = alunosSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          // Filtrar os usuários com base no acesso
          const filteredList =
            userAcesso === "ilimitado"
              ? alunosList // Exibe todos os usuários
              : alunosList.filter((aluno) => aluno.coluna === userColuna); // Filtra usuários por coluna

          setAlunos(filteredList); // Define os alunos filtrados
        }
      } catch (error) {
        console.error("Erro ao decodificar o token ou consultar o Firestore:", error);
      }
    }
  };


  // Função para alternar entre ordem crescente e decrescente
  const handleSort = (order) => {
    setSortOrder(order);
  };

  // Função para ordenar os alunos pelo nome
  const sortedAlunos = [...alunos].sort((a, b) => {
    const nameA = a.name ? a.name.toLowerCase() : '';
    const nameB = b.name ? b.name.toLowerCase() : '';

    if (nameA < nameB) return sortOrder === 'asc' ? -1 : 1;
    if (nameA > nameB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredAlunos = sortedAlunos
    .filter((aluno) => aluno.categoria !== 'comum' && aluno.categoria !== 'master') // Filtra "comum" e "master"

    .filter((aluno) =>
      aluno.name && aluno.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((aluno) => {
      // Filtro por categoria, se for selecionado
      if (filteredType === 'Professor') {
        return aluno.categoria === 'professor'; // Exibe somente professores
      }
      if (filteredType === 'Aluno') {
        return aluno.categoria === 'aluno'; // Exibe somente alunos
      }
      // Filtro por coluna
      if (filteredType && filteredType !== 'Todos') {
        return aluno.coluna === filteredType; // Exibe usuários com a coluna selecionada
      }
      return true; // Se o filtro for 'Todos' ou não houver filtro, exibe todos
    });
  const handleConfirmDelete = (userId) => {
    setAlunos((prevAlunos) => prevAlunos.filter((aluno) => aluno.id !== userId));
  };
  const handleShowModal = (aluno) => {
    setSelectedAluno(aluno);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAluno(null);
  };


  const handleShowConfirmModal = (aluno) => {
    setSelectedAluno(aluno);
    setShowConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
    setSelectedAluno(null);
  };

  const confirmDeleteAluno = async () => {
    if (selectedAluno) {
      const alunoDocRef = doc(db, 'users', selectedAluno.id);
      await deleteDoc(alunoDocRef);
      setAlunos((prevAlunos) => prevAlunos.filter((aluno) => aluno.id !== selectedAluno.id));
      handleCloseConfirmModal();
    }
  };


  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleBlur = () => {
    setIsExpanded(false);
  };

  return (
    <div className="professor_controlUser-container">
      <NavBarProfessor />
      <div className="professor_controlUser-contentHeader">
        <div className="professor_controlUser-contentHeader-interDiv">
          <div className="professor_controlUser-contentHeader-titleContent">
            <h1 className="professor_controlUser-contentHeader-titleH1">CONTROLE DE USUÁRIOS</h1>
          </div>
          <div className="segundaLinha-controleUsuarios"></div>
          <div className="professor_controlUser-contentHeader-actionsButtons">
            <input
              className='contentColunaHeaderContentControleUser-actionsButtonsSearch'
              type="text"
              placeholder="Pesquisar um usuário..."
              onChange={(e) => setSearchTerm(e.target.value)}  // Update search term
            />
          
            <div className="professor_controlUser-contentHeader-buttonsContent">
              <FilterButtonControUser
                onFilterChange={setFilteredType}  // Atualiza o filtro de tipo
                colunas={colunas}  // Passando as colunas para o filtro
                onSortChange={handleSort}  // Passa a função de ordenação para o filtro
              />
            </div>
          </div>
        </div>
        <div className="professor_controlUser-contentHeader-lineBottom"></div>
      </div>

      <div className="user-control-container-tabela">
        <div className="table-responsive">
          <Table className="user-control-table">
            <thead className="user-control-table-header">
              <tr>
                <th>Perfil</th>
                <th>Nome</th>
                <th>Ano</th>
                <th>Categaoria</th>
                <th>Nome da Coluna</th>
                <th>Editar</th>
              </tr>
              {/* <div className="linhaPreta-Table"></div> */}
            </thead>
            {/* <tr className="linhaPreta-Table">
              <td colSpan="6"></td> {/* Colspan para cobrir todas as colunas 
            </tr> */}
           

            <tbody className="user-control-table-body">
              {filteredAlunos.map((aluno) => {
                const colunaCorrespondente = colunas.find(coluna => coluna.columname === aluno.coluna);
                const corColuna = colunaCorrespondente ? colunaCorrespondente.color : 'transparent'; // Definindo a cor da coluna
                if (colunaCorrespondente) {
                  console.log("Cor da coluna:", colunaCorrespondente.color);
                }
                return (
                  <tr key={aluno.id}>
                    <td>
                      <img
                        src={aluno.imagemUrl}
                        alt="Perfil"
                        className="imgPerfil-tabelaUsuario"
                        style={{ width: '70px', height: '70px' }}
                      />
                    </td>
                    <td className="professor_ControleUser-tableNameUser">{aluno.name}</td>
                    <td>{aluno.anoEscolar || 'N/A'}</td>
                    <td className="professor_ControleUser-tableCategoriaUser">{aluno.categoria || 'N/A'}</td>
                    <td className="align-middle tdColum">  <p className='tableColum btn-user-badge-english' style={{ backgroundColor: corColuna }} ><p className="professor_ControleUsuario-nameColum">{aluno.coluna || 'N/A'}</p></p></td>
                    <td className='content-button-editaredel'>
                      <Button onClick={() => handleShowModal(aluno)} className="buttonModalEditarUsuario">
                        <i className="bx bxs-pencil"></i>
                      </Button>
                      <Button className="buttonModalExcluirUsuario" onClick={() => handleShowConfirmModal(aluno)} >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
      <ModalEditarUsuario
        showModal={showModal}
        setShowModal={setShowModal}
        userId={selectedAluno?.id} // Passando o ID do usuário selecionado
      />

      {/* Modal de Confirmação de Exclusão */}
      <ModalExcluirUsuario
        show={showConfirmModal}
        onHide={handleCloseConfirmModal}
        selectedAluno={selectedAluno}
        onConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
}

export default ControleUsuario;
