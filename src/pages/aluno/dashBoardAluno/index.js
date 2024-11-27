import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../aluno/dashBoardAluno/dashBoardAluno.css';

import SideNavBarNewAluno from '../../navBar/newNavBarSideBarAluno/index.js';
import LadoDireito from './ladoDireito/ladoDireito';
import LadoEsquedo from './ladoEsquedo/ladoEsquedo';

export const DashBoardAluno = () => {
    return (
        <div className="aluno_dashboard_container_principal">
            {/* Barra lateral */}
            <div className="">
                <SideNavBarNewAluno />
            </div>
            {/* Conteúdo principal */}
            <div className='dashAlunoNewContentPrincipalGridLayout' >

                <div className="lado-esquerdoDashAlunoNew">
                    <LadoEsquedo />
                </div>

                <div className="lado-direitoDashAlunoNew">
                    <LadoDireito />
                </div>

            </div>
        </div>
    );
};
    
export default DashBoardAluno;
