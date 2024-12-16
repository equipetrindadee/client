import React, { useState, useEffect } from 'react';
import { Badge, Button, Modal } from 'react-bootstrap';
import './faleConoscoProfessor.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ComentariosReagidos from './comentariosReagidos';
import NavBarProfessor from '../../navBar/navBarProfessor';
import FilterButtonFaleConoscoProfessor from './filterButtonFaleConoscoProfessor';
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc } from "firebase/firestore";

export function FaleConoscoProfessor() {
  const [showFullMessageModal, setShowFullMessageModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ message: "", email: "", tag: "" });
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState(''); // filtro selecionado
  const [cardsData, setCardsData] = useState([]);
  const [comentariosReagidos, setComentariosReagidos] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const db = getFirestore();

  useEffect(() => {
    const fetchCards = async () => {
      const querySnapshot = await getDocs(collection(db, "faleConosco"));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        reagido: false,
        ...doc.data()
      }));
      setCardsData(data);
    };

    const storedComments = JSON.parse(localStorage.getItem('comentariosReagidos')) || [];
    setComentariosReagidos(storedComments);
    fetchCards();
  }, []);

  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleFocus = () => {
    setIsExpanded(true); // Expande o input ao clicar
  };

  const handleBlur = () => {
    if (inputValue === '') {
      setIsExpanded(false); // Encolhe o input se não houver texto
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value); // Atualiza o estado com o texto digitado
  };


  const openModal = (type, card) => {
    setSelectedCard(card);
    if (type === 'full') setShowFullMessageModal(true);
    else if (type === 'chat') setShowChatModal(true);
    else if (type === 'delete') setShowDeleteModal(true);
  };

  const closeModal = (type) => {
    if (type === 'full') setShowFullMessageModal(false);
    else if (type === 'chat') setShowChatModal(false);
    else if (type === 'delete') setShowDeleteModal(false);
  };

  const toggleReaction = (cardId) => {
    setCardsData((prevData) =>
      prevData.map((card) =>
        card.id === cardId ? { ...card, reagido: !card.reagido } : card
      )
    );
  };

  const adicionarComentarioReagido = async (novoComentario) => {
    if (novoComentario.email && novoComentario.mensagem) {
      await addDoc(collection(db, "comentariosReagidos"), novoComentario);
      const updatedComentarios = [...comentariosReagidos, novoComentario];
      setComentariosReagidos(updatedComentarios);
      localStorage.setItem('comentariosReagidos', JSON.stringify(updatedComentarios));
      setCardsData((prevData) => prevData.filter(card => card.id !== selectedCard.id));
    } else {
      console.error('Comentário inválido:', novoComentario);
    }
  };

  const deleteComentario = async (cardId) => {
    const commentRef = doc(db, "faleConosco", cardId);
    await deleteDoc(commentRef);
    setCardsData((prevData) => prevData.filter(card => card.id !== cardId));
  };

  // Filtra os cards com base no termo de pesquisa e no filtro selecionado
  const filteredCards = cardsData.filter(card => {
    const matchesSearchTerm = card.email && card.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'todos' || (filter && card.tipoAtivo && card.tipoAtivo.toLowerCase() === filter.toLowerCase());
    return matchesSearchTerm && matchesFilter;
  });

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const enviarResposta = () => {
    const novoComentario = {
      email: selectedCard.email,
      mensagem: selectedCard.mensagem,
      resposta: newMessage,
      tipoAtivo: true,
    };

    const finalComentarios = [...comentariosReagidos, novoComentario];
    setComentariosReagidos(finalComentarios);
    localStorage.setItem('comentariosReagidos', JSON.stringify(finalComentarios));
    setNewMessage('');
    setShowFullMessageModal(false);
    adicionarComentarioReagido(novoComentario);
    closeModal('full');
  };

  return (
    <div>
      <NavBarProfessor />
      <div className="faleConoscoProfessor_main">
        <div className="faleConoscoProfessor_header">
          <h1>FALE CONOSCO</h1>
          <div className="faleConoscoProfessor_headerLine"></div>
          <div className="faleConoscoProfessorFilterButtonsTopOfPage">

            <div className={`contentColunaHeaderContentProfessor-actionsButtonsSearch-wrapper ${searchTerm ? 'no-hover' : ''}`}>
              <div className={`search-containerMaster ${isExpanded ? 'expandedMaster' : ''}`}>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}

                  className="search-inputMaster"
                />
                <i class='bx bx-search search-iconMaster'></i>
              </div>
            </div>
            <div>
              <FilterButtonFaleConoscoProfessor onFilterChange={handleFilterChange} />
            </div>
          </div>
        </div>

        <div className="faleConoscoProfessor_body d-flex">
          <div className="faleConoscoProfessor_comentarios">
            <h2 className="faleConoscoProfessor_h2">COMENTÁRIOS</h2>
            {filteredCards.map((card) => (
              <div className="faleConoscoProfessor_card" key={card.id}>
                <div className="faleConoscoProfessor_cardHeader d-flex align-items-center">
                  <div className="faleConoscoProfessor_content">
                    <i className="bx bxs-user-circle faleConoscoProfessor_profileImage"></i>
                    
                      <div className="professor_info">
                      <span className="faleConoscoProfessor_email">De: {card.email}</span>
                      <div className="faleConoscoProfessor_categoria"><p className="faleConoscoProfessorCategoriaTagName">{card.tipoAtivo}</p></div>
                    </div>
                  </div>
                  <button
                    className={`faleConoscoProfessor_heartButton ${card.reagido ? 'btn-danger' : 'btn-light'}`}
                    onClick={async () => {
                      const novoComentario = {
                        email: card.email || '',
                        mensagem: card.mensagem || '',
                        resposta: '',
                        tipoAtivo: true,
                      };
                      await adicionarComentarioReagido(novoComentario);
                      setCardsData(prevCards => prevCards.filter(item => item.id !== card.id));
                    }}
                  >
                    <i className="bi bi-heart"></i>
                  </button>
                </div>

                <div className="faleConoscoProfessor_cardBody">
                  <p className="faleConoscoProfessor_previewText">
                    {card.mensagem}
                  </p>
                </div>

                <div className="faleConoscoProfessor_line"></div>

                <div className="faleConoscoProfessor_cardFooter d-flex justify-content-between">
                  <Button className="faleConoscoProfessor_cardFooter-button-sublinhado" onClick={() => openModal('chat', card)}>
                    Abrir mensagem completa
                  </Button>
                  <div className="faleConoscoProfessor_buttonGroup">
                    <button className="faleConoscoProfessor_card_button" onClick={() => openModal('full', card)}>
                      <i className='bx bxs-chat respondeUsuarioFaleConosco'></i>
                    </button>
                    <button className="faleConoscoProfessor_card_button" onClick={() => openModal('delete', card)}>
                      <i className="bi bi-trash respondeUsuarioFaleConosco"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="faleConoscoProfessor_comentariosReagidos">
            <h2 className="text-center">COMENTÁRIOS REAGIDOS</h2>
            {comentariosReagidos.map((comment, index) => (
              <ComentariosReagidos key={index} comment={comment} />
            ))}
          </div>
        </div>
      </div>

      {/* Modais */}
      <Modal show={showFullMessageModal} onHide={() => closeModal('full')} centered className="faleConoscoProfessor_modal">
        <Modal.Header closeButton className="faleConoscoProfessor_modalHeader">
          <img src={selectedCard.profileImage || "https://via.placeholder.com/50"} alt="Perfil" className="faleConoscoProfessor_profileImage" />
          <div className="faleConoscoProfessor_emailWrapper ms-2">
            <span className="faleConoscoProfessor_email text-white">{selectedCard.email}</span>
            <div className="faleConoscoProfessor_categoria"><p className="faleConoscoProfessorCategoriaTagName">{selectedCard.tipoAtivo}</p></div>
          </div>
        </Modal.Header>
        <Modal.Body className="faleConoscoProfessor_modalBody">
          <p className='changeFontFamilyFaleConoscoMontsserrat'>{selectedCard.mensagem}</p>

        </Modal.Body>
        <Modal.Footer className="faleConoscoProfessorMensagemResponse">
          <input
            type="text"
            className="faleConoscoProfessor_textArea"
            placeholder="Digite sua resposta..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button onClick={enviarResposta} className="faleConoscoProfessor_closeButton">
            <i className="bi bi-arrow-right-circle"></i>
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showChatModal} onHide={() => closeModal('chat')} centered className="faleConoscoProfessor_modal">
        <Modal.Header closeButton className="faleConoscoProfessor_modalHeader">
          <img src={selectedCard.profileImage || "https://via.placeholder.com/50"} alt="Perfil" className="faleConoscoProfessor_profileImage" />
          <div className="faleConoscoProfessor_emailWrapper ms-2">
            <span className="faleConoscoProfessor_email text-white">{selectedCard.email}</span>
            <div className="faleConoscoProfessor_categoria"><p className="faleConoscoProfessorCategoriaTagName">{selectedCard.tipoAtivo}</p></div>
          </div>
        </Modal.Header>
        <Modal.Body className="faleConoscoProfessor_modalBody">
          <p className='changeFontFamilyFaleConoscoMontsserrat'  >{selectedCard.mensagem}</p>
        </Modal.Body>
        <Modal.Footer>
          <i className="bi bi-heart faleConoscoProfessorHeartButton"></i>
          <button className="faleConoscoProfessor_card_button" onClick={() => openModal('delete', selectedCard)}>
            <i className="bi bi-trash iconeFaleConoscoLixoMMC"></i>
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => closeModal('delete')} centered>
        <Modal.Header className='modalFaleConoscoModalDeleteHeader'>
          <Button onClick={() => closeModal('delete')} variant="link">
            <i className="bi bi-x-circle gooutDelete"></i>
          </Button>
        </Modal.Header>
        <Modal.Body className='modalFaleConoscoModalDeleteBody'>
          <p>Você tem certeza de que deseja deletar este comentário? </p>
          <p>Esta ação não pode ser desfeita.</p>
        </Modal.Body>
        <Modal.Footer className='modalFaleConoscoButtonsFooter'>
          <Button onClick={() => closeModal('delete')} className='modalFaleConoscoButtonsFooterNao'>
            <p className='modalFaleConoscoButtonsFooterNaoP'> NÃO</p>
          </Button>
          <Button onClick={() => {
            deleteComentario(selectedCard.id);
            closeModal('delete');
          }} className='modalFaleConoscoButtonsFooterSim'>
            <p className='modalFaleConoscoButtonsFooterSimP'>SIM</p>
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default FaleConoscoProfessor;
