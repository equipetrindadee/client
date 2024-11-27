import React, { useState, useEffect } from 'react';
import './notificacoes.css';
import { Button, Modal } from 'react-bootstrap';
import api from "../../../../../../config/configApi";
import 'bootstrap-icons/font/bootstrap-icons.css';

function Notificacoes({ systemMessage, messageModal }) {
  const [show, setShow] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [respondClicks, setRespondClicks] = useState(0);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get('/notificacoes');
        setNotifications(response.data);
      } catch (error) {
        console.error("Erro ao buscar notificações:", error);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.name === 'Sistema'
          ? { ...notification, message: systemMessage || 'Mensagem do sistema:' }
          : notification
      )
    );
  }, [systemMessage]);

  const handleClose = () => {
    setShow(false);
    setRespondClicks(0);
  };

  const handleShow = (notification) => {
    setShow(true);
    setSelectedNotification(notification);
  };

  const handleRespond = async () => {
    if (respondClicks === 1) {
      // Deletar notificação do banco de dados
      try {
        await api.delete(`/notificacoes/${selectedNotification.id}`); // Supondo que `id` é o identificador da notificação
        // Atualizar o estado local para remover a notificação deletada
        setNotifications(notifications.filter((n) => n.id !== selectedNotification.id));
        handleClose(); // Fecha o modal após a deleção
      } catch (error) {
        console.error("Erro ao deletar notificação:", error);
      }
    } else {
      setRespondClicks(respondClicks + 1); // Incrementa o contador de cliques
    }
  };
  const handleDeleteNotification = async () => {
    if (selectedNotification) { // Verifica se há uma notificação selecionada
      try {
        const response = await api.delete(`/notificacoes/${selectedNotification.id}`);
        if (!response.data.error) {
          alert("Card deletado com sucesso!");
          setNotifications(notifications.filter((n) => n.id !== selectedNotification.id)); // Remove do estado local
          handleClose(); // Fecha o modal após a exclusão
        }
      } catch (error) {
        alert("Não foi possível deletar a notificação.");
      }
    }
  };
  


  return (
    <div>
      {notifications.map((notification, index) => (
        <div key={index} className={`aluno_dashboard_cards ${notification.isSystem ? 'sistema-card' : ''}`}>
          <Button 
            className={`button_notificacoes_aluno ${notification.isSystem ? 'sistema-button' : ''}`}
            variant="" 
            onClick={() => handleShow(notification)}
          >
            <div className="button_notificacoes_aluno_estrutura">
              <div className="button_notificacoes_aluno_conteudo_img imagem-perfil-universal"> 
                <img src={notification.imgSrc} alt={`img${index}`} />
              </div>
              <div className="button_notificacoes_aluno_conteudo_texto"> 
                <h3>{notification.name}</h3>
                <p>{notification.message}</p>
              </div>
            </div>
          </Button>
        </div>
      ))}
  
      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <div className={`modal_notificacoes_aluno_estrutura ${selectedNotification?.isSystem ? 'sistema-card' : ''}`}>
            <div className="modal_notificacoes_aluno_conteudo_img imagem-perfil-universal_modal">
              <img src={selectedNotification?.imgSrc} alt="img" />
            </div>
            <div className="modal_notificacoes_aluno_conteudo_texto">
              <h3>{selectedNotification?.name}</h3>
            </div>
            <div className="modal_notificacoes_aluno_botao_fechar">
              <Button variant="" className={selectedNotification?.isSystem ? 'sistema-close-button' : ''} onClick={handleClose}>
                <i className="bi bi-x-circle-fill"></i>
              </Button>
            </div>
          </div>
        </Modal.Header>
  
        <Modal.Body>
          <textarea 
            className="modal_notificacoes_aluno_textarea"
            value={selectedNotification?.messageModal || ''} // Usa o messageModal da notificação selecionada
            onChange={(e) => {
              if (selectedNotification) {
                setSelectedNotification({
                  ...selectedNotification,
                  messageModal: e.target.value // Atualiza o messageModal conforme o usuário digita
                });
              }
            }}
          />
        </Modal.Body>
  
        <Modal.Footer>
          <div className="modal_notificacoes_aluno_footer">
            <Button 
              variant="" 
              className={selectedNotification?.isSystem ? 'sistema-footer-button' : ''} 
              onClick={handleDeleteNotification}
            >
              Visualizar
          </Button>

          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Notificacoes;
