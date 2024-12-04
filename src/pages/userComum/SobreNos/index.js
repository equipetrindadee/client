import React from 'react';
import "../../userComum/SobreNos/sobrenos.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
/* import NavbarUserComum from '../../navBar/navBarUserComum/index.js'; */

export const SobreNos = () => {
    return (
        <div>
            {/* <NavbarUserComum /> */}
            <div className="UserComum_SobreNos-SplitScreen">
                <div className="UserComum_SobreNos-LeftSide"></div>
                <div className="UserComum_SobreNos-RightSide">
                    <h1 className="UserComum_SobreNos-Title">Sobre Nós</h1>
                    <p className="UserComum_SobreNos-Description">
                        Somos um jornal onde nossa função é ajudar e informar, formamos uma equipe de alunos onde pesquisamos e informamos notícias verídicas.
                    </p>
                    <div className="UserComum_SobreNos-Objectives">
                        <h2 className="UserComum_SobreNos-ObjectivesTitle">Objetivos</h2>
                        <div className="UserComum_SobreNos-ObjectiveItem">
                            <p>Promover o jornalismo estudantil</p>
                        </div>
                        <div className="UserComum_SobreNos-ObjectiveItem">
                            <p>Fomentar a cultura da informação</p>
                        </div>
                        <div className="UserComum_SobreNos-ObjectiveItem">
                            <p>Garantir a veracidade das notícias</p>
                        </div>
                    </div>
                    <div className="UserComum_SobreNos-Envolvidos">
                        <h2 className="UserComum_SobreNos-ObjectivesTitle">Envolvidos</h2>
                        <div className="UserComum_SobreNos-ObjectiveItem">
                            <p>Rede Sesi/SENAI</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SobreNos;
