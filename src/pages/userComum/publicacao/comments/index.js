import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../comments/comments.css"

function Commets() {
    const navigate = useNavigate();
    const commentsData = [
        { name: "Ciclano Beltrano de Sá", comment: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable." },
        { name: "Fulano de Tal", comment: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable." },
        { name: "Beltrano de Cicrano", comment: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable." },
    ];
    const [isLiked, setLiked] = useState(false); // Estado para controlar o coração

    const [likedComments, setLikedComments] = useState(Array(commentsData.length).fill(false));

    const handleLikeClick = (index) => {
        setLikedComments((prev) => {
            const updatedLikes = [...prev];
            updatedLikes[index] = !updatedLikes[index]; // Alterna o estado apenas para o comentário clicado
            return updatedLikes;
        });
    };
    return (
        <div>
            <div className="container-fluid aluno_chatAluno-comments-container">
                <div class="user_publicacao-comments-line">
                    <div class="user_publicacao-comments-text">COMENTÁRIOS</div>
                </div>
            </div>

            <div className="row user_publicacao-comments-container">
                {/* Coluna da lista de comentários */}
                <div className="col-lg-8 col-md-7">
                    <div className="input-group mb-3 user_publicacao-searchbar">
                        <input
                            type="text"
                            className="form-control user_publicacao-search"
                            placeholder="Buscar comentário..."
                        />
                        <div class="input-group-append user_publicacao-searchBar-button">
                            <button class="btn " type="button">
                                <i class="bi bi-search"></i>
                            </button>
                        </div>
                    </div>

                    {/* Renderizar lista de comentários */}
                    {commentsData.map((comment, index) => (
                        <div key={index} className="card mb-3 user_publicacao-comments-card">
                            <div className="card-body d-flex user_publicacao-comments-card-body">
                                <img
                                    src="../img/ft-perfilMateria.svg"
                                    alt="Profile"
                                    className="rounded-circle me-3  user_publicacao-comments-img"
                                />
                                <div className="flex-grow-1">
                                    <h5 className="user_publicacao-comments-name">{comment.name}</h5>
                                    <p className="user_publicacao-comments-comentario">{comment.comment}</p>
                                    <a href="#" className="user_publicacao-comments-link">Ver respostas</a>
                                </div>
                                <div className="d-flex align-items-start">
                                    <button type="button" className="btn" onClick={() => handleLikeClick(index)}>
                                        <i className={`bi ${likedComments[index] ? 'bi-heart-fill text-danger' : 'bi-heart'} aluno_chatAluno-heart`}></i>
                                    </button>


                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Coluna para adicionar comentário */}
                <div className="col-lg-4 col-md-5">
                    <div className="card user_publicacao-add-comment-card">
                        <div className='user_publicacao-add-comment-card-header'>
                            <h4>ADICIONAR COMENTÁRIO</h4>
                            <i class="bi bi-chat"></i>
                        </div>
                        <div className="user_publicacao-add-comment-card-body">
                        
                        </div>
                        <div className=" user_publicacao-add-comment-card-footer ">
                            <div className="input-group user_publicacao-add-comment-card-footer-content">
                                <div>
                                    <input
                                        type="text"
                                        className="form-control user_publicacao-add-comment-card-footer-input"
                                        placeholder="Escreva aqui"
                                    />
                                </div>

                                <div class="input-group-append user_publicacao-add-comment-card-footer-button">
                                    <button class="btn " type="button">
                                        <i class="bi bi-arrow-right-circle-fill"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Commets