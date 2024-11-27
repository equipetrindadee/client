import React, { useState } from 'react';
//import './YourStyles.css';  // Certifique-se de importar o arquivo CSS com as classes usadas

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleBlur = () => {
    setIsExpanded(false);
  };

  return (
    <div className={`contentColunaHeaderContentProfessor-actionsButtonsSearch-wrapper ${searchTerm ? 'no-hover' : ''}`}>
      <div className={`search-containerMaster ${isExpanded ? 'expandedMaster' : ''}`}>
        <input
          className='contentColunaHeaderContentControleUser-actionsButtonsSearch search-inputMaster'
          type="text"
          placeholder="Pesquisar um usuário..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <i className='bx bx-search search-iconMaster'></i>
      </div>
    </div>
  );
}

export default SearchComponent;
