import React, { useState } from "react";
import "../navbarSidebarTest/SideNavBar.css";
import "boxicons/css/boxicons.min.css";

const SideNavBar = () => {
  const [isExpanded, setExpendState] = useState(false);

  const menuItems = [
    { text: "Dashboard", icon: "bx bxs-dashboard" },
    { text: "LISTA DE USUÁRIOS", icon: "bx bxs-user-detail" },
    { text: "CADASTRAR", icon: "bx bxs-user-plus" },
    { text: "MEU PERFIL", icon: "bx bx-user" }
  ];

  return (
    <div className={isExpanded ? "navBarSideBarMasterUser-side-nav-container" : "navBarSideBarMasterUser-side-nav-container navBarSideBarMasterUser-side-nav-container-NX"}>
      <div className="navBarSideBarMasterUser-nav-upper">
        <div className="navBarSideBarMasterUser-nav-heading">
          {isExpanded && (
            <div className="navBarSideBarMasterUser-nav-brand">
            
              <h2 className="navBarSideBarMasterTitle" onClick={() => setExpendState(false)}>O EDUCADOR</h2>
            </div>
          )}
          {!isExpanded && (
            <button onClick={() => setExpendState(true)}>
              <img className="navBarSideBarMasterUserImgLogo" src="../img/handLogoOEducador.svg" alt="" />
            </button>
          )}
        </div>
        <div className="navBarSideBarMasterUser-nav-menu">
          {menuItems.map(({ text, icon }) => (
            <a className={isExpanded ? "navBarSideBarMasterUser-menu-item" : "navBarSideBarMasterUser-menu-item navBarSideBarMasterUser-menu-item-NX"} href="#" key={text}>
              <i className={`navBarSideBarMasterUser-menu-item-icon ${icon}`}></i>
              {isExpanded && <p className="navBarSideBarMasterP" >{text}</p>}
            </a>
          ))}
        </div>
      </div>
      <div className="navBarSideBarMasterUser-nav-footer">
        
        <i class='bx bx-log-out bx-flip-horizontal' ></i>
          {isExpanded && (
            <div className="navBarSideBarMasterUser-nav-details">
              <div className="navBarSideBarMasterUser-nav-footer-info">
                <p className="navBarSideBarMasterUser-nav-footer-user-name">SAIR</p>
              </div>
            </div>
          )}
        

        

      </div>

    </div>
  );
};

export default SideNavBar;
