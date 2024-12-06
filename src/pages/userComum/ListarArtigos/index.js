import React, { useState } from 'react';
import './listarartigos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
/* import NavbarUserComum from "../../navBar/navBarUserComum/index.js"; */
import Rodape from "../Rodape";
import { useNavigate } from 'react-router-dom'; // Importando o useNavigate

const ListarArtigo = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate(); // Criando o hook de navegação

  const images = [
    "../img/gallery.svg",
    "../img/imgartigos.svg",
    "../img/gallery.svg"
  ];

  // Dados dos artigos com títulos e textos originais
  const artigos = [
    {
      id: 1,
      title: "Where does it come from?",
      author: "Nome do autor",
      description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      date: "Há 2 dias",
      image: "../img/imgartigos.svg"
    },
    {
      id: 2,
      title: "Where does it come from?",
      author: "Nome do autor",
      description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      date: "Há 2 dias",
      image: "../img/imgartigos.svg"
    },
    {
      id: 3,
      title: "Where does it come from?",
      author: "Nome do autor",
      description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      date: "Há 2 dias",
      image: "../img/imgartigos.svg"
    },
    {
      id: 4,
      title: "Where does it come from?",
      author: "Nome do autor",
      description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      date: "Há 2 dias",
      image: "../img/imgartigos.svg"
    },
    {
      id: 5,
      title: "Where does it come from?",
      author: "Nome do autor",
      description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      date: "Há 2 dias",
      image: "../img/imgartigos.svg"
    }
  ];

  // Lista de artigos populares (mais lidos)
  const popularArticles = [
    {
      id: 1,
      title: "Quem executa o bloqueio do X caso Moraes ordene a...",
      author: "Nome do autor",
      image: "../img/popularlist.svg"
    },
    {
      id: 2,
      title: "Quem executa o bloqueio do X caso Moraes ordene a...",
      author: "Nome do autor",
      image: "../img/popularlist.svg"
    },
    {
      id: 3,
      title: "Quem executa o bloqueio do X caso Moraes ordene a...",
      author: "Nome do autor",
      image: "../img/popularlist.svg"
    }
  ];

  // Função que lida com o clique no ícone de seta para voltar
  const handleArrowClick = () => {
    navigate(-1); // Isso irá levar o usuário à página anterior
  };

  // Função para navegar para o artigo específico
  const handleArticleClick = (articleId) => {
    navigate(`/artigo/${articleId}`); // Redireciona para a página do artigo
  };

  // Função para navegar para o artigo popular específico
  const handlePopularArticleClick = (articleId) => {
    navigate(`/artigo/${articleId}`); // Redireciona para a página do artigo popular
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="userComum-listarArtigo-container">
{/*       <NavbarUserComum /> */}
      
      <section className="userComum-listaArtigo-header">
        {/* Seta que chama a função handleArrowClick */}
        <img 
          src="../img/mdi_arrow-up.svg" 
          className="userComum-img-arrow" 
          alt="Imagem arrow" 
          onClick={handleArrowClick} // Chama a função ao clicar na seta
        />
        <h2>Monthly dose of English</h2>
        <div className="userComum-line-blue"></div>

        <div className="userComum-search-bar-container">
          <input 
            type="text" 
            className="userComum-search-bar" 
            placeholder="buscar" 
          />
          <img src="../img/search.svg" className="userComum-search-icon" alt="Ícone de lupa" />
        </div>
      </section>

      <section className="userComum-content-grid">
        <div className="userComum-content-left">
          <div className="userComum-listaArtigo-articles">
            <h3>ARTIGOS</h3>
            <div className="userComum-listaArtigo-articles-list">
              {artigos.map((article) => (
                <article 
                  key={article.id} 
                  className="userComum-article" 
                  onClick={() => handleArticleClick(article.id)} // Passa o ID do artigo
                >
                  <img 
                    src={article.image} 
                    className="userComum-img-character7" 
                    alt="Imagem do artigo" 
                  />
                  <div className="userComum-listarArtigo-conteudoartigo">
                    <h4>{article.title}</h4>
                    <p className="userComum-listarArtigo-articles-text">por {article.author}</p>
                    <p>{article.description}</p>
                    <p>{article.date}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="userComum-content-right">
          <div className="userComum-listarArtigo-gallery-section">
            <h3>GALERIA</h3>
            <div className="userComum-listarArtigo-gallery">
              <img 
                src={images[currentIndex]} 
                className="userComum-img-gallery" 
                alt="Imagem da gallery"
              />
            </div>

            {/* Dots for navigation */}
            <div className="userComum-gallery-dots">
              {images.map((_, index) => (
                <span 
                  key={index} 
                  className={`userComum-dot ${currentIndex === index ? 'active' : ''}`} 
                  onClick={() => handleDotClick(index)} 
                />
              ))}
            </div>
          </div>

          <div className="userComum-listarArtigos-popular-section">
            <h3>MAIS LIDOS</h3>
            <ul className="userComum-listaArtigo-popular-list">
              {popularArticles.map((article) => (
                <li key={article.id} className="userComum-listaArtigo-popular-item" onClick={() => handlePopularArticleClick(article.id)}>
                  <div className="userComum-listarArtigo-popular-item-content">
                    <p className="userComum-listarArtigo-popular-item-text">{article.title}</p>
                    <img src={article.image} className="userComum-serComum-listarArtigo-img-popular-list" alt="Imagem popular-list" />
                  </div>
                  <p className="userComum-listarArtigo-author-text">por {article.author}</p>
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
