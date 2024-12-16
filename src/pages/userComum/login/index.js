import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from '../../../config/configApi';

import { Context } from "../../../Context/AuthContext";
import Loading from "../../../loading/loading"
import '../login/login.css';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { singIn } = useContext(Context);
    const navigate = useNavigate();

    
    const handleLogin = async () => {
        setLoading(true);
        setError("");
    
        try {
            // Verificação do que está sendo enviado
            console.log("Email:", email);
            console.log("Password:", password);
    
            const response = await api.post('/login', { email, password });
            const { token, categoria, coluna, acesso } = response.data;
    
            // sessionStorage.setItem('token', token);
            // sessionStorage.setItem('UserCategoria', categoria);
            // sessionStorage.setItem('UserColuna', coluna);
            // sessionStorage.setItem('UserAcesso', acesso);
            
            localStorage.setItem('token', token);
            localStorage.setItem('UserCategoria', categoria);
            localStorage.setItem('UserColuna', coluna);
            localStorage.setItem('UserAcesso', acesso);
            api.defaults.headers.Authorization = `Bearer ${token}`;
            singIn(true);
    
            setTimeout(() => {
                // Redireciona para a página de acordo com a categoria
                if (categoria === 'professor') {
                    navigate("/dashP");
                } else if (categoria === 'aluno') {
                    navigate("/aluno/dasboardAluno");
                } else if (categoria === 'comum') {
                    navigate("/");
                }
            }, 1000);
        } catch (error) {
            // Exibe mensagem de erro do back-end
            setError(error.response ? error.response.data.mensagem : "Erro no Servidor");
            setLoading(false);
        }
    };

    const navigateToCriarConta = () => navigate('/cadastro');
    const navigateToPageInitial = () => navigate('/');

    return (
        <div>
            {loading ? (
                <div>
                    <Loading />
                </div>
            ) : (
                <div className='divLoginContainerPage'>
                    <div className="leftLogin">
                        <div className="loginPage-header">
                            <div className="loginPage-header-content">
                                <h1 className="loginPage-header-title">O EDUCADOR</h1>
                                <h3 className="loginPage-header-subtitle">TE MANTER INFORMADO É NOSSA MISSÃO</h3>
                            </div>
                            <div className="loginPage-header-line"></div>
                        </div>
                    </div>
                    <div className="rightLogin">
                        <h1 className='rightLoginSide-FormsTitle'>LOGIN</h1>
                        <form className='loginPage-contentRigth-forms'>
                            <label className='loginPage-contentRigth-label'>Email:</label>
                            <input 
                                className='loginPage-contentRigth-input' 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                            <label className='loginPage-contentRigth-label'>Senha:</label>
                            <input 
                                className='loginPage-contentRigth-input' 
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                            <div className='rightLogin-contentFooter-MoreInformation'>
                                <a onClick={ navigateToPageInitial} className='rightLogin-contentFooter-MoreInformationA'>Ir para o início</a>
                                <a onClick={navigateToCriarConta} className='rightLogin-contentFooter-MoreInformationA'>Cadastre-se</a>
                            </div>
                        </form>
                        
                        <button 
                            className='loginPage-contentRigth-botton' 
                            onClick={handleLogin}
                            disabled={loading}
                        > 
                            {loading ? "ENTRANDO..." : "ENTRAR"}
                        </button>
                        {error && <p className="error-messageCadastroDeUsuario">{error}</p>}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login;   
