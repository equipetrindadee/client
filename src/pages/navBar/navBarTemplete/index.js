import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../../navBar/navBarTemplete/navBarTemplete.css";

export const NavBarTemplete = () => {
    return (

        <div className='containerTemplete'>
 
                <div className='style-educador'>
                <div className='navbar-texto'>
                    <h1>O EDUCADOR</h1>

                    <h6>TE MANTER INFORMADO É NOSSA MISSÃO</h6>
                </div>

                <div className='nav-visualizar-buttom'>
                <button type="button" class="btn btn-outline button-icon-visualizar">
                <p>VISUALIZAR PÁGINA ANTERIOR</p>
                    <i class='bx bx-chevron-right'></i>
                    </button>
                </div>

                    <div className="navbar-aluno-edits-jornal">
                    <button>
                    <i class='bx bx-chevron-left'></i>
                    </button>
                    <h1>TÍTULO</h1>
                    </div>   

                         <div className="aluno_templete2-grid">

                            <div className="aluno_templete2-text1">
                              <textarea id="w3review" name="w3review" rows="4" cols="50">
                              </textarea>
                            </div>

                            <div className="aluno_templete2-img1">
                             <label htmlFor="fileInput1" className="custom-file-label">Escolher arquivo</label>
                             <input type="file" id="fileInput1" name="filename"/>
                            </div>

                            <div className="aluno_templete2-img2">
                             <label htmlFor="fileInput2" className="custom-file-label">Escolher arquivo</label>
                             <input type="file" id="fileInput2" name="filename"/>
                            </div>

                            <div className="aluno_templete2-text2">
                            <textarea id="w3review" name="w3review" rows="4" cols="50">
                            </textarea>
                            </div>

                           <div className="aluno_templete2-text3">
                            <textarea id="w3review" name="w3review" rows="4" cols="50">
                            </textarea>
                           </div>
                            
                           <div className="aluno_templete2-img3">
                             <label htmlFor="fileInput3" className="custom-file-label">Escolher arquivo</label>
                            <input type="file" id="fileInput3" name="filename"/>
                           </div>        
                     </div>          
                </div>

                     <div className='aluno_templete-rightscreen'>

                        <div className="aluno-templete-body">
                            <p>oi</p>
                        </div>

                     </div>

        </div>
    )
}

export default NavBarTemplete