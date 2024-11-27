import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../../navBar/navBarProfessor/navBarProfessor.css";

export const NavBarProfessor = ({ toggleNavBar }) => {

    const [isSidebarHidden, setIsSidebarHidden] = useState(true); // Start with sidebar hidden by default
    const location = useLocation();

    const menuItems = [
        { text: 'INÍCIO', path: '/dashP' },
        { text: 'CONTROLE COLUNAS', path: '/controleColunas' },
        { text: 'CONTROLE COLUNISTA', path: '/controleUsuario' },
        { text: 'EDITAR TELA INICIAL', path: '/editarTelaInicialProfessor' },
        { text: 'CHAT', path: '/chat' },
        { text: 'FALE CONOSCO', path: '/faleConoscoProfessor' }
    ];

    const handleLogout = () => {
        window.location.href = '/';
    };

    // This function will no longer toggle the sidebar when a menu item is clicked.
    // It will only be toggled with the image click.
    const handleMenuItemClick = () => {
        console.log("Navegando para a página, sidebar não será modificada.");
    };

    // Toggle sidebar visibility when the logo is clicked
    const handleSidebarToggle = () => {
        setIsSidebarHidden(!isSidebarHidden);
    };

    return (
        <div>
            <section id="sidebar" className={isSidebarHidden ? 'hide' : ''}>
                <Link to="#" className="brand" onClick={handleSidebarToggle}>
                    {isSidebarHidden && <img src='../img/handLogoOEducador.svg' alt="Logo" />}
                    {!isSidebarHidden && (
                        <>
                            <div className='topDisplayFlexNavBarProfessor'>
                                <h1 className="navBarProfessorTitle">O EDUCADOR</h1>
                                <div className='lineUnderTitleNavBarProfessor'></div>
                            </div>
                        </>
                    )}
                </Link>
                <ul className="side-menu top">
                    {menuItems.map((item, index) => (
                        <li key={index} className={location.pathname === item.path ? 'active' : ''}>
                            <Link to={item.path} onClick={handleMenuItemClick}>
                                <i className={`bx navBarProfessorIcones ${['bi-house-door', 'bi-journal-bookmark-fill', 'bi-person-plus-fill', 'bi-file-post', 'bi-chat-text', 'bi-chat-left-quote'][index]}`}></i>
                                {!isSidebarHidden && <span className="navBarProfessorTextInformative">{item.text}</span>}
                            </Link>
                        </li>
                    ))}
                </ul>
                <ul className="logoutNavaBarProfessor">
                    <li>
                        <Link to="#" className="iconeLogoutNavBarProfessor" onClick={handleLogout}>
                            <i className='bi bi-box-arrow-right iNBP'></i>
                            {!isSidebarHidden && <span className="logoutNavaBarProfessorSair">SAIR</span>}
                        </Link>
                    </li>
                </ul>
            </section>
        </div>
    );
}

export default NavBarProfessor;
