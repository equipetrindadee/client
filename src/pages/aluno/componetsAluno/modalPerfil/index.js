import React,{useState} from 'react';
import '../modalPerfil/modalPerfil.css'; // Inclua o arquivo CSS que você criará
import 'bootstrap/dist/css/bootstrap.min.css';

function ModalPerfil() {
    const [text, setText] = useState(''); // Estado para o conteúdo do textarea
  const maxCharacters = 200; // Limite de caracteres
  // Função que conta o número de caracteres (incluindo espaços)
  const countCharacters = (str) => {
    return str.length; // Conta o total de caracteres (incluindo espaços)
  };

  // Função para lidar com a mudança de texto
  const handleChange = (e) => {
    const newText = e.target.value;
    if (newText.length <= maxCharacters) {
      setText(newText); // Atualiza o estado apenas se não exceder o limite
    }
  };

    return (
        <div class="modal fade aluno_MeusArtigos-rightSide-Modal" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog aluno_MeusArtigos-rightSide-Modal-dialog">
            <div class="modal-content aluno_MeusArtigos-rightSide-Modal-content">
              <div class="modal-body aluno_MeusArtigos-rightSide-Modal-body">
                <div className='aluno_MeusArtigos-rightSide-Modal-img'>
                  <img src="../../../img/ft-Perfil.svg" class="card-img-top " alt="Imagem do Artigo" />
                </div>


                <div class="mb-3 aluno_MeusArtigos-rightSide-Modal-input">
                  <label for="exampleFormControlInput1" class="form-label">Nome Completo</label>
                  <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Daisy Bloom" />
                </div>
                <div class="mb-3 aluno_MeusArtigos-rightSide-Modal-input">
                  <label for="exampleFormControlInput1" class="form-label">Email</label>
                  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="daisybloom@portalsesisp.org.br" />
                </div>
                <div class="mb-3 aluno_MeusArtigos-rightSide-Modal-input">
                  <label for="exampleFormControlInput1" class="form-label">Coluna</label>
                  <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Palavreando" />
                </div>
                <div class="mb-3 aluno_MeusArtigos-rightSide-Modal-input">
                  <label for="exampleFormControlInput1" class="form-label">Ano escolar</label>
                  <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="6ºA - Ensino Fundamental " />
                </div>

                <div class="mb-3 aluno_MeusArtigos-rightSide-Modal-input-textarea">
                  <label for="exampleFormControlTextarea1" class="form-label">Sua breve apresentação</label>
                  <textarea
                    className="form-control"
                    rows="5"
                    value={text}
                    onChange={handleChange} // Atualiza o estado ao digitar
                    class="form-control" id="exampleFormControlTextarea1"></textarea>
                  <div className="mt-2 aluno_MeusArtigos-rightSide-Modal-input-textarea-number ">
                    {countCharacters(text)} / {maxCharacters}
                  </div>
                </div>

              </div>
              <div class="modal-footer aluno_MeusArtigos-rightSide-Modal-footer">
                <button type="button" class="btn " data-bs-dismiss="modal">Fechar</button>
              </div>
            </div>
          </div>
        </div>
    );
}

export default ModalPerfil;
