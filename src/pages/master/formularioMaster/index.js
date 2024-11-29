import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Dropdown, ButtonGroup, DropdownButton } from "react-bootstrap";
import "./formularioMaster.css";

export const FormularioMaster = () => {
  const [selectedType, setSelectedType] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  return (
    <div className="formularioMaster">
      <h1 className="formularioMaster__title">Cadastrar</h1>

      {/* Imagem de perfil */}
      <div className="formularioMaster__profile-image">
        <img src="https://via.placeholder.com/120" alt="Profile" />
        <button className="formularioMaster__edit-button">
          <i className="bi bi-pencil"></i>
        </button>
      </div>

      {/* Campos do formulário */}
      <div className="formularioMaster__input-group">
        <input type="text" className="form-control" placeholder="Nome" />
      </div>

      <div className="formularioMaster__input-group">
        <input type="email" className="form-control" placeholder="Email" />
      </div>

      <div className="formularioMaster__input-group">
        <input
          type="password"
          className="form-control"
          placeholder="Senha"
        />
        <input
          type="password"
          className="form-control"
          placeholder="Confirmar senha"
        />
      </div>

      {/* Dropdown para Tipo de usuário */}
      <div className="formularioMaster__input-group">
        <Dropdown as={ButtonGroup} onSelect={(e) => setSelectedType(e)}>
          <DropdownButton
            variant="secondary"
            title={selectedType || "Tipo de usuário"}
            id="dropdown-type"
          >
            <Dropdown.Item eventKey="Educador">Educador</Dropdown.Item>
            <Dropdown.Item eventKey="Aluno">Aluno</Dropdown.Item>
            <Dropdown.Item eventKey="Admin">Admin</Dropdown.Item>
          </DropdownButton>
        </Dropdown>
      </div>

      {/* Dropdown para Colunas */}
      <div className="formularioMaster__input-group">
        <Dropdown as={ButtonGroup} onSelect={(e) => setSelectedColumn(e)}>
          <DropdownButton
            variant="secondary"
            title={selectedColumn || "Colunas"}
            id="dropdown-columns"
          >
            <Dropdown.Item eventKey="1">1ª Coluna</Dropdown.Item>
            <Dropdown.Item eventKey="2">2ª Coluna</Dropdown.Item>
            <Dropdown.Item eventKey="3">3ª Coluna</Dropdown.Item>
          </DropdownButton>
        </Dropdown>
      </div>

      {/* Dropdown para Ano Escolar */}
      <div className="formularioMaster__input-group">
        <Dropdown as={ButtonGroup} onSelect={(e) => setSelectedYear(e)}>
          <DropdownButton
            variant="secondary"
            title={selectedYear || "Ano escolar"}
            id="dropdown-year"
          >
            <Dropdown.Item eventKey="2024">2024</Dropdown.Item>
            <Dropdown.Item eventKey="2025">2025</Dropdown.Item>
            <Dropdown.Item eventKey="2026">2026</Dropdown.Item>
          </DropdownButton>
        </Dropdown>
      </div>

      {/* Botão para cadastrar */}
      <div className="formularioMaster__input-group">
        <button className="btn btn-primary formularioMaster__submit-btn">
          Cadastrar
        </button>
      </div>
    </div>
  );
};

export default FormularioMaster;