import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../userComum/RecuperarSenha/recuperarSenha.css';
import Group294 from '../../userComum/RecuperarSenha/img/Group 294.svg';

export const RecuperarSenha = () => {
  return (
    <div className="user_RecuperarSenha-parent">

      <div className='user_RecuperarSenha-left'>
        <h1>O EDUCADOR</h1>
        <h6>TE MANTER INFORMADO É NOSSA MISSÃO</h6>
      </div>

      <div className='user_RecuperarSenha-right'>
        <h1>RECUPERAR SENHA</h1>

        <div className="mb-3 user_RecuperarSenha-right-container">
          <label htmlFor="exampleFormControlInput1" className="form-label user_RecuperarSenha-label">
            <p>Email</p>
          </label>
          <input type="email" className="form-control user_RecuperarSenha-borderBlack" id="exampleFormControlInput1" placeholder="" />
        </div>

        <button type="button" className="btn user_RecuperarSenha-button-enviar"><p>ENVIAR</p></button>
        <a className="user_RecuperarSenha-IrParaLogin" href="/Login">Ir para login</a> 

      </div>

    </div>
  );
}

export default RecuperarSenha;
