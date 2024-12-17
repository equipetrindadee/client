import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Importando jwtDecode
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import NavbarUserComum from "../../navBar/navBarUserComum/index.js";
import './meuperfil.css';

const MeuPerfil = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("informacoes");
    const [name, setName] = useState(""); // Armazenar o nome do usuário
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [inputName, setInputName] = useState(""); // Para editar o nome
    const [inputEmail, setInputEmail] = useState(""); // Para editar o email
    const [inputPhone, setInputPhone] = useState(""); // Para editar o telefone
    const [profileImage, setProfileImage] = useState("/img/percy.svg");

    const handleLogout = () => {
        // Limpar tudo do sessionStorage
        sessionStorage.clear();
        // Redireciona para a página de login
        navigate('/login');
    };

    useEffect(() => {
        const token = localStorage.getItem("token"); // Pega o token do localStorage
        if (token) {
            try {
                
                const decodedToken = jwtDecode(token); // Decodifica o token
                // A partir do token decodificado, preenche as informações do perfil
                setName(decodedToken.name || "Pedro");
                setEmail(decodedToken.email);
                setPhone(decodedToken.phone || "11 936587245");
                // Inicializa os campos de input com os dados do token
                setInputName(decodedToken.name);
                setInputEmail(decodedToken.email);
                setInputPhone(decodedToken.phone);
            } catch (error) {
                console.error("Erro ao decodificar o token", error);
            }
        }
    }, []);

    const handleSaveChangess = () => {
        setName(inputName); // Atualiza o nome do usuário
        setEmail(inputEmail); // Atualiza o email
        setPhone(inputPhone); // Atualiza o telefone
        // Aqui você pode adicionar lógica para salvar essas alterações (ex: em um backend ou no localStorage)
    };

    return (
        <>
            <div>
                <NavbarUserComum />
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
                            onChange={(e) => setProfileImage(URL.createObjectURL(e.target.files[0]))}
                        />
                    </div>
                    <p><i className="bi bi-person-fill"></i>{name}</p> {/* Exibe o nome do usuário */}
                    <p><i className="bi bi-envelope"></i>{email}</p> {/* Exibe o email do usuário */}
                    <button className="log-out-btn" onClick={handleLogout}>Log Out</button>
                </div>
                <div className="usercomum_meuperfil-profile-content">
                    <div className="usercomum_meuperfil-tabs">
                        <button
                            className={`usercomum_meuperfil-tab-btn ${activeTab === "informacoes" ? "active" : ""}`}
                            onClick={() => setActiveTab("informacoes")}
                        >
                            INFORMAÇÕES
                        </button>
                    </div>

                    {activeTab === "informacoes" ? (
                        <>
                            <h2>MEU PERFIL</h2>
                            <form className="usercomum_meuperfil-profile-form">
                                <label>Nome Completo</label>
                                <input
                                    type="text"
                                    value={name}  // Preenche o campo com o nome
                                    onChange={(e) => setInputName(e.target.value)}
                                />
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={inputEmail}  // Preenche o campo com o e-mail
                                    onChange={(e) => setInputEmail(e.target.value)}
                                />
                                <label>Telefone</label>
                                <input
                                    type="tel"
                                    value={phone}  // Preenche o campo com o telefone
                                    onChange={(e) => setInputPhone(e.target.value)}
                                />
                                
                            </form>
                        </>
                    ) : null}
                </div>
            </div>
        </>
    );
};

export default MeuPerfil;
