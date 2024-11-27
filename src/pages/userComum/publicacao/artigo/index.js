import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import"../artigo/artigo.css"

function Artigo(params) {
    return(
        <div>
             <div className='user_publicacao-materia'>
                    <div className="user_publicacao-materia-title">
                        <h3>Reunião Integrativa SESI-SENAI sobre a Digitalização do Jornal Escolar "O EDUCADOR"</h3>
                    </div>

                    <div className="user_publicacao-materia-text-esquerdo">
                        <p>
                            No dia 30 de setembro de 2024, foi realizada uma reunião integrativa entre alunos, professores e colaboradores das unidades SESI e SENAI, com o objetivo de discutir e apresentar o andamento do projeto de digitalização do jornal escolar "O Educador". O projeto, liderado por alunos do 3º ano do ensino médio da unidade SESI-438 Cajamar-SP, visa transformar o tradicional jornal impresso em uma plataforma digital dinâmica e acessível a toda a comunidade escolar.

                            A reunião teve início com a professora Tamires Fernandes, responsável pela administração do jornal e docente de Inglês, que deu as boas-vindas aos participantes e fez uma breve introdução sobre a importância do projeto. Em seguida, Bruno Gomes, professor do SENAI, apresentou a ideia principal do projeto de digitalização, destacando os benefícios de se migrar para um formato digital, como a maior interação com os leitores e a possibilidade de integrar diferentes mídias, como áudio e vídeo, nos artigos.
                        </p>
                    </div>

                    <div className="user_publicacao-materia-img-direito">
                        <img src="../img/meninoBackGroundLoginGeneral.svg" alt="logo" />
                    </div>

                    <div className="user_publicacao-materia-paragrafo">
                        <p>
                            A líder da equipe responsável pelo projeto, Miriã Fernandes, coordenou com auxílio de seus colegas a apresentação das principais telas e funcionalidades da nova plataforma digital, explicando como seria a navegação tanto para alunos quanto para professores. Eles detalharam a tela de acesso do usuário aluno, que poderá ler, escrever matérias, interagir com outros usuários e até sugerir temas para futuras edições. Já para o usuário professor, foram discutidas as funcionalidades de gestão de conteúdo e edição de artigos.
                        </p>
                    </div>

                    <div className="user_publicacao-materia-img-esquerdo">
                        <img src="../img/meninoBackGroundLoginGeneral.svg" alt="imagem 1" />
                    </div>

                    <div className="user_publicacao-materia-text-centro">
                        <p>
                            Durante a apresentação, foi destacada a criação de uma nova área intitulada Projetos, onde será possível integrar conteúdos referentes aos projetos internos em produção por outras equipes do SENAI, os líderes desses projetos também estavam presentes na reunião. O integrante, Cauã Gonçalves, em conjunto com a líder de um dos projetos, Samantha Alves, apresentou uma prévia do projeto executado pela sua equipe. O líder do segundo projeto, Carlos Garcia, também fez uma breve introdução sobre o projeto liderado pelo mesmo. Outra proposta importante foi a pré-visualização dos artigos para usuários que não estão logados na plataforma, uma forma de atrair novos leitores.

                            A reunião foi aberta para dúvidas e sugestões, algumas sugestões foram feitas pelos participantes para melhorar o projeto, a possibilidade de aplicar dois autores em um mesmo artigo, foi apontada, incentivando a colaboração entre os alunos. Outra sugestão relevante foi, a integração de colunas que conversem entre si, criando uma melhor experiência de leitura para os temas abordados mensalmente.
                        </p>
                    </div>

                    <div className="user_publicacao-materia-paragrafo-inferior">
                        <p>
                            Também foi levantada a questão do prazo para conclusão do projeto, com o objetivo final definido para dezembro de 2024, visando à estreia oficial do novo formato do jornal. A reunião contou com a presença das professoras responsáveis pelo jornal, Tamires Fernandes (Inglês) e Maria Isabel Sales (Português), a coordenadora da escola, Ohana Telles, o professor do SENAI, Bruno Gomes, a equipe de alunos responsável pelo projeto e os colunistas do jornal. Juntos, discutiram os próximos passos para garantir que a digitalização do jornal "O Educador" seja um sucesso e que o mesmo continue a ser uma plataforma relevante e inovadora dentro da comunidade escolar. Este encontro representou um marco importante no avanço do projeto, unindo esforços de diferentes áreas para entregar um produto que atenda às expectativas de todos os envolvidos.

                        </p>
                    </div>
                </div>




                <div className="user_publicacao-materia-footer">
                    <div className='user_publicacao-materia-footer-item'>
                        <div className='user_publicacao-materia-footer-img'>
                            <img src="../img/meninoBackGroundLoginGeneral.svg" alt="logo" />
                        </div>
                        <div className='user_publicacao-materia-footer-text'>
                            <p> Leia na íntegra sobre a digitalização do jornal 'O Educador' e descubra como a comunidade escolar está se transformando</p>
                        </div>
                    </div>

                    <div className='user_publicacao-materia-footer-item'>
                        <div className='user_publicacao-materia-footer-img'>
                            <img src="../img/meninoBackGroundLoginGeneral.svg" alt="logo" />
                        </div>
                        <div className='user_publicacao-materia-footer-text'>
                            <p> Leia na íntegra sobre a digitalização do jornal 'O Educador' e descubra como a comunidade escolar está se transformando</p>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Artigo