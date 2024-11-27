import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './navBarUserComum.css'; // Importando seu CSS
import { Navbar, Nav, Offcanvas } from 'react-bootstrap';

const NavbarUserComum = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Navbar expand="lg" className="navbar">
                <Navbar.Brand href="#home" className="logo">
                    O EDUCADOR
                    <div className="underline"></div>
                </Navbar.Brand>
                <Navbar.Toggle 
                    aria-controls="basic-navbar-nav" 
                    onClick={handleShow} 
                    className="ms-auto border-0 custom-toggle"
                />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="nav-links">
                        <Nav.Link href="#/userComum/faleConosco">
                            Fale Conosco <i className="bi bi-chat ms-2"></i>
                        </Nav.Link>
                        <Nav.Link href="/userComum/colunistaUsuario">
                            Colunistas <i className="bi bi-book ms-2"></i>
                        </Nav.Link>
                        <Nav.Link href="/userComum/sobreNos">
                            Sobre Nós <i className="bi bi-people ms-2"></i>
                        </Nav.Link>
                        <Nav.Link href="#ingles">
                            Inglês <i className="bi bi-translate ms-2"></i>
                        </Nav.Link>
                        <Nav.Link href="/userComum/meuPerfil">
                        <i class='bx bx-user'></i>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <Offcanvas show={show} onHide={handleClose} className="mobile-menu" placement="end" style={{ width: '60%' }}>
                <Offcanvas.Header closeButton>
                    <div className="offcanvas-title text-dark">O EDUCADOR</div>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="flex-column nav-links-mobile align-items-end">
                        <Nav.Link href="#tela-inicial" className="text-dark">
                            Tela Inicial <i className="bi bi-house ms-2"></i>
                        </Nav.Link>
                        <div className="divider"></div>
                        <div className="topic mt-3">
                            Além do Livro <span className="dot purple"></span>
                        </div>
                        <div className="topic">
                            Além das Fronteiras <span className="dot red"></span>
                        </div>
                        <div className="topic">
                            Educação em Foco <span className="dot green"></span>
                        </div>
                        <div className="topic">
                            Monthly Dose of English <span className="dot blue"></span>
                        </div>
                        <div className="topic">
                            Palavreando <span className="dot yellow"></span>
                        </div>
                        <div className="topic">
                            Aventuras na História <span className="dot brown"></span>
                        </div>
                        <div className="topic">
                            Bioquímica em Ação <span className="dot navy"></span>
                        </div>
                        <div className="topic">
                            Tecnologia <span className="dot black"></span>
                        </div>
                        <div className="topic">
                            Aconteceu na Escola <span className="dot pink"></span>
                        </div>

                        <div className="divider"></div>

                        <div className="topic">
                            Fale Conosco <i className="bi bi-chat ms-2"></i>
                        </div>
                        <div className="topic">
                            Colunistas <i className="bi bi-book ms-2"></i>
                        </div>
                        <div className="topic">
                            Sobre Nós <i className="bi bi-people ms-2"></i>
                        </div>
                        <div className="topic">
                            Inglês <i className="bi bi-translate ms-2"></i>
                        </div>
                        <div className="line"></div>
                      
                        <Nav.Link href="#log-out" className="mt-auto text-dark log-out" style={{ fontSize: '23px' }}>
                            Log Out <i className="bi bi-door-open" style={{ fontSize: '30px', color: 'black' }}></i>
                        </Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default NavbarUserComum;
