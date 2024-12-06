import React, { useState } from 'react';

import "../../master/DashBoardMaster/dashboardmaster.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export const DashBoardMaster = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [showFilter, setShowFilter] = useState(false);

    return (
        <div className="DashBoardMaster-container">
            <aside className="DashBoardMaster-sidebar">
                {/* Ícones da barra lateral */}
                <i className="bi bi-grid"></i>
                <i className="bi bi-list"></i>
                <i className="bi bi-person"></i>
                <i className="bi bi-file-earmark-text"></i>
            </aside>

            <div className="DashBoardMaster-content">
                <header className="DashBoardMaster-header">
                    <h2>O EDUCADOR</h2>
                </header>

                <div className='dashboardMaster-Container-master'>

                    <h1>Dashboard</h1>

                    <div className="DashBoardMaster-grids">
                        <div className="DashBoardMaster-card"> {/* Curtidas */}
                            <i class='bx bxs-like' ></i>
                            <h3>300</h3>
                            <h2>Curtidas</h2>
                        </div>
                        <div className="DashBoardMaster-card"> {/* Matérias */}
                            <i class='bx bxs-book' ></i>
                            <h3>12</h3>
                            <h2>Matérias</h2>
                        </div>
                        <div className="DashBoardMaster-card"> {/* Cadastros */}
                            <i class='bx bx-walk'></i>
                            <h3>437</h3>
                            <h2>Cadastros</h2>
                        </div>
                        <div className="DashBoardMaster-card"> {/* Edições */}
                            <i class='bx bxs-paper-plane'></i>
                            <h3>120</h3>
                            <h2>Edições</h2>
                        </div>
                    </div>

                </div>

                <div className="DashBoardMaster-bottom-section">
                    <section className="DashBoardMaster-notifications">
                        <h3>Notificações</h3>
                        <ul>
                            <li className='notificacaoEdicao-dashboard-master'><i class='bx bxs-paper-plane'></i> Uma nova edição foi postada</li>
                            <li className='notificacaoCadastro-dashboard-master'><i class='bx bx-walk'></i> Um novo usuário foi cadastrado</li>
                            <li className='notificacaoMateria-dashboard-master'><i class='bx bxs-book' ></i> Uma nova matéria foi concluída</li>
                            <li className='notificacaoCurtida-dashboard-master'><i class='bx bxs-like' ></i> Nova curtida</li>
                        </ul>
                    </section>

                    <div className="DashBoardMaster-actions">
                        <button onClick={() => setShowSearch(!showSearch)} className="DashBoardMaster-search-icon">
                            <i className="bi bi-search"></i>
                        </button>
                        {showSearch && <input type="text" placeholder="Pesquisar..." className="DashBoardMaster-search-bar" />}

                        <button onClick={() => setShowFilter(!showFilter)} className="DashBoardMaster-filter-icon">
                            <i className="bi bi-funnel"></i> Filtro
                        </button>
                        {showFilter && (
                            <div className="DashBoardMaster-filter-dropdown">
                                <h4>Categorias</h4>
                                <ul>
                                    <li>Curtidas</li>
                                    <li>Matérias</li>
                                    <li>Cadastros</li>
                                    <li>Edições</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashBoardMaster;
