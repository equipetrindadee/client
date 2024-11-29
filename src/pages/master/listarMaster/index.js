import React from 'react';
import "../../master/listarMaster/ContentPrincipalListMaster.css"
import HeaderListar from './headerListar/index.js';
import UserListMaster from'./tableListar/index.js'
import SideNavBar from '../../navBar/navbarSidebarTest/index.js';
const ContentPrincipalListMaster = () => (
    <div style={{ display: 'flex' }}>
        <SideNavBar />
        <div className="content">
            <HeaderListar />
            <UserListMaster />
        </div>
    </div>
);

export default ContentPrincipalListMaster;
