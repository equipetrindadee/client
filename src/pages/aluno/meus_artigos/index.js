// MainPage.js
import React, { useState,useEffect } from 'react';
import '../meus_artigos/meus_artigos.css'; // Inclua o arquivo CSS que você criará abaixo
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBaraluno from '../../navBar/navBarAluno';
import NavBaralunoMobile from '../../navBar/navBarAlunoMobile';
import SideNavBarNewAluno from '../../navBar/newNavBarSideBarAluno/index.js';
import ModalPerfil from '../componetsAluno/modalPerfil';
import CardPerfil from '../componetsAluno/cardPerfil';

function Meus_artigos() {

 
    const [mostrarNavbarMobile, setMostrarNavbarMobile] = useState(false);
    const [mostrarNavbarAluno, setmostrarNavbarAluno] = useState(true);
  
  
    
    // Função que verifica o tamanho da tela e ajusta a visibilidade da NavBaralunoMobile
    const verificarTamanhoTela = () => {
      if (window.innerWidth <= 820) {
        setMostrarNavbarMobile(true); // Mostra a navbar mobile se a largura for <= 768px
        setmostrarNavbarAluno(false)
      } else {
        setMostrarNavbarMobile(false); // Esconde a navbar mobile se a largura for maior que 768px
        
      }
    };
  
    useEffect(() => {
      verificarTamanhoTela(); // Verifica o tamanho da tela ao montar o componente
      window.addEventListener('resize', verificarTamanhoTela); // Adiciona o evento de redimensionamento da tela
  
      return () => {
        window.removeEventListener('resize', verificarTamanhoTela); // Remove o evento ao desmontar o componente
      };
    }, []);
    
    return (
  
      <div class="container-fluid"> 
  
        {/* <NavBaraluno></NavBaraluno> 
        {mostrarNavbarMobile && <NavBaralunoMobile />}
        {mostrarNavbarAluno && <NavBaraluno />}*/}
        <SideNavBarNewAluno/>
  
        <div class="row aluno_MeusArtigos-container">
  
          {/* LEFT SIDE */}
          <div class="col-md-8 aluno_MeusArtigos-content">
            <div class="card my-4 aluno_MeusArtigos-card">
              <div class="card-body aluno_MeusArtigos-cardBody">
  
                {/* Barra de Pesquisa */}
                <div className='row aluno_MeusArtigos-searchBar'>
  
                  <h3 class="card-title">MEUS ARTIGOS</h3>
  
                  <div class="input-group mb-3 aluno_MeusArtigos-searchBar-input">
  
                    <input type="text" class="form-control" placeholder="" />
  
                    <div class="input-group-append aluno_MeusArtigos-searchBar-button">
  
                      <button class="btn " type="button">
                      <i class="bi bi-search"></i>
  
                      </button>
  
                    </div>
  
                  </div>
  
                </div>
                
                {/* Meus Atigos - Mateerias */}
                <div class="row">
                  <div class="col-md-12 mb-4">
                    <div class="card aluno_MeusArtigos-card-Materia">
                      <img src="../img/foto_meusArtigos.svg" class="card-img-top-meusArtigos" alt="Imagem do Artigo" />
                      <div class="card-body aluno_MeusArtigos-cardBody-Materia">
                        <h5 class="card-title  aluno_MeusArtigos-cardTitle-Materia">The new way of english</h5>
                        <div class='aluno_MeusArtigos-cardUser-Materia'>
                          <img src="../../../img/ft-Perfil.svg" class="aluno_MeusArtigos-cardImg-Materia" alt="Foto de Perfil" />
                          <p class="card-text  aluno_MeusArtigos-cardSubTitle-Materia">Ciclana dos Santos Luise</p>
                        </div>
  
                        <button className='buttonContinuarEditando-button-meusArtigos'>Continuar editando</button>
                      </div>
                      {/* <div className='aluno_MeusArtigos-row'></div> */}
                      <div class="aluno_MeusArtigos-row"></div>
                    </div>
                    <div class="card aluno_MeusArtigos-card-Materia">
                      <img src="../img/foto_meusArtigos.svg" class="card-img-top-meusArtigos" alt="Imagem do Artigo" />
                      <div class="card-body aluno_MeusArtigos-cardBody-Materia">
                        <h5 class="card-title  aluno_MeusArtigos-cardTitle-Materia">The new way of english</h5>
                        <div class='aluno_MeusArtigos-cardUser-Materia'>
                          <img src="../../../img/ft-Perfil.svg" class="aluno_MeusArtigos-cardImg-Materia" alt="Foto de Perfil" />
                          <p class="card-text  aluno_MeusArtigos-cardSubTitle-Materia">Ciclana dos Santos Luise</p>
                        </div>
  
                        <button className='buttonContinuarEditando-button-meusArtigos'>Continuar editando</button>
                      </div>
                      {/* <div className='aluno_MeusArtigos-row'></div> */}
                      <div class="aluno_MeusArtigos-row"></div>
                    </div>
  
                    <div class="card aluno_MeusArtigos-card-Materia">
                      <img src="../img/foto_meusArtigos.svg" class="card-img-top-meusArtigos" alt="Imagem do Artigo" />
                      <div class="card-body aluno_MeusArtigos-cardBody-Materia">
                        <h5 class="card-title  aluno_MeusArtigos-cardTitle-Materia">The new way of english</h5>
                        <div class='aluno_MeusArtigos-cardUser-Materia'>
                          <img src="../../../img/ft-Perfil.svg" class="aluno_MeusArtigos-cardImg-Materia" alt="Foto de Perfil" />
                          <p class="card-text  aluno_MeusArtigos-cardSubTitle-Materia">Ciclana dos Santos Luise</p>
                        </div>
  
                        <p class="card-text aluno_MeusArtigos-cardData-Materia">Há 4 dias</p>
                      </div>
                      {/* <div className='aluno_MeusArtigos-row'></div> */}
                      <div class="aluno_MeusArtigos-row"></div>
                    </div>
  
                    <div class="card aluno_MeusArtigos-card-Materia">
                      <img src="../img/foto_meusArtigos.svg" class="card-img-top-meusArtigos" alt="Imagem do Artigo" />
                      <div class="card-body aluno_MeusArtigos-cardBody-Materia">
                        <h5 class="card-title  aluno_MeusArtigos-cardTitle-Materia">The new way of english</h5>
                        <div class='aluno_MeusArtigos-cardUser-Materia'>
                          <img src="../../../img/ft-Perfil.svg" class="aluno_MeusArtigos-cardImg-Materia" alt="Foto de Perfil" />
                          <p class="card-text  aluno_MeusArtigos-cardSubTitle-Materia">Ciclana dos Santos Luise</p>
                        </div>
  
                        <p class="card-text aluno_MeusArtigos-cardData-Materia">Há 4 dias</p>
                      </div>
                      {/* <div className='aluno_MeusArtigos-row'></div> */}
                      <div class="aluno_MeusArtigos-row"></div>
                    </div>
                  </div>
                 
                </div>
              </div>
            </div>
          </div>
          
          {/* Right SIDE */}
          <div class="col-md-4 aluno_MeusArtigos-rightSide">
            <div class="card my-4 aluno_MeusArtigos-rightSide-Perfil">
             <CardPerfil/>
            </div>
            
            <div class="card my-4 aluno_MeusArtigos-rightSide-MaisLidos">
              <div class="card-body aluno_MeusArtigos-rightSide-MaisLidos-card-body">
                <div className='aluno_MeusArtigos-rightSide-MaisLidos-title'>
                  <h3 class="card-title">MAIS LIDOS</h3>
                  <i class='bx bx-heart'></i>
                </div>
  
                <ul class="list-group list-group-flush">
                  <li class="list-group-item d-flex aluno_MeusArtigos-rightSide-MaisLidos-materias">
                    <div className='aluno_MeusArtigos-rightSide-MaisLidos-materias-number'>
                      <p>1</p>
                    </div>
                    <div className='aluno_MeusArtigos-rightSide-MaisLidos-materias-title'>
                      <h4>The travel for L.A</h4>
                      <h5>The travel for L.A</h5>
                    </div>
                    <div className='aluno_MeusArtigos-rightSide-MaisLidos-materias-icon'>
                      <i class="bi bi-eye"></i>
                    </div>
  
                  </li>
                  <li class="list-group-item d-flex aluno_MeusArtigos-rightSide-MaisLidos-materias">
                    <div className='aluno_MeusArtigos-rightSide-MaisLidos-materias-number'>
                      <p>1</p>
                    </div>
                    <div className='aluno_MeusArtigos-rightSide-MaisLidos-materias-title'>
                      <h4>The travel for L.A</h4>
                      <h5>The travel for L.A</h5>
                    </div>
                    <div className='aluno_MeusArtigos-rightSide-MaisLidos-materias-icon'>
                      <i class="bi bi-eye"></i>
                    </div>
  
                  </li>
                  <li class="list-group-item d-flex aluno_MeusArtigos-rightSide-MaisLidos-materias">
                    <div className='aluno_MeusArtigos-rightSide-MaisLidos-materias-number'>
                      <p>1</p>
                    </div>
                    <div className='aluno_MeusArtigos-rightSide-MaisLidos-materias-title'>
                      <h4>The travel for L.A</h4>
                      <h5>The travel for L.A</h5>
                    </div>
                    <div className='aluno_MeusArtigos-rightSide-MaisLidos-materias-icon'>
                      <i class="bi bi-eye"></i>
                    </div>
  
                  </li>
                  <li class="list-group-item d-flex aluno_MeusArtigos-rightSide-MaisLidos-materias">
                    <div className='aluno_MeusArtigos-rightSide-MaisLidos-materias-number'>
                      <p>1</p>
                    </div>
                    <div className='aluno_MeusArtigos-rightSide-MaisLidos-materias-title'>
                      <h4>The travel for L.A</h4>
                      <h5>The travel for L.A</h5>
                    </div>
                    <div className='aluno_MeusArtigos-rightSide-MaisLidos-materias-icon'>
                      <i class="bi bi-eye"></i>
                    </div>
  
                  </li>
                  <li class="list-group-item d-flex aluno_MeusArtigos-rightSide-MaisLidos-materias">
                    <div className='aluno_MeusArtigos-rightSide-MaisLidos-materias-number'>
                      <p>1</p>
                    </div>
                    <div className='aluno_MeusArtigos-rightSide-MaisLidos-materias-title'>
                      <h4>The travel for L.A</h4>
                      <h5>The travel for L.A</h5>
                    </div>
                    <div className='aluno_MeusArtigos-rightSide-MaisLidos-materias-icon'>
                      <i class="bi bi-eye"></i>
                    </div>
  
                  </li>
  
                </ul>
              </div>
            </div>
          </div>
          
          {/* Modal em si */}
          <ModalPerfil/>
  
        </div>
      </div>
  
    );
}

export default Meus_artigos;
