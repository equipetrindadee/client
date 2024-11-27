import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { PieChart, Pie, Cell } from "recharts";
import CardPerfil from '../componetsAluno/cardPerfil';
import ModalPerfil from '../componetsAluno/modalPerfil';
import { useNavigate } from 'react-router-dom';
import '../ladoDireito/ladoDireito.css';
import { Timeline } from 'rsuite';
import CreditCardIcon from '@rsuite/icons/legacy/CreditCard';
import PlaneIcon from '@rsuite/icons/legacy/Plane';
import TruckIcon from '@rsuite/icons/legacy/Truck';
import UserIcon from '@rsuite/icons/legacy/User';
import CheckIcon from '@rsuite/icons/legacy/Check';


import Calendario from '../../../userComum/calendario';

// calendário
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const LadoDireito = () => {
    const navigate = useNavigate();

    const COLORS = ['#fff', '#41BFB3'];

    // Dados dinâmicos para os cards
    const progressoData = [
        { title: 'Alunos Revelam Habilidades Artísticas', percentage: 80 },
        { title: 'A Importância do Apoio Psicológico', percentage: 75 },
        { title: 'Habilidades em Desenvolvimento', percentage: 10 },
        { title: 'Projeto de Ciência de Dados', percentage: 43 },
    ];

    return (
        <div>
            <div className="col-md-4 aluno_dashboard_ladoDireito">
                <div className='cardPerfil-ladoDireito'>
                    <CardPerfil />
                </div>


                <Timeline className="custom-timeline">
                    <Timeline.Item dot={<CreditCardIcon />}>
                        <p>March 1, 10:20</p>
                        <p>Your order starts processing</p>
                    </Timeline.Item>
                    <Timeline.Item>
                        <p>March 1, 11:34</p>
                        <p>The package really waits for the company to pick up the goods</p>
                    </Timeline.Item>
                    <Timeline.Item>
                        <p>March 1, 16:20</p>
                        <p>[Packed]</p>
                        <p>Beijing company has received the shipment</p>
                    </Timeline.Item>
                   
                </Timeline>


                {/* Progresso */}
                <div className="div-content aluno_dashboard_progresso">
                    <div className='aluno_dashBoard_progresso_topo'>
                        <h4>Progresso</h4>
                    </div>

                    <div className="container mt-4 aluno_dashBoard_progresso_scroll">
                        <div className="row aluno_dashBoard_progresso_cards_grupo">
                            {progressoData.map((item, index) => {
                                // Gerando os dados do gráfico de pizza dinamicamente com base no percentage
                                const pieData = [
                                    { name: 'Concluído', value: item.percentage },
                                    { name: 'Faltante', value: 100 - item.percentage }
                                ];

                                return (
                                    <div className="col-md-4" key={index}>
                                        <div className="aluno_dashboard_progresso_cards card border-light mb-3">
                                            <div className="aluno_dashboard_progresso_cards_parent">
                                                <PieChart className="pie-chart" width={60} height={100}>

                                                    <Pie
                                                        data={pieData}
                                                        cx={25}
                                                        cy={25}
                                                        innerRadius={17}
                                                        outerRadius={25}
                                                        fill="#8884d8"
                                                        paddingAngle={5}
                                                        dataKey="value"
                                                        stroke="none"
                                                    >
                                                        {pieData.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                        ))}
                                                    </Pie>
                                                </PieChart>
                                                <div className="aluno_dashboard_progresso_cards_div_text">
                                                    <div className="">
                                                        <h3 className="">{item.title}</h3>
                                                        <h5>{item.percentage}% Concluído</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <ModalPerfil />
        </div>
    );
}

export default LadoDireito;
