import React, { useState, useEffect } from 'react';
import './listarartigos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Rodape from "../Rodape";
import { useNavigate } from 'react-router-dom';
import NavbarUserComum from '../../navBar/navBarUserComum';
import { collection, getDocs } from 'firebase/firestore'; // Funções do Firestore
// import { db } from '../../../firebaseImgConfig'; // Import da configuração do Firestore
import { db } from '../../../config/firebaseImgConfig';

const ListarArtigo = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [title, setTitle] = useState('');
  const [lineColor, setLineColor] = useState('');
  const [searchText, setSearchText] = useState('');
  const [filteredArticles, setFilteredArticles] = useState([]); // Estado para armazenar os artigos filtrados

  const navigate = useNavigate();

  useEffect(() => {
    const ColumName = localStorage.getItem('ColumName'); // Obtendo o valor de ColumName do localStorage
    const colunaColor = localStorage.getItem('colunaColor'); // Obtendo o valor de colunaColor do localStorage

    setTitle(ColumName || 'Título padrão'); // Define o título ou um valor padrão
    setLineColor(colunaColor || '#0000FF'); // Define a cor ou um valor padrão (azul)

    // Função para buscar dados do Firestore
    const fetchArticles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'jornal')); // Obtendo dados da coleção 'jornal'
        const allArticles = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Mapeando os dados para um array

        // Filtrando os artigos onde o campo 'coluna' corresponde ao valor de ColumName
        const matchingArticles = allArticles.filter(article => article.coluna === ColumName);

        setFilteredArticles(matchingArticles); // Atualizando o estado com os artigos filtrados
      } catch (error) {
        console.error('Erro ao buscar artigos:', error);
      }
    };

    fetchArticles(); // Chamando a função para buscar os artigos
  }, []);

  const handleArrowClick = () => {
    navigate(-1);
  };

  const handleArticleClick = (articleId) => {
    // Armazenar o articleId no localStorage
    localStorage.setItem('articleId', articleId);
  
    // Navegar para a página de publicação do artigo
    navigate(`/userComum/publicacao`);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  // Filtrando os artigos pelo texto da barra de pesquisa
  const displayedArticles = filteredArticles.filter(article =>
    (article.title?.toLowerCase().includes(searchText.toLowerCase()) || '') ||
    (article.author?.toLowerCase().includes(searchText.toLowerCase()) || '') ||
    (article.texts?.[0]?.toLowerCase().includes(searchText.toLowerCase()) || '')
  );

  return (
    <div className="userComum-listarArtigo-container">
      <NavbarUserComum />

      <section className="userComum-listaArtigo-header">
        <img
          src="../img/mdi_arrow-up.svg"
          className="userComum-img-arrow"
          alt="Imagem arrow"
          onClick={handleArrowClick}
        />
        <h2>{title}</h2>
        <div
          className="userComum-line-blue"
          style={{ backgroundColor: lineColor }}
        ></div>

        <div className="userComum-search-bar-container">
          <input
            type="text"
            className="userComum-search-bar"
            placeholder="buscar"
            value={searchText}
            onChange={handleSearchChange}
            style={{ backgroundColor: lineColor }}
          />
          <img src="../img/search.svg" className="userComum-search-icon" alt="Ícone de lupa" />
        </div>
      </section>

      <section className="userComum-content-grid">
        <div className="userComum-content-left">
          <div className="userComum-listaArtigo-articles">
            <h3>ARTIGOS</h3>
            <div className="userComum-listaArtigo-articles-list">
              {displayedArticles.map((article) => (
                <article
                  key={article.id}
                  className="userComum-article"
                  onClick={() => handleArticleClick(article.id)}
                >
                  <img
                    src={article.image || '../img/imgartigos.svg'} // Exibe uma imagem padrão se não houver imagem no Firestore
                    className="userComum-img-character7"
                    alt="Imagem do artigo"
                  />
                  <div className="userComum-listarArtigo-conteudoartigo">
                    <h4>{article.title}</h4>
                    <p className="userComum-listarArtigo-articles-text">por {article.author}</p>
                    <p className=''>{article.texts?.[0] || 'Texto não disponível'}</p>
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
                src="../img/gallery.svg"
                className="userComum-img-gallery"
                alt="Imagem da galeria"
              />
            </div>
          </div>
        </div>
      </section>
      <Rodape />
    </div>
  );
};

export default ListarArtigo;
