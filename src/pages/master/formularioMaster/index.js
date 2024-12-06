import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Dropdown } from "react-bootstrap";
import SideNavBar from "../../navBar/navbarSidebarTest/index.js";
import "./formularioMaster.css";

export const FormularioMaster = () => {
  const [image, setImage] = useState(null);
  const [tipoUsuario, setTipoUsuario] = useState("Tipo de Usuário");
  const [colunista, setColunista] = useState("naoColunista");
  const [acessoProfessor, setAcessoProfessor] = useState("limitado");
  const [coluna, setColuna] = useState("");
  const [anoEscolar, setAnoEscolar] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleColunistaChange = (event) => {
    setColunista(event.target.value);
  };

  const handleProfessorAccessChange = (event) => {
    setAcessoProfessor(event.target.value);
  };

  return (
    <div className="formularioMaster-body">
      <SideNavBar />

      <div className="formularioMaster-container">
        <header className="formularioMaster-header">
          <h1 className="formularioMaster-title">Cadastrar</h1>
          <span className="formularioMaster-brand">O EDUCADOR</span>
        </header>

        <div className="formularioMaster-profile">
          <div className="formularioMaster-profile-img-wrapper">
            {image ? (
              <img
                src={image}
                alt="Foto de perfil"
                className="formularioMaster-profile-img"
              />
            ) : (
              <i className="bi bi-person-circle formularioMaster-profile-icon"></i>
            )}
            <button
              className="formularioMaster-edit-button formularioMaster-edit"
              onClick={() =>
                document.getElementById("profileImageInput").click()
              }
            >
              <i className="bi bi-pencil-fill formularioMaster-icon"></i>
            </button>
            <input
              type="file"
              id="profileImageInput"
              className="formularioMaster-file-input"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </div>

        <form className="formularioMaster-form">
          {/* Inputs de Nome, Email, Senha */}
          <div className="mb-3">
            <label htmlFor="nome" className="formularioMaster-label">Nome</label>
            <input
              type="text"
              className="form-control formularioMaster-input"
              id="nome"
              placeholder=""
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="formularioMaster-label">Email</label>
            <input
              type="email"
              className="form-control formularioMaster-input"
              id="email"
              placeholder=""
            />
          </div>
          <div className="row g-3 mb-3">
            <div className="col">
              <label htmlFor="senha" className="formularioMaster-label">Senha</label>
              <input
                type="password"
                className="form-control formularioMaster-input"
                id="senha"
                placeholder=""
              />
            </div>
            <div className="col">
              <label htmlFor="confirmSenha" className="formularioMaster-label">Confirmar senha</label>
              <input
                type="password"
                className="form-control formularioMaster-input"
                id="confirmSenha"
                placeholder=""
              />
            </div>
          </div>

          {/* Dropdowns */}
          <div className="w-100 mb-3">
            <Dropdown onSelect={(eventKey) => setTipoUsuario(eventKey)}>
              <Dropdown.Toggle variant="success" className="FormularioMaster-dropdown-custom" id="dropdown-basic">
                {tipoUsuario}
              </Dropdown.Toggle>
              <Dropdown.Menu className="formularioMaster-dropdown-Menu">
                <Dropdown.Item eventKey="Administrador" className="FormularioMaster-dropdown-Item">
                  <p>Administrador</p>
                </Dropdown.Item>
                <Dropdown.Item eventKey="Professor" className="FormularioMaster-dropdown-Item">
                  <p>Professor</p>
                </Dropdown.Item>
                <Dropdown.Item eventKey="Aluno" className="FormularioMaster-dropdown-Item">
                  <p>Aluno</p>
                </Dropdown.Item>
                <Dropdown.Item eventKey="Comum" className="FormularioMaster-dropdown-Item">
                  <p>Comum</p>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          {/* Dropdown de Coluna */}
          <div className="w-100 mb-3">
            <Dropdown onSelect={(eventKey) => setColuna(eventKey)}>
              <Dropdown.Toggle variant="success" className="FormularioMaster-dropdown-custom" id="dropdown-basic">
                {coluna || "Coluna"}
              </Dropdown.Toggle>
              <Dropdown.Menu className="formularioMaster-dropdown-Menu">
                <Dropdown.Item eventKey="Coluna 1" className="FormularioMaster-dropdown-Item">
                  <p>Coluna 1</p>
                </Dropdown.Item>
                <Dropdown.Item eventKey="Coluna 2" className="FormularioMaster-dropdown-Item">
                  <p>Coluna 2</p>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          {/* Dropdown de Ano Escolar */}
          <div className="w-100 mb-3">
            <Dropdown onSelect={(eventKey) => setAnoEscolar(eventKey)}>
              <Dropdown.Toggle variant="success" className="FormularioMaster-dropdown-custom" id="dropdown-basic">
                {anoEscolar || "Ano Escolar"}
              </Dropdown.Toggle>
              <Dropdown.Menu className="formularioMaster-dropdown-Menu">
                <Dropdown.Item eventKey="1º Ano" className="FormularioMaster-dropdown-Item">
                  <p>1º Ano</p>
                </Dropdown.Item>
                <Dropdown.Item eventKey="2º Ano" className="FormularioMaster-dropdown-Item">
                  <p>2º Ano</p>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          {/* Mensagens e opções condicionais */}
          {tipoUsuario === "Administrador" && (
            <p className="formularioMaster-administrador-msg text-danger">
              *O usuário administrador terá acesso a todos os recursos do site, e da parte de administração do mesmo.
            </p>
          )}

          {tipoUsuario === "Professor" && (
            <div className="d-flex justify-content-start align-items-center mb-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="professorAccess"
                  value="ilimitado"
                  checked={acessoProfessor === "ilimitado"}
                  onChange={handleProfessorAccessChange}
                />
                <label className="form-check-label formularioMaster-Ilimitado"><p>Acesso Ilimitado</p></label>
              </div>
              <div className="form-check ms-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="professorAccess"
                  value="limitado"
                  checked={acessoProfessor === "limitado"}
                  onChange={handleProfessorAccessChange}
                />
                <label className="form-check-label  formularioMaster-Limitado"><p>Acesso Limitado</p></label>
              </div>
            </div>
          )}

          {tipoUsuario === "Aluno" && (
            <div className="d-flex justify-content-start align-items-center mb-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="colunista"
                  value="colunista"
                  checked={colunista === "colunista"}
                  onChange={handleColunistaChange}
                />
                <label className="form-check-label formularioMaster-Colunista"><p>Colunista</p></label>
              </div>
              <div className="form-check ms-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="colunista"
                  value="naoColunista"
                  checked={colunista === "naoColunista"}
                  onChange={handleColunistaChange}
                />
                <label className="form-check-label fomularioMaster-Nopcolunista"><p>Não colunista</p></label>
              </div>
            </div>
          )}

          {/* Botão Cadastrar */}
          <div className="text-center">
            <button type="submit" className="btn btn-primary formularioMaster-submit-button">
              CADASTRAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioMaster;
