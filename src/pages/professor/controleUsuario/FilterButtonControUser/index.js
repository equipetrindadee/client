import React, { useState, useEffect } from 'react';
import '../FilterButtonControUser/filterButtonControUser.css';

function FilterButtonControUser({ onFilterChange, colunas, onSortChange }) {
  const [selectedItem, setSelectedItem] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('Filtrar');
  const [filter, setFilter] = useState('Todos'); // Estado local para gerenciar o filtro selecionado

  const toggleDropdown = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  // Fecha o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.position-relative')) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);

    // Quando clicar em "Mostrar todas as colunas", limpa o filtro de coluna
    if (item === 'Mostrar todas as colunas') {
      onFilterChange(''); // Limpa o filtro de coluna
    } else if (item === 'A-Z') {
      onFilterChange(''); // Limpa o filtro
      onSortChange('asc'); // Ordena todos em ordem crescente
    } else if (item === 'Z-A') {
      onFilterChange(''); // Limpa o filtro
      onSortChange('desc'); // Ordena todos em ordem decrescente
    } else {
      // Se for uma categoria específica, aplica o filtro de categoria (Aluno/Professor)
      onFilterChange(item);  // Passa o nome da categoria selecionada (Aluno ou Professor)
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Função para formatar a exibição dos itens
  const formatItemDisplay = (item) => {
    if (item === 'Professor') {
      return 'PROFESSOR';
    } else if (item === 'Aluno') {
      return 'ALUNO';
    }
    return item;
  };

  return (
    <div className="position-relative">
      <button
        className="professor_ControlUser-FilterButton-custom-button"
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={showMenu}
      >
        <i className='bx bxs-filter-alt bx-flip-horizontal'></i>
        <p>Filtro</p>
      </button>

      {showMenu && (
        <div id="dropdownMenu" className="dropdown-menu professor_ControlUser-FilterButton-dropdown-menu">
          <div className="professor_ControlUser-FilterButton-tabs">
            <button
              className={`tab-button ${activeTab === 'Filtrar' ? 'active' : ''}`}
              onClick={() => handleTabChange('Filtrar')}
            >
              FILTRAR
            </button>
            <button
              className={`tab-button ${activeTab === 'Colunas' ? 'active' : ' '}`}
              onClick={() => handleTabChange('Colunas')}
            >
              COLUNAS
            </button>
          </div>

          {activeTab === 'Filtrar' && (
            <div className="professor_ControlUser-FilterButton-tab-content">
              {['A-Z', 'Z-A', 'Professor', 'Aluno'].map((item) => (
                <div
                  key={item}
                  className="professor_ControlUser-FilterButton-dropdown-item"
                  onClick={() => handleItemClick(item)}
                >
                  <i class="bx bx-radio-circle-marked professor_ControlUser-FilterButton-dropdown-item-icon"></i>
                  <p>{formatItemDisplay(item)}</p> {/* Exibe a formatação desejada */}
                  {selectedItem === item && <i className="bi bi-check professor_ControlUser-FilterButton-dropdown-icon-check"></i>}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Colunas' && (
            <div className="professor_ControlUser-FilterButton-tab-content">
              <div
                className="professor_ControlUser-FilterButton-dropdown-item professor_ControlUser-FilterButton-dropdown-item-coluna" id='todas_Colunas'
                onClick={() => handleItemClick('Mostrar todas as colunas')}
                style={{ backgroundColor: 'transparent', color: '#000' }}
              >
                <p>Mostrar todas as colunas</p>
                {selectedItem === 'Mostrar todas as colunas' && <i className="bi bi-check professor_ControlUser-FilterButton-dropdown-icon-check"></i>}
              </div>

              {colunas && colunas.length > 0 ? (
                colunas.map((coluna, index) => (
                  <div
                    key={index}
                    className="professor_ControlUser-FilterButton-dropdown-item  professor_ControlUser-FilterButton-dropdown-item-coluna"
                    onClick={() => handleItemClick(coluna.columname)}
                    style={{
                      backgroundColor: coluna.color,
                      color: "#fff",
                    }}
                  >
                    <p>{coluna.columname}</p>
                  </div>
                ))
              ) : (
                <p>Carregando colunas...</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FilterButtonControUser;
