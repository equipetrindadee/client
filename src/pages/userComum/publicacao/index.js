import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom';
import { db } from '../../../config/firebaseImgConfig'; // Importação do Firestore
import { doc, getDoc } from 'firebase/firestore';
import '../publicacao/publicacao.css';
import Commets from './comments';
import Artigo from './artigo';
import NavbarUserComum from '../../navBar/navBarUserComum/index.js';

function Publicacao() {
    const navigate = useNavigate();
    const [isLiked, setLiked] = useState(false); // Estado para controlar o coração
    const [author, setAuthor] = useState(''); // Estado para armazenar o nome do autor
    const [dataPostagem, setDataPostagem] = useState(''); // Estado para armazenar a data de postagem
    const articleId = localStorage.getItem('articleId');

    const navigateToLogin = () => {
        navigate('/login');
    };

    const toggleLike = () => {
        setLiked(!isLiked); // Alterna o estado do coração
    };
    
    console.log(articleId);  // Isso exibirá o ID do artigo armazenado

    // useEffect para buscar os dados do artigo no Firestore
    useEffect(() => {
        const fetchArticle = async () => {
            if (articleId) {
                const docRef = doc(db, 'jornal', articleId);  // Supondo que 'articles' seja a coleção de artigos
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    // Obtemos os dados do artigo e atualizamos o estado do autor
                    const articleData = docSnap.data();
                    setAuthor(articleData.author || 'Autor Desconhecido');  // Definimos o nome do autor
                } else {
                    console.log('Artigo não encontrado!');
                }
            }
        };
        
        fetchArticle();
    }, [articleId]); // O efeito será executado quando o articleId mudar

    // Função para formatar a data
    useEffect(() => {
        const fetchArticle = async () => {
            if (articleId) {
                const docRef = doc(db, 'jornal', articleId);  // Supondo que 'jornal' seja a coleção de artigos
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const articleData = docSnap.data();

                    // Atualizando o estado do autor e da data de postagem
                    setAuthor(articleData.author || 'Autor Desconhecido');
                    
                    // Converte o timestamp do Firestore para Date e armazena como string
                    const data = articleData.dataPostagem ? articleData.dataPostagem.toDate() : 'Data Desconhecida';
                    setDataPostagem(data.toLocaleString('pt-BR')); // Exibe a data no formato pt-BR
                } else {
                    console.log('Artigo não encontrado!');
                }
            }
        };

        fetchArticle();
    }, [articleId]); // O efeito será executado quando o articleId mudar


    // Recupera a imagem do banner armazenada no localStorage
    const bannerImage = localStorage.getItem('bannerImage');

    return (
        <div className='user_publicacao-container'>
            <header>
                <NavbarUserComum />
            </header>
            <div className="user_publicacao-banner">
                <div className='user_publicacao-banner-img'>
                    {/* Se a imagem estiver no localStorage, usa ela, caso contrário, usa a imagem padrão */}
                    <img 
                        className='user_publicacao-banner-img' 
                        src={bannerImage ? bannerImage : "../img/banner_rosa.svg"} 
                        alt="logo" 
                    />
                </div>
            </div>
            <div className='user_publicacao-conteiner'>
                <div className='user_publicacao-infos'>
                    {/* <img className='user_publicacao-img' src="../img/ft-perfilMateria.svg" alt="logo" /> */}
                    <i className="bx bxs-user-circle user_publicacao-img "></i>
                    <div className='user_publicacao-descricao'>
                        <h3>By {author}</h3> {/* Exibe o nome do autor dinamicamente */}
                        <p>Entrei no jornal para compartilhar as experiências incríveis da escola e inspirar meus colegas a se envolverem nas atividades.</p>
                    </div>
                </div>
                <div className='user_publicacao-date'>
                    {/* Exibe a data de postagem formatada */}
                    <p>Postado em {dataPostagem}</p>
                </div>
                <Artigo articleId={articleId} />
                <Commets />
            </div>
        </div>
    );
}

export default Publicacao;
