// MUDEI
import React from 'react';
import './rodape.css';

function Rodape() {
  return (
    <footer className="userComum-footer">
      <div className="linha-topo"></div> {/* Linha branca no topo */}
      <div className="userComum-footer-container">
        <h2 className="userComum-footer-title">O EDUCADOR</h2>
        <div className="userComum-contact-container">
          <div className="userComum-contact-block contact-block-1">
            <h3>Contato</h3>
            <img src="../img/email.svg" className="imagem email" alt="Imagem email" />
            <p>admin@educa.com.br</p>
            <img src="../img/phone-line.svg" className="imagem telefone" alt="Imagem telefone" />
            <p> 11 12345-6789</p>
          </div>

          <div className="userComum-contact-block contact-block-2">
            <h3>Contato</h3>
            <img src="../img/email.svg" className="imagem email" alt="Imagem email" />
            <p>admin@educa.com.br</p>
            <img src="../img/phone-line.svg" className="imagem telefone" alt="Imagem telefone" />
            <p> 11 12345-6789</p>
          </div>

          <div className="userComum-contact-block contact-block-3">
            <h3>Contato</h3>
            <img src="../img/email.svg" className="imagem email" alt="Imagem email" />
            <p>admin@educa.com.br</p>
            <img src="../img/phone-line.svg" className="imagem telefone" alt="Imagem telefone" />
            <p> 11 12345-6789</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Rodape;
