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
                    <h1>Dashboard</h1>
                    <h2>O Educador</h2>
                </header>

                <div className="DashBoardMaster-grids">
                    <div className="DashBoardMaster-card"> {/* Curtidas */}
                        <i className="bi bi-hand-thumbs-up"></i>
                        <h3>300</h3>
                        <p>Curtidas</p>
                    </div>
                    <div className="DashBoardMaster-card"> {/* Matérias */}
                        <i className="bi bi-book"></i>
                        <h3>12</h3>
                        <p>Matérias</p>
                    </div>
                    <div className="DashBoardMaster-card"> {/* Cadastros */}
                        <i className="bi bi-person"></i>
                        <h3>437</h3>
                        <p>Cadastros</p>
                    </div>
                    <div className="DashBoardMaster-card"> {/* Edições */}
                        <i className="bi bi-send"></i>
                        <h3>120</h3>
                        <p>Edições</p>
                    </div>
                </div>

                <div className="DashBoardMaster-bottom-section">
                    <section className="DashBoardMaster-notifications">
                        <h3>Notificações</h3>
                        <ul>
                            <li><i className="bi bi-send"></i> Uma nova edição foi postada</li>
                            <li><i className="bi bi-person"></i> Um novo usuário foi cadastrado</li>
                            <li><i className="bi bi-book"></i> Uma nova matéria foi concluída</li>
                            <li><i className="bi bi-hand-thumbs-up"></i> Nova curtida</li>
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
