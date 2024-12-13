import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
/* import NavbarUserComum from '../../navBar/navBarUserComum'; */
import { Navigation } from 'swiper/modules';
import 'bootstrap/dist/css/bootstrap.min.css';  // Importando o CSS do Bootstrap
import './LandPage.css';  // Seu CSS personalizado
import 'swiper/css'; // Importa os estilos básicos do Swiper
/* import faleConoscoImg from '../img/fale_conosco-img.svg'; */
/* import colunistasImg from '../img/colunistas-img.svg'; */
/* import sobreNosImg from '../img/sobre_nos-img.svg'; */
/* import inglesTranslateImg from '../img/ingles_translate-img.svg'; */
/* import loginImg from '../img/login-img.svg'; */
/* import galleryItemFirstImg from '../img/gallery_item_first-img.svg' */
/* import galleryItemTopImg from '../img/gallery_item_top-img.svg' */
/* import galleryItemBottomImg from '../img/gallery_item_bottom-img.svg' */
/* import galleryItemLastImg from '../img/gallery_item_last-img.svg' */
/* import contactEmailImg from '../img/contact_email-img.svg' */
/* import contactNumberImg from '../img/contact_number-img.svg' */
/* import carouselRightArrow from '../img/carousel_right-arrow.svg' */
/* import carouselLeftArrow from '../img/carousel_left-arrow.svg' */

export const LandPage = () => {
  const images = [
    { src: "https://via.placeholder.com/300x300", alt: "Image 1", className: "large" },
    { src: "https://via.placeholder.com/300x200", alt: "Image 2", className: "medium" },
    { src: "https://via.placeholder.com/400x400", alt: "Image 3", className: "small" },
    { src: "https://via.placeholder.com/300x400", alt: "Image 4", className: "large" },
    { src: "https://via.placeholder.com/300x500", alt: "Image 5", className: "medium" },
  ];

  const items = [
    { color: '#CFA7F5', text: 'Além do livro' },
    { color: '#D64D4D', text: 'Além das fronteiras' },
    { color: '#AFF78D', text: 'Educação em foco' },
    { color: '#624CF5', text: 'Monthly dose of english' },
    { color: '#F5E14C', text: 'Palavreando' },
    { color: '#A37452', text: 'Aventuras na história' },
    { color: '#65CCC9', text: 'Biofímica em ação' },
  ];

  // Definindo o estado para armazenar a data
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const date = new Date(); // Cria uma nova instância de data
    const formattedDate = date.toLocaleDateString('pt-BR'); // Formata a data no formato DD/MM/YYYY
    setCurrentDate(formattedDate); // Atualiza o estado com a data formatada
  }, []); // O array vazio faz com que o efeito execute apenas uma vez quando o componente é montado

  return (
    <div className="container-fluid home">
      <header className='home_header'>
        <div className='home_date'>
          <span>{currentDate}</span>
        </div>
        <div className='home_header-left'>
          <ul style={{ marginBottom: '0rem' }}>
            <a href='/userComum/faleConosco'><li className='home_li-1'><span>Fale Conosco</span><img src='../img/fale_conosco-img.svg' alt="Fale Conosco" /></li></a>
            <a><li className='home_li-2'><span>Colunistas</span><img src='../img/colunistas-img.svg' alt="Colunistas" /></li></a>
            <a><li className='home_li-3'><span>Sobre nós</span><img src='../img/sobre_nos-img.svg' alt="Sobre Nós" /></li></a>
            <a><li className='home_li-5'><span>Login</span><img src='../img/login-img.svg' alt="Log In" /></li></a>
          </ul>
        </div>
      </header>
      <div class="container-sm home_1">
        <nav className='home_main-title'>
          <h2 className='home_title'>O EDUCADOR</h2>
          <span className='home_subtitle'>TE MANTER INFORMADO É A NOSSA MISSÃO</span>
        </nav>
        <div className='carousel_container'>
          <div style={{ maxWidth: '1800px', margin: '0 auto', position: 'relative' }}>
            <Swiper
              modules={[Navigation]} 
              navigation={{
                prevEl: '.custom-prev', // Botão "Anterior"
                nextEl: '.custom-next', // Botão "Próximo"
              }}
              spaceBetween={20}
              slidesPerView={6}
              loop={true} // Torna o carrossel infinito
              breakpoints={{
                1024: { slidesPerView: 5 }, // Desktops maiores
                768: { slidesPerView: 3 },  // Tablet
                480: { slidesPerView: 2 },  // Celular
                320: { slidesPerView: 2 },  // Pequenos dispositivos
              }}
            >
              {items.map((item, index) => (
                <SwiperSlide key={index}>
                  <div
                    style={{
                      backgroundColor: item.color,
                      borderRadius: '8px',
                      padding: '20px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      color: '#fff',
                      fontFamily: 'Rajdhani-Bold',
                      fontSize: '15px',
                      height: '80px',
                    }}
                  >
                    {item.text}
                    <span style={{ fontSize: '24px' }}>▶</span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Botão "Anterior" */}
            <button
              className='custom-prev'
              style={{
                position: 'absolute',
                top: '50%',
                left: '-40px',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                zIndex: 10,
              }}
            >
              <img
                src='../img/carousel_left-arrow.svg' // Certifique-se que a variável carouselLeftArrow está definida corretamente
                alt="Anterior"
                style={{ width: '24px', height: '24px' }}
              />
            </button>

            {/* Botão "Próximo" */}
            <button
              className='custom-next'
              style={{
                position: 'absolute',
                top: '50%',
                right: '-40px',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                zIndex: 10,
              }}
            >
              <img
                src='../img/carousel_right-arrow.svg' // Certifique-se que a variável carouselRightArrow está definida corretamente
                alt="Próximo"
                style={{ width: '24px', height: '24px' }}
              />
            </button>
          </div>
        </div>
        <div className='container-sm home_2'>
          <aside className='home_aside'>
            <div className='home_aside-content'>
              <h2>Grêmio Estudantil</h2>
              <h4>What is Lorem Ipsum?</h4>
              <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
              <span>Há 2 dias</span>
            </div>
            <div className='home_aside-content'>
              <h4>What is Lorem Ipsum?</h4>
              <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
              <span>Há 2 dias</span>
            </div>
          </aside>
          <article className='home_article'>
            <div className='home_article-content' id='home_article-content-1'>
              <div className='home_article_img-container_1'>
                <div className='home_article_img'></div>
                <span className='home_article_img-credits' style={{float: 'left'}}>BY NAOSEI FROM FALANO CICLANO</span>
              </div>
              <div className='home_article-text'>
                <h4>Where does it come from?</h4>
                <h5>Retirado e adaptado do site da BBC NEWS</h5>
                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
                <span>Há 2 dias</span>
              </div>
            </div>
            <div className='home_article-content' id='home_article-content-2'>
              <div className='home_article-text'>
                <h4>Where does it come from?</h4>
                <h5>Retirado e adaptado do site da BBC NEWS</h5>
                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
                <span>Há 2 dias</span>
              </div>
              <div className='home_article_img-container_2'>
                <div className='home_article_img'></div>
                <span className='home_article_img-credits' style={{float: 'right'}}>BY NAOSEI FROM FALANO CICLANO</span>
              </div>
            </div>

            <div className='home_article-content' id='home_article-content-responsive-desktop'>
              <div className='home_article-text'>
                <h4>Where does it come from?</h4>
                <h5>Retirado e adaptado do site da BBC NEWS</h5>
                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
                <span>Há 2 dias</span>
              </div>
              <div className='home_article_img-container'>
                <div className='home_article_img'></div>
                <span className='home_article_img-credits' style={{float: 'right'}}>BY NAOSEI FROM FALANO CICLANO</span>
              </div>
            </div>

            <div className='home_article-content' id='home_article-content-responsive'>
              <div className='home_article_img-container'>
                <div className='home_article_img'></div>
                <span className='home_article_img-credits' style={{float: 'right'}}>BY NAOSEI FROM FALANO CICLANO</span>
              </div>
              <div className='home_article-text'>
                <h4>Where does it come from?</h4>
                <h5>Retirado e adaptado do site da BBC NEWS</h5>
                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
                <span>Há 2 dias</span>
              </div>
            </div>
          </article>
        </div>
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
        <article className='article_recent-news'>
          <header className='article_recent-news-header'>
            <h1>Aconteceu na escola</h1>
          </header>
          <div className='article_recent-news-container'>
            <div className='article_recent-news-content_1'>
              <div className='article_recent-news_text'>
                <h4>What is Lorem Ipsum?</h4>
                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
                <span>Há 2 dias</span>
              </div>
              <div className='article_recent-news_line'/>
              <div className='article_recent-news_text'>
                <h4>What is Lorem Ipsum?</h4>
                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
                <span>Há 2 dias</span>
              </div>
            </div>
            <div className='article_recent-news-content_2'>
              <div className='article_recent-news-img'/>
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
      <footer className='home_footer'>
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
      </footer>
    </div>
  );
}

export default LandPage;