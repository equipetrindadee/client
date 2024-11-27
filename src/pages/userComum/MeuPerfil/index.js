import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavbarUserComum from "../../navBar/navBarUserComum/index.js";

import './meuperfil.css';

// No componente CommentCard, modifique o JSX para incluir um div ao redor de name e date
const CommentCard = ({ name, date, text, likes, responses }) => (
    <div className="usercomum_meuperfil-comment-card">
        <div className="usercomum_meuperfil-comment-header">
            <strong>{name}</strong>
            <span className="usercomum_meuperfil-comment-date">{date}</span>
        </div>
        <p>{text}</p>
        <div className="usercomum_meuperfil-comment-actions">
            <span>
                <i className="bi bi-heart"> </i><p className='usercomum_meuperfil-comment-actions-likes'>{likes} Curtidas</p>
            </span>
            <span>
                <i className="bi bi-chat-dots"></i><p className='usercomum_meuperfil-comment-actions-responses'>{responses} Respostas</p>
            </span>
            <a href="#">Ver matéria</a>
        </div>
    </div>
);


const MeuPerfil = () => {
    const [show, setShow] = useState(false);
    const [activeTab, setActiveTab] = useState("informacoes");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [name, setName] = useState("laraSla");
    const [email, setEmail] = useState("lara@gmail.com");
    const [phone, setPhone] = useState("(11) 24123-4992");
    const [inputName, setInputName] = useState(name);
    const [inputEmail, setInputEmail] = useState(email);
    const [inputPhone, setInputPhone] = useState(phone);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [profileImage, setProfileImage] = useState("/img/profileee.svg"); 

    const handleSaveChangess = () => {
        setName(inputName);
        setEmail(inputEmail);
        setPhone(inputPhone);
        setShowConfirmation(true);
    };

    const handleSaveChanges = () => {
        setShowConfirmation(true); // Exibe a seção de confirmação
    };

    const comments = [
        {
            name: 'IaraSla oque Gomes',
            date: '22/06',
            text: 'Olá, gostaria de deixar meu feedback sobre o artigo "As Novas Tendências do Mercado Financeiro"...',
            likes: 2,
            responses: 4,
        },
        {
            name: 'Carlos Silva',
            date: '18/06',
            text: 'Achei o artigo muito interessante, realmente as novas tendências estão surpreendendo...',
            likes: 5,
            responses: 2,
        },
        {
            name: 'Ana Paula',
            date: '16/06',
            text: 'Concordo com os pontos levantados no texto, especialmente na parte sobre investimentos...',
            likes: 3,
            responses: 1,
        },

    ];

    const handleNo = () => {
        setShowConfirmation(false);
    };

    useEffect(() => {
        document.body.classList.add('no-scroll');
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, []);

    const closeConfirmation = () => {
        setShowConfirmation(false); // Fecha a mensagem de confirmação
    };

    const handleYes = () => {
        setName(inputName);
        setEmail(inputEmail);
        setPhone(inputPhone);
        setShowConfirmation(false);
        setShowSuccessMessage(true);
    };

    const handleOk = () => {
        setShowSuccessMessage(false);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setProfileImage(imageURL); // Atualiza a imagem de perfil
        }
    };

    return (
        <>
           <div>
            <NavbarUserComum/>
           </div>

            

            <div className="usercomum_meuperfil-header-background"></div>

            <div className="usercomum_meuperfil-profile-container">
                <div className="usercomum_meuperfil-profile-sidebar">
                    <div className="profile-picture-container">
                        <img src={profileImage} alt="Profile" />
                        <button className="edit-icon" onClick={() => document.getElementById('fileInput').click()}>
                            <i className="bi bi-pencil"></i>
                        </button>
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: 'none' }}
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                    <p><i className="bi bi-person-fill"></i> {name}</p>
                    <p><i className="bi bi-envelope"></i> {email}</p>
                    <p><i className="bi bi-telephone-fill"></i> {phone}</p>
                    <p><i className="bi bi-clock"></i> desde 2011</p>
                    <p><i className="bi bi-heart-fill"></i> 21 curtidas</p>
                    <button className="log-out-btn">Log Out</button>
                </div>

                <div className="usercomum_meuperfil-profile-content">
                    <div className="usercomum_meuperfil-tabs">
                        <button
                            className={`usercomum_meuperfil-tab-btn ${activeTab === "informacoes" ? "active" : ""}`}
                            onClick={() => setActiveTab("informacoes")}
                        >
                            Informações
                        </button>
                        <button
                            className={`usercomum_meuperfil-tab-btn ${activeTab === "comentarios" ? "active" : ""}`}
                            onClick={() => setActiveTab("comentarios")}
                        >
                            Comentários
                        </button>
                    </div>

                    {activeTab === "informacoes" ? (
                        <>
                            <h2>MEU PERFIL</h2>
                            <form className="usercomum_meuperfil-profile-form">
                                <label>Nome Completo</label>
                                <input
                                    type="text"
                                    value={inputName}
                                    onChange={(e) => setInputName(e.target.value)}
                                />
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={inputEmail}
                                    onChange={(e) => setInputEmail(e.target.value)}
                                />
                                <label>Telefone</label>
                                <input
                                    type="tel"
                                    value={inputPhone}
                                    onChange={(e) => setInputPhone(e.target.value)}
                                />
                                <button type="button" onClick={handleSaveChangess} className="save-btn">
                                    Salvar Alterações
                                </button>
                            </form>

                            {showConfirmation && (
                                <div className="usercomum_meuperfil-overlay">
                                    <div className="usercomum_meuperfil-confirmation-section">
                                        <p>Tem certeza?</p>
                                        <button className="no-btn" onClick={handleNo}>NÃO</button>
                                        <button className="yes-btn" onClick={handleYes}>SIM</button>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="usercomum_meuperfil-section">
                            <h1>COMENTÁRIOS</h1>
                            <div className="usercomum_meuperfil-container">

                                <div className="usercomum_meuperfil-comments-section">

                                    {comments.map((comment, index) => (
                                        <CommentCard key={index} {...comment} />
                                    ))}
                                </div>
                                <div className="usercomum_meuperfil-liked-section">
                                    <h2>Matérias Curtidas</h2>
                                    <p>Nenhuma Coluna selecionada</p>
                                    
                                    <div className="usercomum_meuperfil-sad-icon"><i class="bi bi-emoji-frown"></i></div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </>
    );
};

export default MeuPerfil;
