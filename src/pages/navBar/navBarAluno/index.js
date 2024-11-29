import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../../navBar/navBarAluno/navBarAluno.css"; // Supondo que o CSS já inclua o estilo #41BFB3

export const NavBarAluno = () => {
    const [isSidebarHidden, setIsSidebarHidden] = useState(true); // Start with sidebar hidden by default
    const location = useLocation();

    const menuItems = [
        { text: 'TELA INICIAL', path: '/dashboardAluno' }, // Ajuste o caminho conforme necessário
        { text: 'CHAT', path: '/chatAluno' }, // Ajuste o caminho conforme necessário
        { text: 'MEUS ARTIGOS', path: '/meusArtigos' }, // Ajuste o caminho conforme necessário
        { text: 'JORNAL', path: '/jornal' } // Ajuste o caminho conforme necessário
    ];

    const handleLogout = () => {
        window.location.href = '/Login';
    };

    const handleMenuItemClick = () => {
        console.log("Navegando para a página, sidebar não será modificada.");
    };

    const handleSidebarToggle = () => {
        setIsSidebarHidden(!isSidebarHidden);
    };

    return (
        <div>
            {/* SIDEBAR ALUNO */}
            <div  id="sidebar" className={`${isSidebarHidden ? 'hideAluno' : ''} navBarAlunoBackground`}>
                <Link to="#" className="brand-aluno" onClick={handleSidebarToggle}>
                    {isSidebarHidden && <img src='../img/handLogoOEducador.svg' alt="Logo" />}
                    {!isSidebarHidden && (
                        <div className='topDisplayFlexNavBarAluno'>
                            <h1 className="navBarAlunoTitle">O EDUCADOR</h1>
                        </div>
                    )}
                </Link>
                <ul className="side-menu-aluno top">
                    {menuItems.map((item, index) => (
                        <li key={index} className={location.pathname === item.path ? 'active' : ''}>
                            <Link to={item.path} onClick={handleMenuItemClick}>
                                <i className={`bx navBarAlunoIcones ${['bi-house-door', 'bx bx-message-square-dots bx-flip-horizontal', 'bx bx-food-menu', 'bx bx-book-open'][index]}`}></i>
                                {!isSidebarHidden && <span className="navBarAlunoTextInformative">{item.text}</span>}
                            </Link>
                        </li>
                    ))}
                </ul>
                <ul className="logoutNavBarAluno">
                    <li>
                        <Link to="#" className="iconeLogoutNavBarAluno" onClick={handleLogout}>
                            <i className='bi bi-box-arrow-right iNBAluno'></i>
                            {!isSidebarHidden && <span className="logoutNavBarAlunoSair">SAIR</span>}
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default NavBarAluno;
