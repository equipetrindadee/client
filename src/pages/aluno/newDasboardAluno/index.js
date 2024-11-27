import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../aluno/newDasboardAluno/controlePrincipalNDashAluno.css';

import SideNavBarNewAluno from '../../navBar/newNavBarSideBarAluno/index.js';
import PartPrincipalDasboardAluno from '../newDasboardAluno/partPrincipalNDashAluno/index.js';

export const NewDashBoardAluno = () => {
    return (
        <div className="NewDashboardAluno">
            <div className="container-fluid NewDashboardAluno__content">
                <div className="row">
                    <div className="col-3 col-md-2 NewDashboardAluno__sidebar">
                        <SideNavBarNewAluno />
                    </div>
                    <div className="col-9 col-md-10 NewDashboardAluno__mainContent">
                        <PartPrincipalDasboardAluno />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewDashBoardAluno;
