import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../../navBar/navBarAluno/navBarAluno.css";


export const NavBaraluno = () => {
    const [activeButton, setActiveButton] = useState(0);
    const [hovering, setHovering] = useState(false);

    const handleButtonClick = (index) => {
        setActiveButton(index);
    };

    const handleMouseEnter = () => {
        setHovering(true);
    };

    const handleMouseLeave = () => {
        setHovering(false);
    };

    // Manipulador de mouse para impedir a propagação do evento hover
    const handleMouseEnterNavLinks = (event) => {
        event.stopPropagation();
    };

    // Subtítulos correspondentes aos ícones
    const subtitles = ['INICIO', 'CHAT', 'MINHAS MATÉRIAS','JORNAL'];

    return (
        <div>
            {/* header */}
            <div className='aluno_div_header_navBar'>
                <img className="aluno_header_navBar_img" src="../img/tigre.png" alt="logo" />
                <div className='aluno_header_navBar_div_h3'>
                    <h3>O EDUCADOR</h3>
                </div>
            </div>{/* fim header */}


            {/* NavBar */}
            <nav className='aluno_navBar_nav'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>


                {/* Não mexer 😫😫 */}
                {hovering ? (
                    <h4 className="aluno_navBar_nav-title aluno_navBar_h4_after"></h4>
                ) : (
                    // <img className="aluno_navBar_nav-title aluno_navBar_h4_before" src="../img/tigre.png" alt="logo" />
                    <h4 className="aluno_navBar_nav-title aluno_navBar_h4_before"></h4>
                )}

                <div className="aluno_navBar_nav-links" onMouseEnter={handleMouseEnterNavLinks}>
                    <ul className='aluno_navBar_ul'>
                        {/* icones botoes */}
                        {['bi-house-door', 'bi-chat-text', 'bi bi-layout-text-window-reverse','bi bi-book'].map((icon, index) => (
                            <li className='aluno_navBar_li' key={index}>
                                <button
                                    id='aluno_navBar_button_nav'
                                    className={activeButton === index ? 'aluno_navBar_active-btn' : 'aluno_navBar_inactive-btn'}
                                    onClick={() => handleButtonClick(index)}>
                                    
                                    <a href="#">
                                        <i id='aluno_navBar_i' className={`bi ${icon} aluno_navBar_i ${activeButton === index ? 'aluno_navBar_active-icon' : 'aluno_navBar_inactive-icon'}`}></i>    
                                    </a>

                                    <div className='aluno_navBar_div_subtitulos'>
                                        {hovering && (
                                            <p className={`aluno_navBar_p ${activeButton === index ? 'aluno_navBar_active-subtitle' : 'aluno_navBar_inactive-subtitle'}`}>
                                                {subtitles[index]}
                                            </p>
                                        )}
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* botão Sair */}
                <button className="aluno_navBar_button_exit aluno_navBar_exit-button">
                    <a href="#">
                        <i className="bi bi-box-arrow-right aluno_navBar_exit-icon" id='aluno_navBar_i'></i>
                    </a>
                    <div className='aluno_navBar_div_subtitulos'>
                        {hovering ? (
                            <p className="aluno_navBar_p_exit aluno_navBar_inactive-subtitle">SAIR</p>
                        ) : (
                            <p className="aluno_navBar_p_exit aluno_navBar_active-subtitle"></p>
                        )}
                    </div>
                </button>     {/* Fim do Botão Sair */}
            </nav>            {/* fim navBar */}
        </div>
    );
}

export default NavBaraluno;
