import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../aluno/adicionar_pagina/adicionar_pagina.css';
import NavBaraluno from '../../navBar/navBarAluno';

export const Adicionar_pagina = () => {
    return(
         
        <div>
          
            <div className="adicionarPagina-container">

                <header className="header-adicionarPagina-aluno">
                    <h2>O EDUCADOR</h2>
                    <h3>TE MANTER INFORMADO É A NOSSA MISSÃO</h3>
                </header>

                <div className="gridTemplates-adicionarPagina-Aluno">

                    <div className="template1">
                        <img src="../../../img/templete1.svg"/>
                    </div>

                    <div className="template2">
                        <img src="../../../img/templete2.svg"/>
                    </div>
                    
                    <div className="template3">
                        <img src="../../../img/templete3.svg"/>
                    </div>

                    <div className="template4">
                        <img src="../../../img/templete4.svg"/>
                    </div>

                    <div className="template5">
                        <img src="../../../img/templete1.svg"/>
                    </div>

                    <div className="template6">
                        <img src="../../../img/templete2.svg"/>
                    </div>

                    <div className="template7">
                        <img src="../../../img/templete3.svg"/>
                    </div>

                    <div className="template8">
                        <img src="../../../img/templete4.svg"/>
                    </div>

                </div>

            </div>

        </div>
    )

}

export default Adicionar_pagina;