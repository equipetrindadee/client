import React from 'react';
import "../headerListar/headerListar.css";

const HeaderListar = () => (
    <div className="master_listarUsuario-header">
        <h1>Lista dos Usuarios</h1>
        <div className="master_listarUsuario-header-searchFilter">
            <input type="text" placeholder="Search" />
            <button>
                <i className="fas fa-filter"></i> Filtro
            </button>
        </div>
        <div className="master_listarUsuario-header-title">O EDUCADOR</div>
    </div>
);

export default HeaderListar;
