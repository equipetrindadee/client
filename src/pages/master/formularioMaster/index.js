import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Dropdown, ButtonGroup, DropdownButton } from "react-bootstrap";
import "./formularioMaster.css";

export const FormularioMaster = () => {
  const [image, setImage] = useState(null); 

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

  return (
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
            onClick={() => document.getElementById('profileImageInput').click()} 
          >
            <i className="bi bi-pencil-fill  formularioMaster-icon"></i> 
          </button>
          <input
            type="file"
            id="profileImageInput"
            className="form-control formularioMaster-file-input"
            accept="image/*"
            onChange={handleImageChange} 
          />
        </div>
      </div>

      <form className="formularioMaster-form">
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
        <div className="mb-3">
        <DropdownButton
         as={ButtonGroup}
         title="Selecione usuário"
         id="tipoUsuario"
         className="formularioMaster-dropdown-btn"
         >
        <Dropdown.Item className="formularioMaster-dropdown-item"><p>Aluno</p></Dropdown.Item>
        <Dropdown.Item className="formularioMaster-dropdown-item"><p>Professor</p></Dropdown.Item>
        <Dropdown.Item className="formularioMaster-dropdown-item"><p>administrador</p></Dropdown.Item>
        </DropdownButton>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary formularioMaster-submit-button">
            CADASTRAR
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioMaster;
