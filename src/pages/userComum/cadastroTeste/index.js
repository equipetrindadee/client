import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../config/configApi'; 
import './cadastro.css';

const Cadastro = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);  // Estado para armazenar os usuários

  const navigate = useNavigate(); // Hook para redirecionamento

  // Função para validar os inputs
  const validateInputs = () => {
    if (!name || !email || !password || !confirmPassword) {
      setError("Por favor, preencha todos os campos obrigatórios.".toUpperCase());
      return false;
    }

    if (!email.includes("@")) {
      setError("Por favor, insira um email válido.");
      return false;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return false;
    }

    setError("");
    return true;
  };

  // Função para criar um novo usuário
  const criarUser = async (event) => {
    event.preventDefault(); // Prevenir o comportamento padrão de recarregar a página

    if (!validateInputs()) {
      return;
    }

    setLoading(true);  // Ativa o estado de carregamento

    try {
      // Preparar os dados a serem enviados para a API
      const userData = {
        name,
        email,
        password,
        acesso: "comum",  // Envia 'acesso' como "comum"
      };

      // Usando a instância 'api' para fazer a requisição POST
      const response = await api.post('/cadastroComum', userData);  // Envia para a rota '/formularioComum'
      
      // Verificando a resposta da API
      if (!response.data.error) {
        // Se não houver erro, limpar os campos e redirecionar
        console.log("Novo usuário criado com sucesso!");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setError("");  // Limpar mensagem de erro após criação bem-sucedida

        // Redirecionar para a página de login
        navigate("/login");
      } else {
        // Se houver erro, mostrar a mensagem
        setError(response.data.mensagem);
      }
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      // setError("Erro ao criar o usuário, tente novamente.");
    } finally {
      setLoading(false);  // Desativa o estado de carregamento após o processo
    }
  };

  return (
    <div>
      <div className="registrationFormContainerCadastroDeUsuario">
        <div className="registrationFormCadastroDeUsuario">
          <div className="cadastroUsuario-header">
            <div className="cadastroUsuarioHeader-content">
              <h1 className="cadastroUsuarioHeader-title">O EDUCADOR</h1>
              <h3 className="cadastroUsuarioHeader-subtitle">TE MANTER INFORMADO É NOSSA MISSÃO</h3>
            </div>
            <div className="cadastroUsuarioHeader-line"></div>
          </div>
          <form className="formsCadastroDeUsuario" onSubmit={criarUser}>
            <div className="formGroupCadastroDeUsuario">
              <label className="labelUserCadastroUsuarioPage">Nome</label>
              <input
                type="text"
                className="inputUserCadastroUsuarioPage"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="formGroupCadastroDeUsuario">
              <label className="labelUserCadastroUsuarioPage">Email</label>
              <input
                type="email"
                className="inputUserCadastroUsuarioPage"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="formGroupCadastroDeUsuario">
              <label className="labelUserCadastroUsuarioPage">Senha</label>
              <input
                type="password"
                className="inputUserCadastroUsuarioPage"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="formGroupCadastroDeUsuario">
              <label className="labelUserCadastroUsuarioPage">Confirmação de Senha</label>
              <input
                type="password"
                className="inputUserCadastroUsuarioPage"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div className="cadastroUsuarioNaoPossuiConta">
              <p className="cadastroUsuarioNaoPossuiContaH6">Já possui conta?</p>
              <a className="cadastroUsuarioNaoPossuiContaIrParaLogin" href="/Login">Ir para login</a>
            </div>

            {error && <p className="error-messageCadastroDeUsuario">{error}</p>}
            {loading && <p className="loading-message-cadastro">Conta criada com sucesso!</p>}

            <button type="submit" className="submitBtnCadastroDeUsuario">CRIAR</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
