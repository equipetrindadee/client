import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap'; // Importe o Modal e o Button do Bootstrap

import './userComumPerfil.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserComumPerfil() {
  const [activeTab, setActiveTab] = useState('perfil'); // Controle da aba ativa
  const [showModal, setShowModal] = useState(false); // Controle de exibição do Modal

  // Funções para abrir e fechar o Modal
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);


  const [selectedImage, setSelectedImage] = useState('../img/oruam.jpg'); // Imagem de perfil atual

  // Função para fazer upload de uma imagem e gerar uma pré-visualização
  const handleImageUpload = (event) => {
    const file = event.target.files[0]; // Pega o arquivo de imagem selecionado
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Gera uma URL temporária para exibir
      setSelectedImage(imageUrl); // Atualiza a imagem de perfil com a nova imagem
    }
  };

  return (
    <div className="principal-container d-flex justify-content-center align-items-center">
      
      {/* Div Perfil Info */}
      <div className="perfil-info card text-center">


        {/* Perfil Header com a imagem de perfil e botão de edição */}
      <div className="perfil-header position-relative">
        <img src={selectedImage} alt="Perfil" className="perfil-img" />
        
        {/* Input de upload de imagem escondido */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="form-control-file edit-btn" // Use a mesma classe para estilo
          id="file-upload" // ID do input para associar com o label
        />
        
        {/* Botão de Edição estilizado que aciona o input de arquivo */}
        <label htmlFor="file-upload" className="edit-btn">
          <i className="bi bi-pencil"></i>
        </label>
      </div>

    

        <ul className="info-list">
          <li>
            <i className="bi bi-person"></i>
            <span>Subtítulo 1</span>
          </li>
          <li>
            <i className="bi bi-envelope"></i>
            <span>Subtítulo 2</span>
          </li>
          <li>
            <i className="bi bi-geo-alt"></i>
            <span>Subtítulo 3</span>
          </li>
          <li>
            <i className="bi bi-telephone"></i>
            <span>Subtítulo 4</span>
          </li>
          <li>
            <i className="bi bi-calendar"></i>
            <span>Subtítulo 5</span>
          </li>
        </ul>

        <button className="btn btn-pink">Log Out</button>
      </div>

        {/* Div Pastas Conteúdo */}
      <div className="pastas-conteudo d-flex flex-column">
        {/* Botões para alternar entre informações e comentários */}
        <div className="pasta-buttons d-flex ">
          <button
            className={`btn tab-btn ${activeTab === 'perfil' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('perfil')}
          >
            Informações
          </button>
          <button
            className={`btn tab-btn ${activeTab === 'comentarios' ? 'btn-primary' : 'btn-secondary'} ms-2`}
            onClick={() => setActiveTab('comentarios')}
          >
            Comentários
          </button>
        </div>

        {/* Pasta Perfil */}
{activeTab === 'perfil' && (
  <div className="pasta-perfil">
    {/* Conteúdo da div pasta-perfil */}
    <h2 className="titulo-perfil text-center">Meu Perfil</h2>
    <div className="info-group">
      <h5 className="subtitulo-perfil">Nome Completo</h5>
      <input type="text" className="form-control mb-3" placeholder="Digite seu nome completo" />

      <h5 className="subtitulo-perfil">Email</h5>
      <input type="email" className="form-control mb-3" placeholder="Digite seu email" />

      <h5 className="subtitulo-perfil">Telefone</h5>
      <input type="text" className="form-control mb-3" placeholder="Digite seu telefone" />

      <button className="btn btn-pink" onClick={handleShow}>Salvar Alterações</button>
    </div>
  </div>
)}

        {/* Pasta Comentários */}
{activeTab === 'comentarios' && (
  <div className="pasta-comentarios d-flex">
    {/* Conteúdo da div pasta-comentarios */}
    <div className="comentarios-container d-flex flex-column align-items-center">
      <h3 className="comentarios-titulo text-center">Comentários</h3>
      <hr className="linha-comentarios" />
      <div className="cards-comentarios">
        {/* Cards de comentários */}

                {/* card 1 */}
            <div className="card-comentario mb-2">
          <div className="card-comentario-header d-flex justify-content-between">
            <h6 className="card-comentario-titulo">Miriã Chefa</h6>
            <p className="card-comentario-subtitulo">04/10</p>
          </div>
          <div className="card-comentario-body">
            <p className="card-comentario-texto">
              Exemplo de comentário menor para ilustrar o layout e reduzir o espaço ocupado dentro do card.
            </p>
          </div>
            <div className="card-comentario-footer d-flex justify-content-between">
            <button className="btn btn-sm btn-curtidas">
              <i className="bi bi-heart"></i> Curtidas
            </button>
            <button className="btn btn-sm btn-respostas">
              <i className="bi bi-chat-dots"></i> Respostas
            </button>
            <button className="btn btn-sm btn-ver-materia">
              Ver Materia
            </button>
          </div>
        </div>


        {/* card 2 */}
        <div className="card-comentario mb-2">
          <div className="card-comentario-header d-flex justify-content-between">
            <h6 className="card-comentario-titulo">Miriã Chefa</h6>
            <p className="card-comentario-subtitulo">04/10</p>
          </div>
          <div className="card-comentario-body">
            <p className="card-comentario-texto">
              Exemplo de comentário menor para ilustrar o layout e reduzir o espaço ocupado dentro do card.
            </p>
          </div>
            <div className="card-comentario-footer d-flex justify-content-between">
            <button className="btn btn-sm btn-curtidas">
              <i className="bi bi-heart"></i> Curtidas
            </button>
            <button className="btn btn-sm btn-respostas">
              <i className="bi bi-chat-dots"></i> Respostas
            </button>
            <button className="btn btn-sm btn-ver-materia">
              Ver Materia
            </button>
          </div>
        </div>

      </div>
    </div>
    <div className="materias-curtidas-container d-flex flex-column justify-content-center align-items-center">
      <h3 className="materias-curtidas-titulo">Matérias Curtidas</h3>
      <hr className="linha-curtidas" />
      <h5 className="subtitulo-curtidas">Nenhuma Coluna Selecionada</h5>
      <span className="emoji-sad" role="img" aria-label="sad face">😞</span>
    </div>
  </div>
)}

  </div>

      {/* Modal de Confirmação */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Body className='text-center'>Tem certeza?</Modal.Body>
        <Modal.Footer className='justify-content-center'>
          <Button variant="pink" onClick={handleClose}>Sim</Button>
          <Button variant="outline-pink" onClick={handleClose}>Não</Button>
        </Modal.Footer>
      </Modal>
   
    </div>
  );
}

export default UserComumPerfil;
