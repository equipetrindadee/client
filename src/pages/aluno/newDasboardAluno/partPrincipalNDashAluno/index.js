import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../partPrincipalNDashAluno/partPrincipalNDashAluno.css';

export const PartPrincipalDasboardAluno = () => {
    return (
        <div>
            <div className="container ">
                <div className="containerPartPrincipalNDashAlunoHeaderPart">
                    <div className="col-9 partPrincipalNDashAluno__colMain">
                        <div className="row row-cols-1 row-cols-md-4 g-4 partPrincipalNDashAluno__cardRow">
                            {Array(4).fill().map((_, i) => (
                                <div key={i} className="col partPrincipalNDashAluno__cardCol">
                                    <div className={`card ${i % 3 === 0 ? 'bg-purple-200' : i % 3 === 1 ? 'bg-primary' : 'bg-danger'} partPrincipalNDashAluno__card`}>
                                        <div className="card-body partPrincipalNDashAluno__cardBody">
                                            <div className="d-flex align-items-center partPrincipalNDashAluno__userInfo">
                                                <img src="https://placehold.co/30x30" alt="User profile" className="rounded-circle partPrincipalNDashAluno__userImg" />
                                                <div className="ms-2 partPrincipalNDashAluno__userName">
                                                    <p className="fw-bold mb-0 partPrincipalNDashAluno__userNameText">User Name</p>
                                                    <p className="text-muted small partPrincipalNDashAluno__userTime">2 days ago</p>
                                                </div>
                                            </div>
                                            <h5 className="card-title mt-2 partPrincipalNDashAluno__cardTitle">Title of the post</h5>
                                            <p className="card-text partPrincipalNDashAluno__cardText">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna.</p>
                                            <img src="https://placehold.co/100x100" alt="Content image" className="img-fluid partPrincipalNDashAluno__contentImg" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="partPrincipalNDashAluno__colSide">
                        <div className="card mb-4 partPrincipalNDashAluno__sideCard">
                            <div className="card-body partPrincipalNDashAluno__sideCardBody">
                                <div className="d-flex align-items-center partPrincipalNDashAluno__profileInfo">
                                    <img src="https://placehold.co/50x50" alt="Profile picture" className="rounded-circle partPrincipalNDashAluno__profileImg" />
                                    <div className="ms-4 partPrincipalNDashAluno__profileName">
                                        <p className="fw-bold mb-0 partPrincipalNDashAluno__profileNameText">Daisy Bloom</p>
                                        <p className="text-muted small partPrincipalNDashAluno__profileLabel">Perfil</p>
                                    </div>
                                </div>
                                <p className="fw-bold mt-3 partPrincipalNDashAluno__date">Mon, Aug 17</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className='containerSecondNewDashAluno' >
                <div className="mt-4 partPrincipalNDashAluno__notifications">
                    <h3 className="fw-bold partPrincipalNDashAluno__notificationsTitle">Notificações</h3>
                    {Array(3).fill().map((_, i) => (
                        <div key={i} className={`d-flex align-items-center p-3 mb-2 border rounded-3 ${i === 2 ? 'border-danger partPrincipalNDashAluno__notificationDanger' : 'border-secondary partPrincipalNDashAluno__notification'}`}>
                            <img src="https://placehold.co/40x40" alt="User profile" className="rounded-circle partPrincipalNDashAluno__notificationImg" />
                            <div className="ms-4 partPrincipalNDashAluno__notificationText">
                                <p className="fw-bold mb-0 partPrincipalNDashAluno__notificationName">Fulana Ciclana de Silva</p>
                                <p className="text-muted small partPrincipalNDashAluno__notificationMessage">Te mandou uma notificação</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="card partPrincipalNDashAluno__progressCard">
                    <div className="card-body partPrincipalNDashAluno__progressCardBody">
                        <h5 className="card-title partPrincipalNDashAluno__progressTitle">Progresso</h5>
                        {Array(3).fill().map((_, i) => (
                            <div key={i} className="d-flex align-items-center mb-2 partPrincipalNDashAluno__progressItem">
                                <div className={`d-flex align-items-center justify-content-center w-25 h-25 rounded-circle ${i === 0 ? 'bg-success text-white partPrincipalNDashAluno__progressSuccess' : i === 1 ? 'bg-success text-white partPrincipalNDashAluno__progressComplete' : 'bg-warning text-white partPrincipalNDashAluno__progressWarning'}`}>
                                    {i === 0 ? '80%' : i === 1 ? '100%' : '65%'}
                                </div>
                                <p className="ms-2 text-muted small partPrincipalNDashAluno__progressText">Alunos Revelam Habilidades Artísticas em Exposição Escolar</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default PartPrincipalDasboardAluno;
