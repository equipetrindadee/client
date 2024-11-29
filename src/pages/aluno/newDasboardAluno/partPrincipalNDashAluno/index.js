import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../partPrincipalNDashAluno/partPrincipalNDashAluno.css';
import CardPerfil from '../../dashBoardAluno/componetsAluno/cardPerfil/index.js';
import ModalPerfil from '../../dashBoardAluno/componetsAluno/modalPerfil/index.js';
import { Button, Modal } from 'react-bootstrap';
import api from "../../../../config/configApi.js";


export const PartPrincipalDasboardAluno = ({ systemMessage, messageModal }) => {
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
            <div className="containerSecondNewDashAluno">
                {/* Coluna da esquerda (Cards e Notificações) */}
                <div className="leftColumnDashAlunoNew">
                    <div className="partPrincipalNDashAluno__cardRow">
                        {Array(4).fill().map((_, i) => (
                            <div key={i} className="col partPrincipalNDashAluno__cardCol">
                                <div className={`card ${i % 3 === 0 ? 'bg-purple-200' : i % 3 === 1 ? 'bg-primary' : 'bg-danger'} partPrincipalNDashAluno__card`}>
                                    <div className="card-body partPrincipalNDashAluno__cardBody">
                                        <div className="d-flex align-items-center partPrincipalNDashAluno__userInfo">
                                            <img src="https://placehold.co/30x30" alt="User profile" className="rounded-circle partPrincipalNDashAluno__userImg" />
                                            <div className="ms-2 partPrincipalNDashAluno__userName">
                                                <p className="fw-bold mb-0 partPrincipalNDashAluno__userNameText">User Name</p>
                                                <p className="text-muted small partPrincipalNDashAluno__userTime">2 days ago</p>
                                            </div>
                                        </div>
                                        <h5 className="card-title mt-2 partPrincipalNDashAluno__cardTitle">Title of the post</h5>
                                        <p className="card-text partPrincipalNDashAluno__cardText">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna.</p>
                                        <img src="https://placehold.co/100x100" alt="Content image" className="img-fluid partPrincipalNDashAluno__contentImg" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="partPrincipalNDashAluno__notifications">
                        <h3 className="partPrincipalNDashAluno__notificationsTitle">Notificações</h3>
                        {notifications.map((notification, index) => (
                            <div key={index} className={` aluno_dashboard_cards ${notification.isSystem ? 'sistema-card' : ''}`}>
                                <Button
                                    className={`button_notificacoes_aluno ${notification.isSystem ? 'sistema-button' : ''}`}
                                    variant=""
                                    onClick={() => handleShow(notification)}
                                >
                                <img src={notification.imgSrc} alt={`img${index}`} className="partPrincipalNDashAluno__notificationImg" />
                                <div className="ms-4 partPrincipalNDashAluno__notificationText">
                                    <p className="fw-bold mb-0 partPrincipalNDashAluno__notificationName">{notification.name}</p>
                                    <p className=" partPrincipalNDashAluno__notificationMessage">{notification.message}</p>
                                </div>
                                </Button>
                            </div>
                            
                        ))}
                    </div>
                </div>

                {/* Coluna da direita (Modal de Perfil e Progresso) */}
                <div className="rightColumnDashAlunoNew">
                    <div className="partPrincipalNDashAlunoModalPartPerfilDashAluno">
                        <div className="partPrincipalNDashAluno__sideCard">
                            <CardPerfil />
                        </div>

                    </div>
                    <div className="custom-timelineDashAlunoNew">
                        <div className='rsuite-timeline-itemDashAlunoNew'>
                            <p className='rsuite-timeline-itemDashAlunoNewP'>23 de Março de 2024</p>
                            <p className='rsuite-timeline-itemDashAlunoNewP'> 10:20</p>
                            <p className='rsuite-timeline-itemDashAlunoNewColumnName' >Monthy dose of english</p>
                        </div>
                        <div className='rsuite-timeline-itemDashAlunoNew'>
                            <p className='rsuite-timeline-itemDashAlunoNewP'>23 de Março de 2024</p>
                            <p className='rsuite-timeline-itemDashAlunoNewP'> 10:20</p>
                            <p className='rsuite-timeline-itemDashAlunoNewColumnName' >Monthy dose of english</p>
                        </div>
                        <div className='rsuite-timeline-itemDashAlunoNew'>
                            <p className='rsuite-timeline-itemDashAlunoNewP'>23 de Março de 2024</p>
                            <p className='rsuite-timeline-itemDashAlunoNewP'> 10:20</p>
                            <p className='rsuite-timeline-itemDashAlunoNewColumnName' >Monthy dose of english</p>
                        </div>

                    </div>

                    <div className="partPrincipalNDashAluno__progressCard">
                        <h3 className="partPrincipalNDashAluno__progressTitle">Progresso</h3>
                        <div className="partPrincipalDashboardAlunoNew-container">
                            <div className="partPrincipalDashboardAlunoNew-progress-item">
                                <div className="partPrincipalDashboardAlunoNew-icon">
                                    <i class='bx bxs-circle-three-quarter' ></i>
                                </div>
                                <div className="partPrincipalDashboardAlunoNew-text">
                                    <h2 className='partPrincipalDashboardAlunoNew-textProgressoH2'>Alunos Revelam Habilidades Artísticas em Exposição Escolar</h2>
                                    <p className='partPrincipalDashboardAlunoNew-textProgressoP'>80% Concluído</p>
                                </div>
                            </div>

                            <div className="partPrincipalDashboardAlunoNew-progress-item">
                                <div className="partPrincipalDashboardAlunoNew-icon">
                                    <i class='bx bxs-circle-three-quarter' ></i>
                                </div>
                                <div className="partPrincipalDashboardAlunoNew-text">
                                    <h2 className='partPrincipalDashboardAlunoNew-textProgressoH2'>Alunos Revelam Habilidades Artísticas em Exposição Escolar</h2>
                                    <p className='partPrincipalDashboardAlunoNew-textProgressoP'>80% Concluído</p>
                                </div>
                            </div>

                            <div className="partPrincipalDashboardAlunoNew-progress-item">
                                <div className="partPrincipalDashboardAlunoNew-icon">
                                    <i class='bx bxs-circle-three-quarter' ></i>
                                </div>
                                <div className="partPrincipalDashboardAlunoNew-text">
                                    <h2 className='partPrincipalDashboardAlunoNew-textProgressoH2'>Alunos Revelam Habilidades Artísticas em Exposição Escolar</h2>
                                    <p className='partPrincipalDashboardAlunoNew-textProgressoP'>80% Concluído</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <ModalPerfil />

        </div>
    );
}

export default PartPrincipalDasboardAluno;
