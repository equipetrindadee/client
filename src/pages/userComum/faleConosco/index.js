import React, { useState } from 'react';
import './faleConosco.css';
 import NavbarUserComum from "../../navBar/navBarUserComum/index.js"; 
import { Dropdown, Modal, Button } from 'react-bootstrap';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBNIaO0le5Mn4UDxWX32YDoY_b4xNZikDg",
  authDomain: "reactfirebase-140c5.firebaseapp.com",
  projectId: "reactfirebase-140c5",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

function FaleConosco() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comentario, setComentario] = useState("");
  const [tipoAtivo, setTipoAtivo] = useState(null);
  const [selectedItem, setSelectedItem] = useState('Coluna');
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const faleConoscoCollectionRef = collection(db, "faleConosco");

  const validateFields = () => {
    if (!name || !email || !tipoAtivo || !comentario || !selectedItem) {
      setError("Por favor, preencha todos os campos.");
      return false;
    }
    if (!email.includes("@")) {
      setError("Por favor, insira um email válido.");
      return false;
    }
    setError("");
    return true;
  };

  const handleTipoClick = (tipo) => {
    setTipoAtivo(tipo);
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const handleSubmit = async () => {
    if (!validateFields()) return;

    try {
      await addDoc(faleConoscoCollectionRef, {
        name,
        email,
        tipoAtivo,
        coluna: selectedItem,
        mensagem: comentario
      });

      alert("Dados enviados com sucesso!");
      setName("");
      setEmail("");
      setComentario("");
      setTipoAtivo(null);
      setSelectedItem('Coluna');
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
      setError("Erro ao enviar os dados. Tente novamente.");
    }
    setShowModal(false); // Fecha o modal após o envio
  };

  const openModal = () => {
    if (validateFields()) setShowModal(true);
  };

  return (
    <div>
      <NavbarUserComum />
      <div className="fale-conosco-container d-flex">
        <div className="conteudo_fale-conosco col-md-6 d-flex flex-column align-items-center justify-content-start p-3 mt-2">
          <h1 className="text-center_fale-conosco w-100 mb-2">FALE CONOSCO</h1>

          {error && <p className="text-danger">{error}</p>}

          <div className="fale_conosco-input-group w-100 mb-1">
            <h5 className="subtitulo_fale-conosco">Nome</h5>
            <input
              type="text"
              className="form-control mx-auto"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="fale_conosco-input-group w-100 mb-1">
            <h5 className="subtitulo_fale-conosco">Email</h5>
            <input
              type="email"
              className="form-control mx-auto"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="tipos-comentario-conosco w-100 mb-2">
            <h5 className="subtitulo_fale-conosco mb-2">Tipo de Comentário</h5>
            <div className="d-flex justify-content-around">
              <button 
                className={`btn btn-outline-primary fale_conosco-tipo-comment ${tipoAtivo === 'Geral' ? 'fale_conosco-btn-ativo' : ''}`}
                onClick={() => handleTipoClick('Geral')}
              >
                <p>Geral</p>
              </button>
              <button
                className={`btn btn-outline-secondary fale_conosco-tipo-comment ${tipoAtivo === 'Sugestão' ? 'fale_conosco-btn-ativo' : ''}`}
                onClick={() => handleTipoClick('Sugestão')}
              >
                <p>Sugestão</p>
              </button>
              <button
                className={`btn btn-outline-success fale_conosco-tipo-comment ${tipoAtivo === 'Reclamação' ? 'fale_conosco-btn-ativo' : ''}`}
                onClick={() => handleTipoClick('Reclamação')}
              >
                <p>Reclamação</p>
              </button>
            </div>
          </div>

          <div className="fale_conosco-input-group w-100 mb-3 Conosco_dropdown-lista">
            <Dropdown>
              <Dropdown.Toggle variant="success" className="fale_conosco-dropdown-custom" id="dropdown-basic">
                <h5 className="subtitulo_fale-conosco">{selectedItem}</h5>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleSelectItem('ACONTECEU NA ESCOLA')}>ACONTECEU NA ESCOLA</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSelectItem('BIOFIMICA EM AÇÃO')}>BIOFIMICA EM AÇÃO</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSelectItem('EDUCAÇÃO EM FOCO')}>EDUCAÇÃO EM FOCO</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSelectItem('TECNOLOGIA')}>TECNOLOGIA</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSelectItem('ALÉM DO LIVRO')}>ALÉM DO LIVRO</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSelectItem('MONTHLY DOSE OF ENGLISH')}>MONTHLY DOSE OF ENGLISH</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSelectItem('PALAVREANDO')}>PALAVREANDO</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSelectItem('AVENTURAS NA HISTÓRIA')}>AVENTURAS NA HISTÓRIA</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="input-group-reduzido w-100 mb-1">
            <h5 className="subtitulo_fale-conosco">Comentário</h5>
            <textarea
              className="form-control mx-auto textarea-reduzido"
              rows="3"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              style={{ resize: 'none' }}
            />
          </div>

          <div className="d-flex justify-content-end w-100">
            <button className="button_fale-avisar btn btn-primary btn-md" onClick={openModal}>
              <p>Enviar</p>
            </button>
          </div>
        </div>

        <div className="fale_conosco-imagem col-md-6">
          <img src="../img/faleConosco.svg" className="img-fluid" alt="Imagem de contato" />
        </div>
      </div>

      {/* Modal de Confirmação */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title className="modal-title-custom">Confirmar Envio</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-custom">Você tem certeza de que deseja enviar os dados?</Modal.Body>
        <Modal.Footer className="modal-footer-custom">
          <Button variant="secondary" onClick={() => setShowModal(false)} className="modal-btn-custom">
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit} className="modal-btn-custom">
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default FaleConosco;
