import React, { useState } from "react";
import "../newNavBarSideBarAluno/SideBarAlunoNavBar.css"
import "boxicons/css/boxicons.min.css";
import { useNavigate } from "react-router-dom";

const SideNavBarNewAluno = () => {
  const [isExpanded, setExpendState] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
      // Limpar tudo do sessionStorage
      sessionStorage.clear();
      
      // Redireciona para a página de login
      navigate('/login');
  };

  const menuItems = [
    { text: "TELA INICIAL", icon: "bx bxs-home", path: '/aluno/dasboardAluno' },
    { text: "CHAT", icon: "bx bx-message-square-dots bx-flip-horizontal", path: '/chat' },
    { text: "MEUS ARTIGOS", icon: "bx bx-columns bx-rotate-270", path:'/meusArtigos'},
    { text: "JORNAL", icon: "bx bx-book-open" , path:'/login'}
  ];

  return (
    <div className={isExpanded ? "navBarSideBarUserAlunoNewMt-side-nav-container" : "navBarSideBarUserAlunoNewMt-side-nav-container navBarSideBarUserAlunoNewMt-side-nav-container-NX"}>
      <div className="navBarSideBarUserAlunoNewMt-nav-upper">
        <div className="navBarSideBarUserAlunoNewMt-nav-heading">
          {isExpanded && (
            <div className="navBarSideBarUserAlunoNewMt-nav-brand">
              <h2 className="navBarSideBarUserAlunoNewMtTitle" onClick={() => setExpendState(false)}>O EDUCADOR</h2>
            </div>
          )}
          {!isExpanded && (
            <button onClick={() => setExpendState(true)}>
              <img className="navBarSideBarUserAlunoNewMtImgLogo" src="../img/handLogoInvertAlunoNavBar.svg" alt="" />
            </button>
          )}
        </div>
        <div className="navBarSideBarUserAlunoNewMt-nav-menu">
          {menuItems.map(({ text, icon, path }) => (
            <a className={isExpanded ? "navBarSideBarUserAlunoNewMt-menu-item" : "navBarSideBarUserAlunoNewMt-menu-item navBarSideBarUserAlunoNewMt-menu-item-NX"} href={path} key={text}>
              <i className={`navBarSideBarUserAlunoNewMt-menu-item-icon ${icon}`}></i>
              {isExpanded && <p className="navBarSideBarUserAlunoNewMtP">{text}</p>}
            </a>
          ))}
        </div>
      </div>
      <div className="navBarSideBarUserAlunoNewMt-nav-footer" onClick={handleLogout}>
        <i className='bx bx-log-out bx-flip-horizontal'></i>
        {isExpanded && (
          <div className="navBarSideBarUserAlunoNewMt-nav-details">
            <div className="navBarSideBarUserAlunoNewMt-nav-footer-info">
              <p className="navBarSideBarUserAlunoNewMt-nav-footer-user-name">SAIR</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideNavBarNewAluno ;
