import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
/* import NavbarUserComum from '../../navBar/navBarUserComum'; */
import { Navigation } from 'swiper/modules';
import 'bootstrap/dist/css/bootstrap.min.css';  // Importando o CSS do Bootstrap
import './LandPage.css';  // Seu CSS personalizado
import 'swiper/css'; // Importa os estilos básicos do Swiper
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Rodape from '../Rodape';


export const LandPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimatingLeft, setIsAnimatingLeft] = useState(false);
  const [isAnimatingRight, setIsAnimatingRight] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(6);
  const [colunas, setColunas] = useState([]); // Novo estado para armazenar as colunas
  const [acesso, setAcesso] = useState(''); // Estado para armazenar o nome do usuário
  const [colunasC, setColunasC] = useState(''); // Estado para armazenar o nome do usuário

  const navigate = useNavigate()

  useEffect(() => {
    const db = getFirestore();
    const colRef = collection(db, "colunas");
  
    // Função para carregar as colunas do Firebase
    const fetchData = async () => {
      const querySnapshot = await getDocs(colRef);
      const colunasData = querySnapshot.docs.map(doc => doc.data());
      setColunas(colunasData); // Atualiza o estado com as colunas do Firebase
    };
  
    fetchData();
  }, []);
  const itemsColunas = [
    { id: 1, title: 'Além do Livro', className: 'alemLivroButton-dashboard-professor', href: '#' },
    { id: 2, title: 'Além das Fronteiras', className: 'alemFronteirasButton-dashboard-professor', href: '#' },
    { id: 3, title: 'Educação em foco', className: 'educacaoFocoButton-dashboard-professor', href: '#' },
    { id: 4, title: 'Monthly dose of english', className: 'monthlyEnglishButton-dashboard-professor', href: '#' },
    { id: 5, title: 'Palavreando', className: 'palavreandoButton-dashboard-professor', href: '#' },
    { id: 6, title: 'Aconteceu na escola', className: 'aconteceuEscolaButton-dashboard-professor', href: 'http://localhost:3000/publicacao' },
    { id: 7, title: 'Tecnologia', className: 'tecnologiaButton-dashboard-professor', href: '#' },
    { id: 8, title: 'Aventuras na História', className: 'aventurasHistoriFutton-dashboard-professor', href: '#' },
    { id: 9, title: 'Biofímica em ação', className: 'biofimicaAcaoButton-dashboard-professor', href: '#' },
  ];
  const handleClick = (colunaName) => {
    // Encontra a coluna selecionada diretamente do estado colunas
    const colunaSelecionada = colunas.find(c => c.columname === colunaName);
  
    if (colunaSelecionada) {
      // Salva as informações no localStorage para uso posterior, se necessário
      localStorage.setItem("ColumName", colunaName);
      localStorage.setItem("colunaColor", colunaSelecionada.color); // Salvando a cor
      localStorage.setItem("bannerImage", colunaSelecionada.imageColumn); // Salvando a imagem do banner
  
      // Navega para a página de carrossel de matérias
      navigate("/userComum/listarArtigos");
    } else {
      alert("Coluna não encontrada.");
    }
  };
  const visibleColunas = [];
for (let i = 0; i < itemsToShow; i++) {
  // Verifica se a coluna está ativa antes de adicioná-la
  const coluna = colunas[(currentIndex + i) % colunas.length];
  if (coluna?.estadoColuna === 'ativo') {
    visibleColunas.push(coluna.columname); // Usando o campo columname
  }
}
    const handlePrev = () => {
      if (!isAnimatingLeft) {
        setIsAnimatingLeft(true);
        setTimeout(() => {
          setCurrentIndex((prevIndex) => prevIndex === 0 ? itemsColunas.length - 1 : prevIndex - 1);
          setIsAnimatingLeft(false);
        }, 250); // Duração da animação
      }
    };
  
    const handleNext = () => {
      if (!isAnimatingRight) {
        setIsAnimatingRight(true);
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex === itemsColunas.length - 1 ? 0 : prevIndex + 1));
          setIsAnimatingRight(false);
        }, 250); // Duração da animação
      }
    };
  
    // Definindo o estado para armazenar a data
    const [currentDate, setCurrentDate] = useState('');
  
    useEffect(() => {
      const date = new Date(); // Cria uma nova instância de data
      const formattedDate = date.toLocaleDateString('pt-BR'); // Formata a data no formato DD/MM/YYYY
      setCurrentDate(formattedDate); // Atualiza o estado com a data formatada
    }, []); // O array vazio faz com que o efeito execute apenas uma vez quando o componente é montado
  
     // Estado para controlar se o usuário está logado ou não
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Verifica se o token existe no localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []); // Executa uma vez após o componente ser montado

    return (
      <div className="container-fluid home">
    <header className='home_header'>
      <div className='home_date'>
        <span>{currentDate}</span>
      </div>
      <div className='home_header-left'>
        <ul style={{ marginBottom: '0rem' }}>
          <a href='/userComum/faleConosco'>
            <li className='home_li-1'>
              <span>Fale Conosco</span>
              <img src='../img/fale_conosco-img.svg' alt="Fale Conosco" />
            </li>
          </a>
          <a href='/userComum/colunistaUsuario'>
            <li className='home_li-2'>
              <span>Colunistas</span>
              <img src='../img/colunistas-img.svg' alt="Colunistas" />
            </li>
          </a>
          <a href='/userComum/sobreNos'>
            <li className='home_li-3'>
              <span>Sobre nós</span>
              <img src='../img/sobre_nos-img.svg' alt="Sobre Nós" />
            </li>
          </a>
          
          {/* Exibe o link de Login ou ícone de User dependendo do estado de login */}
          {!isLoggedIn ? (
            <a href='/login'>
              <li className='home_li-5'>
                <span>Login</span>
                <img src='../img/login-img.svg' alt="Log In" />
              </li>
            </a>
          ) : (
            <a href='/userComum/perfil'>
              <li className='home_li-5'>
                <span>Usuário</span>
                <img src='../img/user-icon.svg' alt="Usuário" />
              </li>
            </a>
          )}
        </ul>
      </div>
    </header>
        <div class="container-sm home_1">
          <nav className='home_main-title'>
            <h2 className='home_title'>O EDUCADOR</h2>
            <span className='home_subtitle'>TE MANTER INFORMADO É A NOSSA MISSÃO</span>
          </nav>
          {/* Carrossel do Topo, tela Professor */}
          <div className="carrosselDashboard-Professor">
            <i className="bi bi-caret-left-fill arrowLeft" onClick={handlePrev}></i>
            <div className={`colunaSlide-dashboard-professor ${isAnimatingLeft ? 'animatingLeft' : ''}${isAnimatingRight ? 'animatingRight' : ''}`}>
              {visibleColunas.map((coluna, index) => (
                <a
                  key={index}
                  className="coluna divColuna-dashboard-professor"
                  style={{ backgroundColor: colunas.find(c => c.columname === coluna)?.color }} // Define a cor de fundo
                  onClick={() => handleClick(coluna)} // Chama a função de clique
                >
                  <h3 className='titleColunas-dashboard-professor'>{coluna}</h3>
                  <i className="bi bi-play-circle-fill buttonColunas-dashboard-professor"></i>
                </a>
              ))}
            </div>
            <i className="bi bi-caret-right-fill arrowRight" onClick={handleNext}></i>
          </div>
          {/* Fim do Carrossel Topo */}
  
          <div className='container-sm home_2'>
            <aside className='home_aside'>
              <div className='home_aside-content'>
                <h2>Grêmio Estudantil</h2>
                <h4>Interclasse - A Emoção de Competir</h4>
                <p>A disputa foi acirrada, mas o espírito de equipe e a paixão marcaram o nosso Interclasse! Com jogos emocionantes e muita energia, os participantes deram o melhor de si para levar sua equipe à vitória!Confira os melhores momentos dessa competição que reuniu talento e união entre todos.</p>
              </div>
              <div className='home_aside-content'>
                <h4>Happy Day - Diversão Garantida</h4>
                <p>O Happy Day foi um evento especial e inesquecível para todos que participaram! Trouxemos brinquedos infláveis super divertidos, como o touro mecânico, futebol de sabão e o cotonete, garantindo muita diversão e risadas para todos! Além disso, registramos momentos únicos com as Polaroid, criando lembranças especiais para todos que estiveram presentes. Foi um dia repleto de alegria, energia contagiante e diversão para todas as idades!  </p>
                {/* <span>Há 2 dias</span> */}
              </div>
            </aside>
            <article className='home_article'>
              <div className='home_article-content' id='home_article-content-1'>
                <div className='home_article_img-container_1'>
                  <div className='home_article_img1'></div>
                  <span className='home_article_img-credits' style={{ float: 'left' }}>BY Isabelly Dias & Ketellen Tsutsumi </span>
                </div>
                <div className='home_article-text'>
                  <h4>A influência dos livros na vida cotidiana </h4>
                  <h5>Retirado e adaptado do site da BBC NEWS</h5>
                  <p>Que a leitura é importante nós já sabemos, mas você já imaginou como ela influencia sua vida? Na coluna “além do livro” desse mês, você vai explorar esse tema e ainda ganhar indicações de booktubers!</p>
                  {/* <span>Há 2 dias</span> */}
                </div>
              </div>
              <div className='home_article-content' id='home_article-content-2'>
                <div className='home_article-text'>
                  <h4>Marketing Digital</h4>
                  <h5>Retirado e adaptado do site da BBC NEWS</h5>
                  <p>Sabe o que é marketing digital? Ele pode estar presente em sua vida e você nem percebe. Se liga e leia mais na coluna de tenologia!</p>
                  {/* <span>Há 2 dias</span> */}
                </div>
                <div className='home_article_img-container_2'>
                  <div className='home_article_img2'></div>
                  <span className='home_article_img-credits' style={{ float: 'right' }}>BY Brayan Santana, João Vitor, Luiza Torezan, Nicolas Aquino e  Yago Ponce</span>
                </div>
              </div>
  
              <div className='home_article-content' id='home_article-content-responsive-desktop'>
                <div className='home_article-text'>
                  <h4>Marketing Digital</h4>
                  <h5>Retirado e adaptado do site da BBC NEWS</h5>
                  <p>Sabe o que é marketing digital? Ele pode estar presente em sua vida e você nem percebe. Se liga e leia mais na coluna de tenologia!</p>
                  {/* <span>Há 2 dias</span> */}
                </div>
                <div className='home_article_img-container'>
                  <div className='home_article_img2'></div>
                  <span className='home_article_img-credits' style={{ float: 'right' }}>BY Brayan Santana, João Vitor, Luiza Torezan, Nicolas Aquino e  Yago Ponce</span>
                </div>
              </div>
  
              <div className='home_article-content' id='home_article-content-responsive'>
                <div className='home_article_img-container'>
                  <div className='home_article_img2'></div>
                  <span className='home_article_img-credits' style={{ float: 'right' }}>BY Brayan Santana, João Vitor, Luiza Torezan, Nicolas Aquino e  Yago Ponce</span>
                </div>
                <div className='home_article-text'>
                  <h4>Marketing Digital</h4>
                  <h5>Retirado e adaptado do site da BBC NEWS</h5>
                  <p>Sabe o que é marketing digital? Ele pode estar presente em sua vida e você nem percebe. Se liga e leia mais na coluna de tenologia!</p>
                  {/* <span>Há 2 dias</span> */}
                </div>
              </div>
            </article>
          </div>
          {/*  Inico da Galeria */}
          <section className="gallery_section">
            <div className="gallery_section-text">
              <h2 className="gallery_section-title">Galeria</h2>
              <p className="gallery_section-subtitle">
                TODAS AS FOTOS FORAM RETIRADAS DO NOSSO ARQUIVO PESSOAL
              </p>
            </div>
  
            <div className="gallery-container desktop">
              <div className="gallery-item first">
                <img src='../img/gallery_item_first-img.svg' alt="First Large" />
              </div>
  
              <div className="gallery-item middle-top">
                <img src='../img/gallery_item_top-img.svg' alt="Middle Top" />
              </div>
  
              <div className="gallery-item middle-bottom">
                <img src='../img/gallery_item_bottom-img.svg' alt="Middle Bottom" />
              </div>
  
              <div className="gallery-item last">
                <img src='../img/gallery_item_last-img.svg' alt="Last Large" />
              </div>
            </div>
  
            <Swiper
              className="gallery-container mobile"
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
              }}
            >
              <SwiperSlide>
                <img src='../img/gallery_item_first-img.svg' alt="First Large" />
              </SwiperSlide>
  
              <SwiperSlide>
                <img src='../img/gallery_item_top-img.svg' alt="Middle Top" />
              </SwiperSlide>
  
              <SwiperSlide>
                <img src='../img/gallery_item_bottom-img.svg' alt="Middle Bottom" />
              </SwiperSlide>
  
              <SwiperSlide>
                <img src='../img/gallery_item_last-img.svg' alt="Last Large" />
              </SwiperSlide>
            </Swiper>
          </section>
          {/* Fim da galeria */}

          {/* COLUNA DESTAQUE  */}
          <article className='article_recent-news'>
            <header className='article_recent-news-header'>
              <h1>Aconteceu na escola</h1>
            </header>
            <div className='article_recent-news-container'>
              <div className='article_recent-news-content_1'>
                <div className='article_recent-news_text'>
                  <h4>Debater IA</h4>
                  <p>O debate sobre Inteligência Artificial foi um momento crucial para refletirmos sobre as mudanças tecnológicas que estão moldando nosso futuro! Especialistas discutiram o impacto da IA na sociedade, economia e no cotidiano das pessoas. Um encontro importante para entender as oportunidades e os desafios dessa revolução digital.</p>
                  {/* <span>Há 2 dias</span> */}
                </div>
                <div className='article_recent-news_line' />
                <div className='article_recent-news_text'>
                  <h4>Desfile de Roupas Ecológicas</h4>
                  <p> O Desfile de Roupas Ecológicas foi um marco de conscientização ambiental! Com peças criadas a partir de materiais reciclaveis, o evento destacou a importância de práticas responsáveis no mundo da moda. O tema deste ano foi 'Teatro Clássicos', e as apresentações trouxeram clássicos inesquecíveis: o 2º ano com o 'Cisney Negro', o 1º ano com 'O Fantasma da Ópera', e o 3º ano com 'Romeu e Julieta'.</p>
                  {/* <span>Há 2 dias</span> */}
                </div>
              </div>
              <div className='article_recent-news-content_2'>
                <div className='article_recent-news-img' />
              </div>
            </div>
            <div className='go-to_button'>
              <button class="go-to_animated-button">
                <svg xmlns="http://www.w3.org/2000/svg" class="go-to_arr-2" viewBox="0 0 24 24">
                  <path
                    d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                  ></path>
                </svg>
                <span class="go-to_text">IR PARA COLUNA</span>
                <span class="go-to_circle"></span>
                <svg xmlns="http://www.w3.org/2000/svg" class="go-to_arr-1" viewBox="0 0 24 24" fill='#fff'>
                  <path
                    d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                  ></path>
                </svg>
              </button>
            </div>
          </article>
        </div>
        {/* <footer className='home_footer'>
          <h1>O EDUCADOR</h1>
          <div className='contact_container'>
            <h2>Contato</h2>
            <div className='contact_email'>
              <img src='../img/contact_email-img.svg'></img>
              <p>admin@educaa.com.br</p>
            </div>
            <div className='contact_number'>
              <img src='../img/contact_number-img.svg'></img>
              <p>11 12345-6789</p>
            </div>
          </div>
  
          <div className='contact_container'>
            <h2>Contato</h2>
            <div className='contact_email'>
              <img src='../img/contact_email-img.svg'></img>
              <p>admin@educaa.com.br</p>
            </div>
            <div className='contact_number'>
              <img src='../img/contact_number-img.svg'></img>
              <p>11 12345-6789</p>
            </div>
          </div>
  
          <div className='contact_container'>
            <h2>Contato</h2>
            <div className='contact_email'>
              <img src='../img/contact_email-img.svg'></img>
              <p>admin@educaa.com.br</p>
            </div>
            <div className='contact_number'>
              <img src='../img/contact_number-img.svg'></img>
              <p>11 12345-6789</p>
            </div>
          </div>
        </footer> */}
        <Rodape/>
      </div>
    );
};


export default LandPage;