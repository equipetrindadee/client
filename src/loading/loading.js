import React from "react";
import './loading.css'; // Importa o CSS para estilizar a tela de loading

function Loading() {
    return (
            
        <div className="loading-container" data-test-id="loading">
            <img src="./img/newLoading.gif" alt="Loading..." className="loading-image" />
        </div>
    );
}

export default Loading;
