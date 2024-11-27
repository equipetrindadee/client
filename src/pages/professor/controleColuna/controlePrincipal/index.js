import React from 'react';
import NavBarProfessor from '../../../navBar/navBarProfessor/index.js';
import ContentColuna from '../contentColuna/index.js';

import ModalCriarUsuario from '../criarUsuario/index.js'



import './controle.css'; // Mantemos o arquivo CSS

function ControleColuna() {
    return (
        <div className='controleColunaContainer'>
            
            <div className='navBarWrapper'>
                <NavBarProfessor />
            </div>
            
            <div className='contentWrapper'>
            
                <ContentColuna />
                
                
            </div>
        </div>
    );
}

export default ControleColuna;
