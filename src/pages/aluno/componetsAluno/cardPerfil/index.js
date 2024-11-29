import React from "react";
import "../cardPerfil/cardPerfil.css"

function CardPerfil() {
    return (
        <div>
            <div class="card-body aluno_MeusArtigos-rightSide-Perfil-infos">
                {/* Botão que abre o modal */}
                <button type="button" class="btn card-body aluno_MeusArtigos-rightSide-Perfil-button " data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    <p>Perfil</p>
                </button>
                <div className='aluno_MeusArtigos-rightSide-Perfil-body-info'>
                    <img src="../../../img/ft-Perfil.svg" class="rounded-circle" width="50" height="50" alt="Imagem do Perfil" />
                    <h5 class="card-title">Daisy Bloom</h5>
                </div>
            </div>
                
        </div>
    )
}

export default CardPerfil