import React, { useState } from "react";
import "./colunistaTeste.css";

const colunistasData = [
  { name: "Luana Figueredo", grade: "8A do Ensino Fundamental", topic: "ACONTECEU NA ESCOLA", color: "#FF4B82" },
  { name: "Noah Lima", grade: "8A do Ensino Fundamental", topic: "BIOFÍMICA EM AÇÃO", color: "#35C2BE" },
  { name: "Lina Figueredo", grade: "8A do Ensino Fundamental", topic: "EDUCAÇÃO EM FOCO", color: "#B3E935" },
  { name: "Tecna Winson", grade: "9A do Ensino Fundamental", topic: "TECNOLOGIA", color: "#0F5067" },
  { name: "Tecna Winson", grade: "9A do Ensino Fundamental", topic: "ALÉM DO LIVRO", color: "#B5A3E5" },
  { name: "Lina Figueredo", grade: "8A do Ensino Fundamental", topic: "MONTHLY DOSE OF ENGLISH", color: "#2D2DC8" },
  { name: "Luana Figueredo", grade: "8A do Ensino Fundamental", topic: "PALAVREANDO", color: "#FFE000" },
  { name: "Noah Lima", grade: "8A do Ensino Fundamental", topic: "AVENTURAS NA HISTÓRIA", color: "#A87352", image: 'https://via.placeholder.com/150' }
];

const Colunistas = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(colunistasData);
  const [selectedColumn, setSelectedColumn] = useState("");
  const [showFilterOptions, setShowFilterOptions] = useState(false);

  const uniqueColumns = [...new Set(colunistasData.map((col) => col.topic))];

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterData(value, selectedColumn);
  };

  const handleColumnFilter = (column) => {
    setSelectedColumn(column);
    filterData(searchTerm, column);
    setShowFilterOptions(false);
  };

  const filterData = (search, column) => {
    const filtered = colunistasData.filter((colunista) => {
      const matchesSearch = colunista.name.toLowerCase().includes(search.toLowerCase());
      const matchesColumn = column ? colunista.topic === column : true;
      return matchesSearch && matchesColumn;
    });
    setFilteredData(filtered);
  };

  const resetFilter = () => {
    setSearchTerm("");
    setSelectedColumn("");
    setFilteredData(colunistasData);
    setShowFilterOptions(false);
  };

  return (
    <div className="container">
      <h1 className="title">- COLUNISTAS</h1>

      <div className="search-filter-container">
        <input
          type="text"
          placeholder="Buscar colunista..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar"
        />

        <div className="filter-dropdown">
          <button onClick={() => setShowFilterOptions(!showFilterOptions)} className="filter-btn">
            {selectedColumn ? selectedColumn : "Filtrar por Coluna"}
          </button>

          {showFilterOptions && (
            <ul className="filter-options">
              {uniqueColumns.map((column, index) => (
                <li key={index} onClick={() => handleColumnFilter(column)}>
                  {column}
                </li>
              ))}
              <li onClick={resetFilter} className="clear-filter">
                Limpar Filtro
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Grid com Flip Card */}
      <div className="colunistas-grid">
        {filteredData.map((colunista, index) => (
          <div key={index} className="colunista-card">
            {/* Parte Frontal */}
            <div className="card-front" style={{ backgroundColor: colunista.color }}>
              <h2 className="colunista-name">{colunista.name}</h2>
              <p className="colunista-grade">{colunista.grade}</p>
              <p className="colunista-topic">{colunista.topic}</p>
              {colunista.image && (
                <img className="colunista-img" src={colunista.image} alt={colunista.name} />
              )}
            </div>
            {/* Parte Traseira */}
            <div className="card-back">
              <h3>Mais Informações</h3>
              <p>Colunista: {colunista.name}</p>
              <p>Série: {colunista.grade}</p>
              <p>Tema: {colunista.topic}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Colunistas;
