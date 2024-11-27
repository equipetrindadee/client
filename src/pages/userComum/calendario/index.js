import React, { useState, useEffect } from 'react';
import './direito.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Box from '@mui/material/Box';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { initializeApp } from 'firebase/app';
import dayjs from 'dayjs';
import api from '../../../config/configApi';
import { jwtDecode } from 'jwt-decode';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  arrayUnion,
  increment // Aqui está a importação do increment
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBNIaO0le5Mn4UDxWX32YDoY_b4xNZikDg",
  authDomain: "reactfirebase-140c5.firebaseapp.com",
  projectId: "reactfirebase-140c5",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);


function Calendario() {
  useEffect(() => {
    const storedAgendas = localStorage.getItem('savedAgendas');
    if (storedAgendas) {
      setSavedAgendas(JSON.parse(storedAgendas)); // Carrega as agendas salvas
    }
  }, []);
  const [userName, setUserName] = useState('');
  const [userColum, setColumName] = useState('');
  const [userId, setUserId] = useState('');
  const [selectedDate, setSelectedDate] = useState(null); // Data selecionada
  const [showModal, setShowModal] = useState(false); // Controle do modal principal
  const [showSaveModal, setShowSaveModal] = useState(false); // Modal de confirmação de salvamento
  const [agendaText, setAgendaText] = useState(''); // Texto da agenda
  const [activeEmoji, setActiveEmoji] = useState(null); // Emoji ativo
  const [savedAgendas, setSavedAgendas] = useState({}); // Armazena as agendas salvas
  const [dados, setDados] = useState(null);
  const [agendaData, setAgendaData] = useState([
    { data: '', evento: '' }
  ]);



  useEffect(() => {
    const fetchUserData = async () => {
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
                    setColumName(data.coluna || "Coluna não encontrada");
                    setUserId(userId); // Armazena o ID do usuário logado
                    console.log(`Usuário logado: ${userName} (ID: ${userId})`);
                    console.log(`Coluna do usuer: ${userColum} (ID: ${userId})`);
                }

            } catch (error) {
                console.error("Erro ao decodificar o token ou consultar o Firestore:", error);
            }
        }
    };

    fetchUserData();
}, []);

const salvarAgenda = async () => {
  try {
    const response = await api.post('/calendario', {
      userId,
      agendaData
    });
    console.log('Agenda salva com sucesso:', response.data);
  } catch (error) {
    console.error('Erro ao salvar agenda:', error);
  }
};
 // Função para adicionar ou editar um evento de calendário
 const adicionarEvento = () => {
  setAgendaData([...agendaData, { data: '', evento: '' }]);
};



  const emojis = ["😀", "❤️", "🔥", "👍"]; // Emojis mais utilizados

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
    const formattedDate = dayjs(newValue).format('YYYY-MM-DD');
    
    if (savedAgendas[formattedDate]) {
      setShowSaveModal(true);
    } else {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCloseSaveModal = () => {
    setShowSaveModal(false);
  };

   // Função para atualizar os dados do evento
   const handleChange = (index, field, value) => {
    const newAgendaData = [...agendaData];
    newAgendaData[index][field] = value;
    setAgendaData(newAgendaData);
  };

  const handleSaveAgenda = () => {
    if (selectedDate) {
      const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD'); // Formata a data
    
      // Cria o objeto de agenda
      const newAgenda = {
        ...savedAgendas,
        [formattedDate]: {
          text: agendaText,
          emoji: activeEmoji,
        },
      };
    
      // Atualiza o estado e o localStorage
      setSavedAgendas(newAgenda);
      localStorage.setItem('savedAgendas', JSON.stringify(newAgenda));
      
      console.log(newAgenda); // Verifica se os dados estão corretos
    
      // Limpa os estados do modal e exibe a confirmação de salvamento
      setAgendaText('');  // Limpa o texto da agenda para novos dias
      setActiveEmoji(null);  // Reseta o emoji selecionado
      setShowModal(false);
      setShowSaveModal(true);
  
      // Chama a função para salvar a agenda no backend
      salvarAgenda();
    }
  };
  

  // Função para deletar a agenda
  const handleDeleteAgenda = () => {
    if (selectedDate) {
      const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');
      const updatedAgendas = { ...savedAgendas };
      delete updatedAgendas[formattedDate]; // Remove a agenda para a data selecionada
      setSavedAgendas(updatedAgendas);
      localStorage.setItem('savedAgendas', JSON.stringify(updatedAgendas)); // Atualiza o localStorage
      setShowSaveModal(false); // Fecha o modal
    }
  };

  const handleEmojiClick = (emoji) => {
    setActiveEmoji(emoji); // Marca o emoji como ativo
  };

  
  // Função para buscar os dados
  const fetchData = async () => {
    try {
      const response = await api.get('/users'); // Substitua pela rota correta
      setDados(response.data); // Armazena os dados no estado
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  // useEffect para fazer a requisição assim que o componente for montado
  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="calendar-container d-flex">
      <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '70%', // Ajusta o tamanho da área do calendário
        maxWidth: '100%',
        padding: '10px',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={selectedDate} // Mantém a data selecionada
          onChange={handleDateChange} // Chama handleDateChange ao clicar em um dia
          sx={{
            width: '100%',
            maxWidth: '100%',
            '& .MuiPickersCalendarHeader-root, & .MuiDayCalendar-monthContainer': {
              width: '100%',
              '& .MuiPickersDay-root': {
                fontSize: '1.5rem', // Aumenta o tamanho dos dias
                color: '#000',
                width: '50px',
                height: '50px',
                backgroundColor: (day) => {
                  const formattedDate = dayjs(day).format('YYYY-MM-DD');
                  return savedAgendas[formattedDate] ? '#FFD700' : '#fff'; // Amarelo para agendados
                },
                '&:hover': {
                  background: '#7FFFD4',
                  color: '#fff',
                },
              },
              '& .MuiPickersCalendarHeader-label': {
                fontSize: '2rem', // Aumenta o tamanho do texto do mês
              },
              '& .MuiPickersArrowSwitcher-button': {
                transform: 'scale(1.8)', // Aumenta o tamanho das setas
              },
              '& .MuiDayCalendar-weekDayLabel': {
                fontSize: '0.5rem', // Aumenta o tamanho dos dias da semana
              },
            },
            '@media (max-width: 600px)': {
              transform: 'scale(1.1)', // Ajusta o tamanho para telas pequenas
              transformOrigin: 'top center',
            },
          }}
        />
      </LocalizationProvider>
    </Box>

      {/* Div lateral que exibe os dias agendados */}
      <div className="scheduled-days" style={{ width: '30%', padding: '10px', borderLeft: '1px solid #ccc' }}>
      <h2>{userName}</h2>

        <h3>Dias Agendados</h3>
        <ul>
          {Object.keys(savedAgendas).map((date) => (
            <li key={date}>
              <strong>{date}</strong>: {savedAgendas[date].text} {savedAgendas[date].emoji}
            </li>
          ))}
        </ul>
      </div>

      <Modal
        className="calendar-agenda-modal"
        show={showModal}
        onHide={handleCloseModal}
        centered
        size="lg"
      >
        <Modal.Header className="calendar-agenda-modal-header" closeButton>
          <Modal.Title className="calendar-agenda-modal-title" style={{ fontSize: '2.5rem' }}>
            Faça a sua Agenda
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="calendar-agenda-modal-body">
          <textarea
            className="form-control calendar-agenda-textarea"
            rows="5"
            placeholder="Escreva sua agenda aqui..."
            value={agendaText}
            onChange={(e) => setAgendaText(e.target.value)}
            style={{ width: '100%', fontSize: '1.5rem' }}
          />
          <div className="d-flex justify-content-around mt-4 calendar-agenda-emoji-buttons">
            {emojis.map((emoji) => (
              <Button
                key={emoji}
                variant={activeEmoji === emoji ? "primary" : "light"}
                className="calendar-agenda-emoji-btn"
                onClick={() => handleEmojiClick(emoji)}
                style={{
                  fontSize: '2rem',
                  padding: '10px 20px',
                  backgroundColor: activeEmoji === emoji ? '#007bff' : '#f8f9fa',
                }}
              >
                {emoji}
              </Button>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer className="calendar-agenda-modal-footer">
          <Button
            variant="primary"
            className="calendar-agenda-save-btn"
            onClick={handleSaveAgenda}
            style={{ fontSize: '1.2rem' }}
          >
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>

      {savedAgendas[selectedDate && dayjs(selectedDate).format('YYYY-MM-DD')] && (
        <Modal
          className="calendar-confirmation-modal"
          show={showSaveModal}
          onHide={handleCloseSaveModal}
          centered
        >
          <Modal.Header className="calendar-confirmation-modal-header">
            <Modal.Title className="calendar-confirmation-modal-title" style={{ fontSize: '2rem' }}>
              Agenda Salva
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="calendar-confirmation-modal-body" style={{ fontSize: '1.5rem' }}>
            <p>
              <strong>Data:</strong> {dayjs(selectedDate).format('YYYY-MM-DD')}
            </p>
            <p>
              <strong>Texto:</strong> {savedAgendas[dayjs(selectedDate).format('YYYY-MM-DD')].text}
            </p>
            <p>
              <strong>Emoji:</strong> {savedAgendas[dayjs(selectedDate).format('YYYY-MM-DD')].emoji || "Nenhum emoji selecionado"}
            </p>
          </Modal.Body>
          <Modal.Footer className="calendar-confirmation-modal-footer">
            <Button variant="danger" onClick={handleDeleteAgenda}>
              Deletar
            </Button>
            <Button variant="primary" onClick={handleCloseSaveModal}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      
    </div>
  );
}

export default Calendario;
