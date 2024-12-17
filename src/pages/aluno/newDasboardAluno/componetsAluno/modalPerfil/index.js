import React, { useState, useEffect } from 'react';
import '../modalPerfil/modalPerfil.css'; // Inclua o arquivo CSS que você criará
import 'bootstrap/dist/css/bootstrap.min.css';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, getDoc, doc } from 'firebase/firestore';
import { jwtDecode } from 'jwt-decode';
import api from '../../../../../config/configApi';

const firebaseConfig = {
  apiKey: "AIzaSyBNIaO0le5Mn4UDxWX32YDoY_b4xNZikDg",
  authDomain: "reactfirebase-140c5.firebaseapp.com",
  projectId: "reactfirebase-140c5",
};

// Inicialização do Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



function ModalPerfil() {
  const [alunos, setAlunos] = useState([]);
  const [colunas, setColunas] = useState([]);
  const [text, setText] = useState('');

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
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        const userId = decoded.id;
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setAlunos(docSnap.data()); // Salva apenas os dados do usuário logado
        }
      } catch (error) {
        console.error("Erro ao decodificar o token ou consultar o Firestore:", error);
      }
    }
  };


  // Estado para o conteúdo do textarea
  const maxCharacters = 200; // Limite de caracteres
  // Função que conta o número de caracteres (incluindo espaços)
  const countCharacters = (str) => {
    return str.length; // Conta o total de caracteres (incluindo espaços)
  };

  // Função para lidar com a mudança de texto
  const handleChange = (e) => {
    const newText = e.target.value;
    if (newText.length <= maxCharacters) {
      setText(newText); // Atualiza o estado apenas se não exceder o limite
    }
  };



  return (
    <div class="modal fade aluno_MeusArtigos-rightSide-Modal" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog aluno_MeusArtigos-rightSide-Modal-dialog">
        <div class="modal-content aluno_MeusArtigos-rightSide-Modal-content">
          <div className="modal-body aluno_MeusArtigos-rightSide-Modal-body">


            {alunos && (
              <>
                <div className="aluno_MeusArtigos-rightSide-Modal-img">
                  {/* <img
                    src={alunos.imagemUrl}
                    className="alunoModalDashRoundedImg"
                    width={50}
                    height={50}
                    alt="Imagem do Artigo"
                  /> */}
                </div>

                <div className="mb-3 aluno_MeusArtigos-rightSide-Modal-input">
                  <label className="form-label">Nome Completo</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder='Ana'
                    // value={alunos.name || ''}

                  />
                </div>
                <div className="mb-3 aluno_MeusArtigos-rightSide-Modal-input">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                     placeholder='ana@gmail.com'
                    // value={alunos.email || ''}

                  />
                </div>
                <div className="mb-3 aluno_MeusArtigos-rightSide-Modal-input">
                  <label className="form-label">Coluna</label>
                  <input
                    type="text"
                    className="form-control"
                    value={alunos.coluna || ''}
                    placeholder="Aconteceu na Escola"
                  />
                </div>
                <div className="mb-3 aluno_MeusArtigos-rightSide-Modal-input">
                  <label className="form-label">Ano escolar</label>
                  <input
                    type="text"
                    className="form-control"
                    // value={alunos.anoEscolar || ''}
                    placeholder="2A do Ensino Médio"


                  />
                </div>

                <div className="mb-3 aluno_MeusArtigos-rightSide-Modal-input-textarea">
                  <label className="form-label">Sua breve apresentação</label>
                  <textarea
                    className="form-control"
                    rows="5"
                    value={text}
                    onChange={handleChange}
                  ></textarea>
                  <div className="mt-2 aluno_MeusArtigos-rightSide-Modal-input-textarea-number">
                    {countCharacters(text)} / {maxCharacters}
                  </div>
                </div>
              </>
            )}
          </div>


          <div class="modal-footer aluno_MeusArtigos-rightSide-Modal-footer">
            <button type="button" class="btn " data-bs-dismiss="modal">Fechar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalPerfil;
