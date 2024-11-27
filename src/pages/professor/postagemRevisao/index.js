import React from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './processoPostagemRevisao.css';
import { Container, Row, Col } from 'react-bootstrap';
import NavBarProfessor from '../../navBar/navBarProfessor';
import AreaProfessor from '../areaProfessor/index';
import ChatAreaProfessor from '../chatAreaProfessor';


export const PostagemRevisao = () => {
    const location = useLocation();
    const { rightSideHTML } = location.state || {}; // Recebe o HTML do `right-side`

    return (
        <div className='containerPostagem-postagemRevisao-professor'>
            <NavBarProfessor />
            <AreaProfessor />
            <ChatAreaProfessor />

            <Row className="top-Educador">
                <Col>
                    <h1 className="title-postagemRevisao-professor"> O EDUCADOR</h1>
                    <p className="subtitle-postagemRevisao-professor">Te manter informado é a nossa função</p>
                    <div className="linha-postagemRevisao-professor"></div>
                </Col>
            </Row>

            <div className='contentPostagem-postagemRevisao-professor'>
                <div className='infoJornal-postagemRevisao-professor'>
                    <img src="../img/banner_rosa.svg" alt="teste" className="imagemAutor-processodePostagem" />
                </div>

                {/* Renderiza o HTML do `right-side` */}
                <div dangerouslySetInnerHTML={{ __html: rightSideHTML }} />
            </div>
        </div>
    );
};

export default PostagemRevisao;
