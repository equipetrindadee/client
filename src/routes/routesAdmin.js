import React from "react";
import { Route, Routes } from "react-router-dom";

import NavBarProfessor from "../pages/navBar/navBarProfessor/index.js";
import NavBarAluno from "../pages/navBar/navBarAluno/index.js";
import { LandPage } from "../pages/userComum/LandPage/index.js";
import DashBoardAluno from "../pages/aluno/dashBoardAluno/index.js";
import Adicionar_pagina from "../pages/aluno/adicionar_pagina/index.js";
import Meus_artigos from '../pages/aluno/meus_artigos/index.js';
import ProcessodePostagem from "../pages/aluno/processodePostagem/index.js";
import NavBarTemplete from "../pages/navBar/navBarTemplete/index.js";
import ChatTeste from "../pages/aluno/chatTeste/componetPrincipal/index.js";
import { AuthProvider } from "../Context/AuthContext.js";
import ControleColuna from "../pages/professor/controleColuna/controlePrincipal/index.js";
import ColunistaUsuario from "../pages/userComum/colunistas/index.js";
import FaleConosco from "../pages/userComum/faleConosco/index.js";
import Calendario from "../pages/userComum/calendario/index.js";
import DashboardProfessor from "../pages/professor/dashboardProfessor/index.js";
import MateriaColuna from "../pages/professor/materiasColuna/index.js";
import RecuperarSenha from "../pages/userComum/RecuperarSenha/index.js"
import Login from '../pages/userComum/login/index.js'
import ControleUsuario from "../pages/professor/controleUsuario/index.js"
import Cadastro from "../pages/userComum/cadastroTeste/index.js";
import SideNavBar from "../pages/navBar/navbarSidebarTest/index.js"
import Template1 from "../pages/professor/templates/Template1/Template1/index.js"
import Template2 from "../pages/professor/templates/Template2/index.js"
import Template3 from "../pages/professor/templates/Template3/Template3/index.js"
import Template4 from "../pages/professor/templates/Template4/Template4/index.js"

import UserComumPerfil from "../pages/userComum/userComumPerfil/index.js";
import FaleConoscoProfessor from "../pages/professor/faleConoscoProfessor/index.js";
import RevisaoT1 from '../pages/professor/templates/RevisãoT1/index.js'
import RevisaoT2 from "../pages/professor/templates/RevisãoT2/index.js";
import RevisaoT3 from "../pages/professor/templates/RevisãoT3/index.js";
import EditarTelaProf from "../pages/professor/editarTelaInicial/index.js";
import ProcessodePostagemProfessor from "../pages/professor/processodePostagemProfessor/index.js"
import PostagemTelaInicial from "../pages/professor/postagemTelaInicial/index.js"
import SubirImagem from "../../src/pages/subirImagem/subirImagem.js"
import PostagemRevisao from "../pages/professor/postagemRevisao/index.js"
import SideNavBarNewAluno from "../pages/navBar/newNavBarSideBarAluno/index.js";
import Publicacao from "../pages/userComum/publicacao/index.js";
import NavbarUserComum from "../pages/navBar/navBarUserComum/index.js";
import DashBoardMaster from "../pages/master/DashBoardMaster/index.js";
import ListarArtigo from "../pages/userComum/ListarArtigos/index.js";
import MeuPerfil from "../pages/userComum/MeuPerfil/index.js";
import SobreNos from "../pages/userComum/SobreNos/index.js";
import NewDashBoardAluno from "../pages/aluno/newDasboardAluno/index.js";
import FormularioMaster from "../pages/master/formularioMaster/index.js";

export default function RoutesAdmin() {

    // const { authenticated } = useContext(Context)

    return (
        <AuthProvider>
            <Routes>
                {/* navbar */}
                <Route path='/nav' element={<NavBarProfessor />} />
                <Route path='/aluno' element={<NavBarAluno />} />
                <Route path='/templete' element={<NavBarTemplete />} />
                <Route path='/sidebar' element={<SideNavBar />} />
                <Route path='/sidebarAluno' element={<SideNavBarNewAluno />} />
                <Route path='/navBarComum' element={<NavbarUserComum />} />



                {/* paginas iniciais */}
                <Route path='/' element={<LandPage />} />


                {/* Telas alunos */}
                <Route path='/dash' element={<DashBoardAluno />} />
                <Route path='/adicionarPagina' element={<Adicionar_pagina />} />
                <Route path='/processodePostagem' element={<ProcessodePostagem />} />
                <Route path='/meusArtigos' element={<Meus_artigos />} />
                <Route path='/chat' element={<ChatTeste />} />
                <Route path='/aluno/dasboardAluno' element={<NewDashBoardAluno />} />

                {/* Telas do Professor */}
                <Route path='/controleColunas' element={<ControleColuna />} />
                <Route path='/controleUsuario' element={<ControleUsuario />} />
                <Route path='/faleConoscoProfessor' element={<FaleConoscoProfessor />} />
                <Route path='/dashP' element={<DashboardProfessor />} />
                <Route path='/materiaColuna' element={<MateriaColuna />} />
                <Route path='/editarTelaInicialProfessor' element={<EditarTelaProf />} />
                <Route path='/postagem/telaInicial' element={<PostagemTelaInicial />} />




                {/* Telas UserComum */}
                <Route path='/login' element={<Login />} />
                <Route path='/cadastro' element={<Cadastro />} />
                <Route path='/userComum/colunistaUsuario' element={<ColunistaUsuario />} />
                <Route path='/userComum/faleConosco' element={<FaleConosco />} />
                <Route path='/userComum/calendario' element={<Calendario />} />
                <Route path='/userComum/userPerfil' element={<UserComumPerfil />} />
                <Route path='/userComum/recuperarSenha' element={<RecuperarSenha />} />
                <Route path='/userComum/publicacao' element={<Publicacao />} />
                <Route path='/userComum/listarArtigos' element={<ListarArtigo />} />
                <Route path='/userComum/meuPerfil' element={<MeuPerfil />} />
                <Route path='/userComum/sobreNos' element={<SobreNos />} />



                {/* templates testes */}
                <Route path='/t1' element={<Template1 />} />
                <Route path='/t2' element={<Template2 />} />
                <Route path='/t3' element={<Template3 />} />
                <Route path='/t4' element={<Template4 />} />

                <Route path='/PR' element={<PostagemRevisao />} />
                <Route path='/t1R' element={<RevisaoT1 />} />
                <Route path='/t2R' element={<RevisaoT2 />} />
                <Route path='/t3R' element={<RevisaoT3 />} />
                <Route path='/processopostagemProfessor' element={<ProcessodePostagemProfessor />} />


                <Route path='/imagem' element={<SubirImagem />} />



                {/* master */}
                <Route path='/master/Dashboard' element={<DashBoardMaster />} />
                <Route path='/master/FormularioMaster' element={<FormularioMaster />} />


            </Routes>
        </AuthProvider>
    )

}
