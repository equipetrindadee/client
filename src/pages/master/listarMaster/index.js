import React, { useState } from 'react';
import "../../master/listarMaster/ContentPrincipalListMaster.css";
import HeaderListar from './headerListar/index.js';
import UserListMaster from './tableListar/index.js';
import SideNavBar from '../../navBar/navbarSidebarTest/index.js';

const ContentPrincipalListMaster = () => {
    const [filter, setFilter] = useState(''); // Estado para o filtro de categoria ou ordenação

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    return (
        <div style={{ display: 'flex' }} className='master_listarMaster-ContentPrincipal'>
            <SideNavBar />
            <div className="master_listarMaster-ContentPrincipal-content">
                <HeaderListar onFilterChange={handleFilterChange} />
                <UserListMaster filter={filter} />
            </div>
        </div>
    );
};

export default ContentPrincipalListMaster;
