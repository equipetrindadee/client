import React from 'react';
import "../../userComum/SobreNos/sobrenos.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import NavbarUserComum from '../../navBar/navBarUserComum';
/* import NavbarUserComum from '../../navBar/navBarUserComum/index.js'; */

export const SobreNos = () => {
    return (
        <div>
            <NavbarUserComum />
            <div className="UserComum_SobreNos-SplitScreen">
                <div className="UserComum_SobreNos-LeftSide"></div>
                <div className="UserComum_SobreNos-RightSide">
                    <h1 className="UserComum_SobreNos-Title">Sobre Nós</h1>
                    <p className="UserComum_SobreNos-Description">
                    O nosso jornal nasceu em uma reunião dos professores de Linguagens, quando a professora Luana lançou a ideia de criarmos um jornal escolar.  A sugestão ganhou forma e vida pelas mãos da professora Tamires, que colocou tudo em prática com a ajuda de uma equipe engajada. A primeira edição, feita com carinho (e muitas xícaras de café) pelos professores, deu o pontapé inicial, mas, com o tempo, os alunos assumiram o protagonismo, e hoje contamos com editores do 8º ano ao 3º ano do Ensino Médio. A cada dois meses, trazemos colunas que exploram quase todas as disciplinas, sempre com criatividade e dedicação. Em constante transformação, o jornal é a prova de que uma boa ideia, quando compartilhada, pode crescer e alcançar novos horizontes!
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
