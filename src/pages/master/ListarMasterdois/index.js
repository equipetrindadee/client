import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../../professor/dashboardProfessor/dashboardProfessor.css";
import "./estilo.css";   


const ListarMasterdois = () => {
    const usuarios = [
      { id: 1, nome: "miri", email: "pedro@gmail.com" },
      { id: 2, nome: "john", email: "ana@gmail.com" },
      { id: 3, nome: "felipe", email: "atário@gmail.com" },
      { id: 4, nome: "ana", email: "ana@gmail.com" },
      { id: 5, nome: "vini", email: "trouxxa@gmail.com" },
      { id: 6, nome: "guga", email: "Bruno@gmail.com" },
    ];
  
    return (
      <div className="container">
        <header className="header">
          <h1>Lista dos Usuários</h1>
          <div className="search-filter">
            <button className="search-btn">
              <i className="bi bi-search"></i>
            </button>
            <button className="filter-btn">
              <i className="bi bi-funnel"></i> Filtro
            </button>
          </div>
        </header>
  
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Visualizar</th>
              <th>Editar</th>
              <th>Mudar senha</th>
              <th>Deletar</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nome}</td>
                <td>{user.email}</td>
                <td>
                  <button className="icon-btn">
                    <i className="bi bi-eye"></i>
                  </button>
                </td>
                <td>
                  <button className="icon-btn">
                    <i className="bi bi-pencil"></i>
                  </button>
                </td>
                <td>
                  <button className="icon-btn">
                    <i className="bi bi-key"></i>
                  </button>
                </td>
                <td>
                  <button className="icon-btn">
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  
  

export default ListarMasterdois;

