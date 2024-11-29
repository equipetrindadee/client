
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../../navBar/navBarAlunoMobile/navBarAlunoMobile.css";
import ModalPerfil from '../../aluno/componetsAluno/modalPerfil';

export const NavBaralunoMobile = () => {
    const [selectedIcon, setSelectedIcon] = useState(null);  // Estado para armazenar o ícone selecionado

    const handleIconClick = (index) => {
        setSelectedIcon(index);  // Define o ícone clicado como selecionado
    };

    return (
        <div>
            <header className="aluno_navBarMobile-Superior d-flex justify-content-between align-items-center">
                <div className=" d-flex align-items-center aluno_navBarMobile-Superior-logo">
                    <img src="../../../img/logo_pt.svg" alt="Foto de Logo" className="me-2" />
                    <h5 className="mb-0 aluno_navBarMobile-SuperiorTitle"> O EDUCADOR</h5>
                </div>
                <div className="aluno_navBarMobile-SuperiorButton">
                    <button type="button" className="btn  aluno_navBarMobile-button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        <ModalPerfil />
                        <i class="bi bi-person-circle"></i>
                    </button>
                </div>
            </header>

            <nav className="fixed-bottom-nav d-flex justify-content-around py-3 aluno_navBarMobile-Inferior">
                {/* Cada ícone recebe um índice e chama a função handleIconClick ao ser clicado */}
                
                <a href="#" className={`aluno_navBarMobile-icon ${selectedIcon === 0 ? 'selected' : ''}`} onClick={() => handleIconClick(0)}>
                        <i className={`bi-house-door ${selectedIcon === 0 ? 'focused' : ''}`}></i>
                    </a>
                    <a href="#" className={`aluno_navBarMobile-icon ${selectedIcon === 1 ? 'selected' : ''}`} onClick={() => handleIconClick(1)}>
                        <i className={`bi bi-layout-text-window-reverse ${selectedIcon === 1 ? 'focused' : ''}`}></i>
                    </a>
                    <a href="#" className={`aluno_navBarMobile-icon ${selectedIcon === 2 ? 'selected' : ''}`} onClick={() => handleIconClick(2)}>
                        <i className={`bi bi-book ${selectedIcon === 2 ? 'focused' : ''}`}></i>
                    </a>
                    <a href="#" className={`aluno_navBarMobile-icon ${selectedIcon === 3 ? 'selected' : ''}`} onClick={() => handleIconClick(3)}>
                        <i className={`bi bi-box-arrow-right  ${selectedIcon === 3 ? 'focused' : ''}`}></i>
                    </a>


            </nav>
        </div>
    );
}

export default NavBaralunoMobile;
