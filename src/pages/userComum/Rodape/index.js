import React from 'react';
import './rodape.css';

function Rodape() {
  return (
    <footer className="userComum-rodape-footer">
      <h1>O EDUCADOR</h1>

      {/* Primeiro bloco de contato */}
      <div className="userComum-rodape-contact-container">
        
      </div>

      {/* Segundo bloco de contato */}
      <div className="userComum-rodape-contact-container">
        <h2>Contato</h2>
        <div className="userComum-rodape-contact-email">
          <img src="../img/email.svg" alt="Imagem email" className="userComum-rodape-email-icon" />
          <p>contato@exemplo.com</p>
        </div>
        <div className="userComum-rodape-contact-number">
          <img src="../img/phone-line.svg" alt="Imagem telefone" className="userComum-rodape-phone-icon" />
          <p>(11) 4448-5666</p>
        </div>
      </div>

      {/* Terceiro bloco de contato */}
      <div className="userComum-rodape-contact-container">
        <h2>Localização</h2>
        <div className="userComum-rodape-contact-email">
          <p>Escola SESI-SP de Cajamar (CE 438)</p>
        </div>
        <div className="userComum-rodape-contact-number">
          <p> Rua das Camélias, 75 - Portal dos Ipês II</p>
        </div>
      </div>
    </footer>
  );
}

export default Rodape;
