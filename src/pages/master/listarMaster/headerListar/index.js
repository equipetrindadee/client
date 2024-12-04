import React from 'react';
import "../headerListar/headerListar.css";
import FilterButtonListarMaster from '../tableListar/buttonFiltrarListar';

const HeaderListar = ({ onFilterChange }) => (
    <div className="master_listarUsuario-header">
        <h1>Lista dos Usuarios</h1>
        <div className="master_listarUsuario-header-searchFilter">
            <input type="text" placeholder="Search" />
            <FilterButtonListarMaster onFilterChange={onFilterChange} />
        </div>
        <div className="master_listarUsuario-header-title">O EDUCADOR</div>
    </div>
);

export default HeaderListar;
