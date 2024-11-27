import React, { useState, useEffect } from 'react';
import '../filterButtonMateriaColunaProfessor/filterButtonMateriaColunaProfessor.css';

function FilterButtonMateriaColunaProfessor({ onFilterChange }) {
    const [selectedItem, setSelectedItem] = useState('');
    const [showMenu, setShowMenu] = useState(false);

    const toggleDropdown = () => {
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            const dropdown = document.getElementById('dropdownMenu');
            const button = document.querySelector('.professor_materiaColuna-filter-custom-button');

            if (dropdown && button && !dropdown.contains(event.target) && !button.contains(event.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleItemClick = (item) => {
        setSelectedItem(item);
        onFilterChange(item); // Pass the selected item to the parent
    };

    return (
        <div className="position-relative">
            <button className="professor_materiaColuna-filter-customButton" onClick={toggleDropdown}>
                <i className='bx bxs-filter-alt bx-flip-horizontal'></i>
                <p>Filtro</p>
            </button>

            {showMenu && (
                <div id="dropdownMenu" className="dropdown-menu professor_materiaColuna-filter-dropdown-menu">
                    <div className="professor_materiaColuna-filter-dropdown-item icon-marked-revisao " onClick={() => handleItemClick('Revisão')}>
                        <i className='bx bx-radio-circle-marked' id="icon-marked-revisao" ></i>
                        <p>REVISÃO</p>
                        {selectedItem === 'Revisão' && <i className="bi bi-check professor_materiaColuna-filter-dropdown-icon-check" id='icon-check-revisao'></i>}
                    </div>
                    <div className="professor_materiaColuna-filter-dropdown-item" onClick={() => handleItemClick('Concluído')}>
                        <i className='bx bx-radio-circle-marked' id="icon-marked-concluido" ></i>
                        <p>CONCLUÍDO</p>
                        {selectedItem === 'Concluído' && <i className="bi bi-check professor_materiaColuna-filter-dropdown-icon-check" id='icon-check-concluido'></i>}
                    </div>
                    <div className="professor_materiaColuna-filter-dropdown-item" onClick={() => handleItemClick('Postado')}>
                        <i className='bx bx-radio-circle-marked' id="icon-marked-postado" ></i>
                        <p>POSTADO</p>
                        {selectedItem === 'Postado' && <i className="bi bi-check professor_materiaColuna-filter-dropdown-icon-check" id='icon-check-postados'></i>}
                    </div>
                </div>
            )}
        </div>
    );
}

export default FilterButtonMateriaColunaProfessor;
