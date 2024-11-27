import React, { useState } from 'react';
import './listarartigos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarUserComum from "../../navBar/navBarUserComum/index.js";
import Rodape from "../ListarArtigos/Rodape/index.js";

const ListarArtigo = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  return (
    <div className="userComum-listarArtigo-container">
      {/* Navbar com o ícone de menu */}
      <NavbarUserComum />
      
      <section className="userComum-listaArtigo-header">
        <img 
          src="../img/menu.svg" 
          className="userComum-img-menu" 
          alt="Imagem do menu" 
          onClick={handleShow}
        />
        <h2>Monthly dose of English</h2>
        <div className="userComum-line-blue"></div>

        {/* Barra de Pesquisa com ícone de Lupa */}
        <div className="userComum-search-bar-container">
          <input 
            type="text" 
            className="userComum-search-bar" 
            placeholder="buscar" 
          />
          <img src="../img/search.svg" className="userComum-search-icon" alt="Ícone de lupa" />
        </div>
      </section>

      {/* Conteúdo principal */}
      <section className="userComum-content-grid">
        <div className="userComum-content-left">
          {/* Artigos */}
          <div className="userComum-listaArtigo-articles">
            <h3>ARTIGOS</h3>
            <div className="userComum-listaArtigo-articles-list">
              {[...Array(5)].map((_, index) => (
                <article key={index} className="userComum-article">
                  <img src="../img/imgartigos.svg" className="userComum-img-character7" alt="Imagem do artigo" />
                  <div className="userComum-listarArtigo-conteudoartigo">
                    <h4>Where does it come from?</h4>
                    <p className="userComum-listarArtigo-articles-text">por Nome do autor</p>
                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                    <p>Há 2 dias</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Galeria e Mais Lidos */}
        <div className="userComum-content-right">
          {/* Galeria */}
          <div className="userComum-listarArtigo-gallery-section">
            <h3>GALERIA</h3>
            <div className="userComum-listarArtigo-gallery">
              <img src="../img/gallery.svg" className="userComum-img-gallery" alt="Imagem da gallery" />
            </div>
          </div>

          {/* Mais Lidos */}
          <div className="userComum-listarArtigos-popular-section">
            <h3>MAIS LIDOS</h3>
            <ul className="userComum-listaArtigo-popular-list">
              {[...Array(3)].map((_, index) => (
                <li key={index} className="userComum-listaArtigo-popular-item">
                  <div className="userComum-listarArtigo-popular-item-content">
                    <p className="userComum-listarArtigo-popular-item-text">Quem executa o bloqueio do X caso Moraes ordene a...</p>
                    <img src="../img/popularlist.svg" className="userComum-serComum-listarArtigo-img-popular-list" alt="Imagem popular-list" />
                  </div>
                  <p className="userComum-listarArtigo-author-text">por Nome do autor</p>
                  <div className="userComum-listarArtigo-line-separator"></div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <Rodape />
    </div>
  );
};

export default ListarArtigo;
