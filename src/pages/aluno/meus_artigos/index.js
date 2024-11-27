// MainPage.js
import React from 'react';
import '../meus_artigos/meus_artigos.css'; // Inclua o arquivo CSS que você criará abaixo
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBaraluno from '../../navBar/navBarAluno';

function Meus_artigos() {
    return (
        <div className="container-fluid">
            <NavBaraluno />
            <div className="row">
                <main className="col-md-9 ms-sm-auto col-lg-10 px-4 main-content">
                    {/* Contêiner para o título e a barra de pesquisa */}
                    <div className="header-container">
                        <h1 className="page-title">MEUS ARTIGOS</h1>
                        <div className="search-bar-container">
                            <div className="search-wrapper">
                                <input
                                    type="text"
                                    className="form-control search-bar"
                                    placeholder="Pesquisar..."
                                />
                                <i className="bi bi-search search-icon"></i>
                            </div>
                        </div>
                    </div>
                    <div className="content-wrapper">
                        <div className="sections">
                            {[...Array(5)].map((_, index) => (
                                <div key={index} className="section mb-4">
                                    <img src={`https://via.placeholder.com/150`} alt="Imagem" className="section-img" />
                                    <div className="section-content">
                                        <h3>The new way of english {index + 1}</h3>
                                        <div className="profile">
                                            <img src={`https://via.placeholder.com/50`} alt="Perfil" className="profile-img" />
                                            <p>Ciclana dos Santos Luise  {index + 1}</p>
                                        </div>
                                        <h4>Há 4 dias</h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="right-side-container d-flex flex-column">
                            <div className="right-top-container mb-4">
                                <div className="right-top-content">
                                    <button className="btn btn-primary">Botão</button>
                                    <img src={`https://via.placeholder.com/100`} alt="Imagem" className="right-top-img" />
                                    <h4>Título da Imagem</h4>
                                </div>
                            </div>
                            <div className="right-bottom-container">
                                <div className="heart-container">
                                    <p>Texto importante</p>
                                    <span className="heart-icon">❤️</span>
                                </div>
                                <div className="info-box">
                                    <span className="info-box-title">Título</span>
                                    <i className="bi bi-info-circle info-icon"></i>
                                    <span className="info-box-number">123</span>
                                </div>
                                <div className="info-box">
                                    <span className="info-box-title">Título</span>
                                    <i className="bi bi-info-circle info-icon"></i>
                                    <span className="info-box-number">123</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Meus_artigos;
