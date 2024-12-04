import React from 'react';
import './rodape.css';

function Rodape() {
  return (
    <footer className="userComum-rodape-footer">
      <h1>O EDUCADOR</h1>

      {/* Primeiro bloco de contato */}
      <div className="userComum-rodape-contact-container">
        <h2>Contato</h2>
        <div className="userComum-rodape-contact-email">
          <img src="../img/email.svg" alt="Imagem email" className="userComum-rodape-email-icon" />
          <p>admin@educaa.com.br</p>
        </div>
        <div className="userComum-rodape-contact-number">
          <img src="../img/phone-line.svg" alt="Imagem telefone" className="userComum-rodape-phone-icon" />
          <p>11 12345-6789</p>
        </div>
      </div>

      {/* Segundo bloco de contato */}
      <div className="userComum-rodape-contact-container">
        <h2>Contato</h2>
        <div className="userComum-rodape-contact-email">
          <img src="../img/email.svg" alt="Imagem email" className="userComum-rodape-email-icon" />
          <p>admin@educaa.com.br</p>
        </div>
        <div className="userComum-rodape-contact-number">
          <img src="../img/phone-line.svg" alt="Imagem telefone" className="userComum-rodape-phone-icon" />
          <p>11 12345-6789</p>
        </div>
      </div>

      {/* Terceiro bloco de contato */}
      <div className="userComum-rodape-contact-container">
        <h2>Contato</h2>
        <div className="userComum-rodape-contact-email">
          <img src="../img/email.svg" alt="Imagem email" className="userComum-rodape-email-icon" />
          <p>admin@educaa.com.br</p>
        </div>
        <div className="userComum-rodape-contact-number">
          <img src="../img/phone-line.svg" alt="Imagem telefone" className="userComum-rodape-phone-icon" />
          <p>11 12345-6789</p>
        </div>
      </div>
    </footer>
  );
}

export default Rodape;
