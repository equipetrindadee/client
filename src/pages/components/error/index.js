import React from "react"
import "../../../pages/components/error/error.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import NavBaraluno from '../../navBar/navBarAluno'
import {container,row,col} from 'react-bootstrap'


function ErrorCelular(){
    return(
        <div class="admin-error-body" >
            
            <div class="admin-error-container">
        <img src="./img/Fatal_error_Illustration-removebg-preview 1.svg" alt=""/>
    </div>

    <div>
        <p class= "p">Página indisponível para esse dispositivo, por favor se direcione para um computador</p>
    </div>

        </div>
    )
}

export default ErrorCelular