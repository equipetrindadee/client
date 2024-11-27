import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../ladoEsquedo/ladoEsquedo.css';
import Notificacoes from './notificacoes/notificacoes';
import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const imagesCarrossel = [
    { src: '', route: '/telainicial' },
    { src: '', route: '/nav' },
    { src: '', route: '/aluno' },
    { src: '', route: '/templete' },
    { src: '', route: '/ProcessoDePostagem' },
    { src: '', route: '/chat' },
    { src: '', route: '/meusArtigos' },
    { src: '', route: '/adicionarPagina' }
];

export const LadoEsquedo = () => {
    const navigate = useNavigate();

    const handleImageClick = (route) => {
        navigate(route);
    };

    return (
        <div className="col-md-8 aluno_dashboard_ladoEsquerdo">
            <div className="div-content aluno_dashboard_templates">
                {/* Conteúdo principal sem carrossel */}
                <div className="aluno_dashboard-templates-header">
                    <h4>Templates</h4>
                </div>
                {/* Outros conteúdos podem ser adicionados aqui */}
                <div className="row">
                    {/* Template Card 1 */}
                    <div className="col-md-6">
                        <div className="card aluno_dashboard_template_card">
                            <div className="card-body">
                                <h5 className="card-title">Template 1</h5>
                                <p className="card-text">
                                    Use este template para criar artigos informativos.
                                </p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleImageClick('/template1')}
                                >
                                    Usar Template
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Template Card 2 */}
                    <div className="col-md-6">
                        <div className="card aluno_dashboard_template_card">
                            <div className="card-body">
                                <h5 className="card-title">Template 2</h5>
                                <p className="card-text">
                                    Ideal para relatórios e apresentações formais.
                                </p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleImageClick('/template2')}
                                >
                                    Usar Template
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Template Card 3 */}
                    <div className="col-md-6 mt-4">
                        <div className="card aluno_dashboard_template_card">
                            <div className="card-body">
                                <h5 className="card-title">Template 3</h5>
                                <p className="card-text">
                                    Perfeito para criar blogs com estilo moderno.
                                </p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleImageClick('/template3')}
                                >
                                    Usar Template
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Template Card 4 */}
                    <div className="col-md-6 mt-4">
                        <div className="card aluno_dashboard_template_card">
                            <div className="card-body">
                                <h5 className="card-title">Template 4</h5>
                                <p className="card-text">
                                    Use este modelo para materiais educacionais.
                                </p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleImageClick('/template4')}
                                >
                                    Usar Template
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notificações */}
            <div className="div-content aluno_dashboard_notificacoes">
                <div className="aluno_dashBoard_notificacoes_topo">
                    <h4>Notificações</h4>
                    <div className="aluno_dashboard_notificacoes_pesquisa d-flex align-items-center">
                        <input
                            type="text"
                            className="form-control aluno_dashboard_notificacoes_topo_conteudo_input"
                        />
                        <button className="btn aluno_dashboard_notificacoes_topo_conteudo_btn">
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                </div>

                <div className="container mt-4 aluno_dashBoard_progresso_scroll">
                    <div className="row aluno_dashBoard_notificacoes_cards_grupo">
                        <Notificacoes />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LadoEsquedo;
