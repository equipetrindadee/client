import React, { useState, useEffect } from 'react';
import { db } from '../../../../config/firebaseImgConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import "../artigo/artigo.css";
import { fromUnixTime } from 'date-fns';

function Artigo({ articleId }) {
    const [articleContent, setArticleContent] = useState(null);
    const [synth, setSynth] = useState(window.speechSynthesis);
    const [status, setStatus] = useState("idle"); // idle, speaking, paused
    const [progress, setProgress] = useState(0);
    const [progressInterval, setProgressInterval] = useState(null);
  
    useEffect(() => {
      const fetchArticleContent = async () => {
        if (articleId) {
          const docRef = doc(db, "jornal", articleId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setArticleContent(docSnap.data());
          } else {
            console.log("Nenhum artigo encontrado!");
          }
        }
      };
      fetchArticleContent();
    }, [articleId]);

    const iniciarLeitura = () => {
      if (!synth || !articleContent) return;

      synth.cancel();

      const textoParaLer = articleContent.texts?.join(" ") || "Nenhum texto disponível para leitura.";

      const fala = new SpeechSynthesisUtterance(textoParaLer);
      fala.lang = "pt-BR";
      fala.rate = 1.5; // Aumenta a velocidade da fala (1 = normal, >1 = mais rápido)

      const tempoEstimado = textoParaLer.split(" ").length / (3.75); // Estimativa de tempo baseada na quantidade de palavras
      let inicio = Date.now();

      fala.onstart = () => {
        setStatus("speaking");
        setProgress(0);

        // Atualiza o progresso
        const interval = setInterval(() => {
          const tempoDecorrido = (Date.now() - inicio) / 1000;
          const novoProgresso = Math.min((tempoDecorrido / tempoEstimado) * 100, 100);
          setProgress(novoProgresso);

          if (novoProgresso >= 100 || synth.paused || !synth.speaking) {
            clearInterval(interval);
          }
        }, 100);

        setProgressInterval(interval);
      };

      fala.onend = () => {
        setStatus("idle");
        setProgress(100);
        clearInterval(progressInterval);
      };

      synth.speak(fala);
    };

    const pausarLeitura = () => {
      if (synth.speaking && !synth.paused) {
        synth.pause();
        setStatus("paused");
      }
    };

    const continuarLeitura = () => {
      if (synth.paused) {
        synth.resume();
        setStatus("speaking");
      }
    };

    const controlarLeitura = () => {
      if (status === "idle") iniciarLeitura();
      else if (status === "speaking") pausarLeitura();
      else if (status === "paused") continuarLeitura();
    };

    const getIconeBotao = () => {
      if (status === "idle") return "🔊"; // Iniciar
      if (status === "speaking") return "⏸️"; // Pausar
      if (status === "paused") return "▶️"; // Continuar
    };

    return (
        <div className="article-container">
            <div className="user_publicacao-materia-controle-texto">
                <div className="audio-controller">
                    <button onClick={controlarLeitura} className="audio-button">
                        {getIconeBotao()}
                    </button>
                    <div className="audio-progress-container">
                        <div
                            className="audio-progress-bar"
                            style={{
                                width: `${progress}%`,
                                transition: status === "speaking" ? "width 0.1s linear" : "none",
                            }}
                        ></div>
                    </div>
                </div>

                <div className='user_publicacao-materia'>
                    <div className="user_publicacao-materia-title">
                        <h3>{articleContent?.title || "Título do Artigo"}</h3>
                    </div>

                    <div className="user_publicacao-materia-text-esquerdo">
                        {articleContent?.texts?.map((text, index) => (
                            <p key={index}>{text}</p>
                        ))}
                    </div>

                    <div className="user_publicacao-materia-img-direito">
                        <img src="../img/meninoBackGroundLoginGeneral.svg" alt="logo" />
                    </div>

                    <div className="user_publicacao-materia-paragrafo">
                        {articleContent?.texts?.map((text, index) => (
                            <p key={index}>{text}</p>
                        ))}
                    </div>

                    <div className="user_publicacao-materia-img-esquerdo">
                        <img src="../img/meninoBackGroundLoginGeneral.svg" alt="imagem 1" />
                    </div>

                    <div className="user_publicacao-materia-text-centro">
                        {articleContent?.texts?.map((text, index) => (
                            <p key={index}>{text}</p>
                        ))}
                    </div>

                    <div className="user_publicacao-materia-paragrafo-inferior">
                        {articleContent?.texts?.map((text, index) => (
                            <p key={index}>{text}</p>
                        ))}
                    </div>
                </div>

                <div className="user_publicacao-materia-footer">
                    <div className='user_publicacao-materia-footer-item'>
                        <div className='user_publicacao-materia-footer-img'>
                            <img src="../img/meninoBackGroundLoginGeneral.svg" alt="logo" />
                        </div>
                        <div className='user_publicacao-materia-footer-text'>
                            <p>Leia na íntegra sobre a digitalização do jornal 'O Educador' e descubra como a comunidade escolar está se transformando</p>
                        </div>
                    </div>

                    <div className='user_publicacao-materia-footer-item'>
                        <div className='user_publicacao-materia-footer-img'>
                            <img src="../img/meninoBackGroundLoginGeneral.svg" alt="logo" />
                        </div>
                        <div className='user_publicacao-materia-footer-text'>
                            <p>Leia na íntegra sobre a digitalização do jornal 'O Educador' e descubra como a comunidade escolar está se transformando</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Artigo;
