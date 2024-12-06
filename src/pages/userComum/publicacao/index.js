import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../publicacao/publicacao.css';
import Commets from './comments';
import Artigo from './artigo';
/* import NavbarUserComum from "../../navBar/navBarUserComum/index.js" */

function Publicacao() {
    const navigate = useNavigate();


    const [isLiked, setLiked] = useState(false); // Estado para controlar o coração


    const navigateToLogin = () => {
        navigate('/login');
    };

    const toggleLike = () => {
        setLiked(!isLiked); // Alterna o estado do coração
    };



    return (
        <div className='user_publicacao-container'>
            <header>
{/*                 <NavbarUserComum/> */}
            </header>
            <div className="user_publicacao-banner">
                <div className='user_publicacao-banner-img'>
                    <img className='user_publicacao-banner-img' src="../img/banner_rosa.svg" alt="logo" />
                </div>
            </div>
            <div className='user_publicacao-conteiner'>
                <div className='user_publicacao-infos'>
                    <img className='user_publicacao-img' src="../img/ft-perfilMateria.svg" alt="logo" />
                    <div className='user_publicacao-descricao'>
                        <h3>By Catarina Ribeiro</h3>
                        <p>Entrei no jornal para compartilhar as experiências incríveis da escola e inspirar meus colegas a se envolverem nas atividades.</p>
                    </div>
                    <div className='user_publicacao-comentario'>
                        <button type="button" className="userPubli" >
                        <h4>10</h4>
                        <p className="d-none d-md-block">Comentários</p>
                        <i className="bi bi-chat"></i>
                        </button>
                    </div>
                    <div className='user_publicacao-like'>
                        <button type="button" className="btn" onClick={toggleLike}>
                            <h4>15</h4>
                            <p className="d-none d-md-block">Curtidas</p>
                            <i className={`bi ${isLiked ? 'bi-heart-fill text-danger' : 'bi-heart'}`}></i>
                        </button>
                    </div>
                </div>
                <div className='user_publicacao-date'>
                    <p>Aug. 30, 2024, 5:04 a.m. ET</p>
                </div>
                <div className='user_publicacao-InfoAudio'>
                    <div className='user_publicacao-audio'>
                        <i className="bi bi-play-fill"></i>
                        <hr />
                    </div>
                    <p>Clique para ouvir a máteria em áudio </p>
                </div>
                <Artigo />



                <Commets />
            </div>




         
        </div>


    );
}

export default Publicacao;
