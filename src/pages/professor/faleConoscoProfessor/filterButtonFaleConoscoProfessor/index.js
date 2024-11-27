import React, { useState, useEffect } from 'react';
import '../filterButtonFaleConoscoProfessor/filterButtonFaleConoscoProfessor.css';

function FilterButtonFaleConoscoProfessor({ onFilterChange }) {
    // Definindo 'todos' como valor inicial do selectedItem
    const [selectedItem, setSelectedItem] = useState('todos'); 
    const [showMenu, setShowMenu] = useState(false);

    const toggleDropdown = () => {
        setShowMenu(!showMenu);
    };

    useEffect(() => {

        if (onFilterChange) {
            onFilterChange('todos');
        }

        const handleClickOutside = (event) => {
            const dropdown = document.getElementById('dropdownMenu');
            const button = document.querySelector('.faleConoscoProfessor-filterButton-custom-button');

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
        setShowMenu(false); // Close the dropdown after selection
    };

    return (
        <div className="position-relative">
            <button className="faleConoscoProfessor-filterButton-custom-button" onClick={toggleDropdown}>
                <i className='bx bxs-filter-alt bx-flip-horizontal'></i>
                <p>Filtro</p>
            </button>

            {showMenu && (
                <div id="dropdownMenu" className="dropdown-menu faleConoscoProfessor-filterButton-dropdown-menu"> 
                    <div className="faleConoscoProfessor-filterButton-dropdown-item" onClick={() => handleItemClick('todos')}>
                        <p>MOSTRAR TODOS</p>
                        {selectedItem === 'todos' && <i className="bi bi-check faleConoscoProfessor-filterButton-dropdown-icon-check"></i>}
                    </div>
                    <div className="faleConoscoProfessor-filterButton-dropdown-item" onClick={() => handleItemClick('Geral')}>
                        <p>GERAL</p>
                        {selectedItem === 'Geral' && <i className="bi bi-check faleConoscoProfessor-filterButton-dropdown-icon-check"></i>}
                    </div>
                    <div className="faleConoscoProfessor-filterButton-dropdown-item" onClick={() => handleItemClick('Jornal')}>
                        <p>JORNAL</p>
                        {selectedItem === 'Jornal' && <i className="bi bi-check faleConoscoProfessor-filterButton-dropdown-icon-check"></i>}
                    </div>
                    <div className="faleConoscoProfessor-filterButton-dropdown-item" onClick={() => handleItemClick('Sugestão')}>
                        <p>SUGESTÕES</p>
                        {selectedItem === 'Sugestão' && <i className="bi bi-check faleConoscoProfessor-filterButton-dropdown-icon-check"></i>}
                    </div>
                </div>
            )}
        </div>
    );
}

export default FilterButtonFaleConoscoProfessor;
    