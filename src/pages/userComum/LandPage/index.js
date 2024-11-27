import React, { useEffect, useState } from 'react';
import "../../userComum/LandPage/LandPage.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

export const LandPage = () => {
    const [activeButton, setActiveButton] = useState(null);

    useEffect(() => {
        const updateDate = () => {
            const now = new Date();
            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const year = now.getFullYear();
            document.getElementById('user_landPage-header-date').textContent = `${day}/${month}/${year}`;
        };

        updateDate();
    }, []);

    const handleClick = (buttonName) => {
        setActiveButton(buttonName);
    };

    const texts = [
        'Além do livro',
        'Além das fronteiras',
        'Educação em foco',
        'Monthly dose of english',
        'Palavreando',
        'Aventuras na história',
        'Biofímíca em ação',
        'Livro 8',
        'Livro 9'
    ];

    return (
        <div>
            <header className="user_landPage-header">
                <div className="user_landPage-header-date-container">
                    <span id="user_landPage-header-date"></span>
                </div>
                <div className="user_landPage-header-buttons">
                    <button
                        className={`user_landPage-header-button ${activeButton === 'fale-conosco' ? 'active' : ''}`}
                        onClick={() => handleClick('fale-conosco')}
                    >
                        Fale Conosco
                        <i className='bx bxs-conversation'></i>
                    </button>
                    <button
                        className={`user_landPage-header-button ${activeButton === 'colunistas' ? 'active' : ''}`}
                        onClick={() => handleClick('colunistas')}
                    >
                        Colunistas
                        <i className="bi bi-journal-bookmark-fill"></i>
                    </button>
                    <button
                        className={`user_landPage-header-button ${activeButton === 'sobre-nos' ? 'active' : ''}`}
                        onClick={() => handleClick('sobre-nos')}
                    >
                        Sobre Nós
                        <i className="bi bi-people-fill"></i>
                    </button>
                    <button
                        className={`user_landPage-header-button ${activeButton === 'ingles' ? 'active' : ''}`}
                        onClick={() => handleClick('ingles')}
                    >
                        Inglês
                        <i className="bi bi-translate"></i>
                    </button>
                    {/* <button
                        className={`user_landPage-header-button ${activeButton === 'login' ? 'active' : ''}`}
                        // onClick={() => handleClick('/login')}
                        href="/login"
                    >
                        Log in
                        <i className="bi bi-box-arrow-right"></i>
                    </button> */}
                    <a href="/login">Ir para a tela de login</a>
                </div>
            </header>

            <div className="user_landPage-footer">
                <div className="user_landPage-footer-line"></div>
                <div className="user_landPage-footer-content">
                    <h1 className="user_landPage-footer-title">O EDUCADOR</h1>
                    <h2 className="user_landPage-footer-subtitle">TE MANTER INFORMADO É NOSSA MISSÃO</h2>
                </div>
                <div className="user_landPage-footer-line"></div>
            </div>

            {/* Carrossel */}
            {/* <div className="user_landPage-carousel-row">
                <Carousel
                    indicators={false}
                    controls={true}
                    prevIcon={<i className="bi bi-chevron-left"></i>}
                    nextIcon={<i className="bi bi-chevron-right"></i>}
                >
                    {[...Array(2)].map((_, index) => (
                        <Carousel.Item key={index}>
                            <div className="user_landPage-carousel-grid">
                                {texts.slice(index * 7, index * 7 + 7).map((text, idx) => (
                                    <div key={idx} className={`user_landPage-carousel-item user_landPage-carousel-item-color${index * 7 + idx + 1}`}>
                                        <p className='user_LandPage-carousel-text'>{text}</p>

                                    </div>
                                ))}
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div> */}

            {/* Jornal */}
            <div className="user_landPage-jornal-container">
                <div className="user_landPage-jornal">

                    <div className="user_landPage-jornal-left">
                        <h2 className='user_landPage-news-title'>Grêmio Estudantil</h2>
                        <h4 className='.user_landPage-news-subtitle'>Subtítulo aqui</h4>
                        <p className='user_landPage-news-text'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
                        <p className='user_landPage-news-date'>Há 2 dias</p>

                        <h4 className='.user_landPage-news-subtitle'>Subtítulo de outra notícia</h4>
                        <p className='user_landPage-news-text'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
                        <p className='user_landPage-news-date'>Há 3 dias</p>

                    </div>




                    <div className="user_landPage-jornal-right-grid">

                        <div className="user_landPage-jornal-right">

                            <div className="user_LandPage-jornal-right-image">
                                <img src="../img/landpage1.svg" alt="Descrição da Imagem" className="user_landPage-jornal-image" />
                                <p>Texto adicional que aparece abaixo da imagem no lado direito.</p>

                            </div>
                            <div className="user_landPage-jornal-right-content">

                                <div className="user_landPage-jornal-right-text">
                                    <h4><strong>Where does it come from?</strong></h4>
                                    <p style={{ color: '#A6A5A5' }}>Retirado e adaptado do site da BBC NEWS</p>
                                </div>

                                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
                                <p className='user_landPage-news-date'>Há 4 dias</p>
                            </div>
                        </div>

                        <div className="user_landPage-jornal-right-2">


                            <div className="user_landPage-jornal-right-content">

                                <div className="user_landPage-jornal-right-text">
                                    <h4><strong>Where does it come from?</strong></h4>
                                    <p style={{ color: '#A6A5A5' }}>Retirado e adaptado do site da BBC NEWS</p>
                                </div>

                                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
                                <p className='user_landPage-news-date'>Há 4 dias</p>
                            </div>
                            <div className="user_LandPage-jornal-right-image-2">
                                <img src="../img/landpage2.svg" alt="Descrição da Imagem" className="user_landPage-jornal-image-2" />
                                <p>Texto adicional que aparece abaixo da imagem no lado direito.</p>

                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <section>
                <div className="user_LandPage-galeria">
                    <h1 className="TypeUser_landPage-title-Component">Galeria</h1>
                    <p className="TypeUser_landPage-subtitle-Component">TODAS AS FOTOS FORAM RETIRADOS DO NOSSO ARQUIVO PESSOAL </p>

                    <div className="TypeUser_landPage-gridContainer-Component">
                        <div className="TypeUser_landPage-gridItem1-Component">
                            <img src="../img/landpage3.svg" alt="Imagem 1" />
                        </div>
                        <div className="TypeUser_landPage-gridItem2-Component">
                            <img src="../img/landpage4.svg" alt="Imagem 2" />
                        </div>
                        <div className="TypeUser_landPage-gridItem3-Component">
                            <img src="../img/landpage5.svg" alt="Imagem 3" />
                        </div>
                        <div className="TypeUser_landPage-gridItem4-Component">
                            <img src="../img/landpage6.svg" alt="Imagem 4" />
                        </div>
                    </div>
                </div>



            </section>


            <div className="TypeUser_landPage-bannerWrapper-Component">
                <p className="TypeUser_landPage-bannerText-Component">Aconteceu na escola</p>
            </div>

            <div className="TypeUser_landPage-threeColumnWrapper-Component">
                <div className="TypeUser_landPage-sectionWrapper-Component-1">
                    <h2 className="TypeUser_landPage-title-Component-faixa">What is Lorem Ipsum?</h2>
                    <p className="TypeUser_landPage-text-Component-faixa">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
                    <p className="TypeUser_landPage-dateText-Component-faixa">Há dois dias</p>
                </div>

                <div className="TypeUser_landPage-sectionWrapper-Component-2">
                    <h2 className="TypeUser_landPage-title-Component-faixa">What is Lorem Ipsum?</h2>
                    <p className="TypeUser_landPage-text-Component-faixa">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
                    <p className="TypeUser_landPage-dateText-Component-faixa">Há três dias</p>
                </div>

                <div className="TypeUser_landPage-sectionWrapper-Component">
                    <img className="TypeUser_landPage-image-Component" src="../img/landpage7.svg" alt="Descrição da Imagem" />
                </div>


                <div class="TypeUser_landPage-buttonWrapper-Component">
                    <span class="TypeUser_landPage-buttonText-Component">IR PARA COLUNA</span>
                    <i class="bi bi-arrow-right TypeUser_landPage-buttonIcon-Component"></i>
                </div>

            </div>

            <footer class="TypeUser_footerWrapper-Component">

                <div class="TypeUser_footerLeft-Component">
                    <div class="TypeUser_footerLeftTitle-Component">O EDUCADOR</div>
                    <div class="TypeUser_footerSocialIcons-Component">
                        <a href="https://instagram.com" target="_blank" class="TypeUser_footerIcon-Component">
                            <i class="bi bi-instagram"></i>
                        </a>
                        <a href="https://youtube.com" target="_blank" class="TypeUser_footerIcon-Component">
                            <i class="bi bi-youtube"></i>
                        </a>
                        <a href="https://facebook.com" target="_blank" class="TypeUser_footerIcon-Component">
                            <i class="bi bi-facebook"></i>
                        </a>
                    </div>
                </div>

                {/* <!-- Right side: Contact and sections --> */}
                <div class="TypeUser_footerRight-Component">

                    <div class="TypeUser_footerSection-Component">
                        <div class="TypeUser_footerSectionTitle-Component">Contato</div>
                        <div class="TypeUser_footerSectionItem-Component">
                            <i class="bi bi-envelope-fill TypeUser_footerSectionItemIcon-Component"></i>
                            <span>email@exemplo.com</span>
                        </div>
                        <div class="TypeUser_footerSectionItem-Component">
                            <i class="bi bi-telephone-fill TypeUser_footerSectionItemIcon-Component"></i>
                            <span>(11) 1234-5678</span>
                        </div>
                    </div>


                    <div class="TypeUser_footerSection-Component">
                        <div class="TypeUser_footerSectionTitle-Component">Seção 2</div>
                        <a href="#" class="TypeUser_footerSectionItem-Component">Link 1</a>
                        <a href="#" class="TypeUser_footerSectionItem-Component">Link 2</a>
                        <a href="#" class="TypeUser_footerSectionItem-Component">Link 3</a>
                    </div>


                    <div class="TypeUser_footerSection-Component">
                        <div class="TypeUser_footerSectionTitle-Component">Seção 3</div>
                        <a href="#" class="TypeUser_footerSectionItem-Component">Link 1</a>
                        <a href="#" class="TypeUser_footerSectionItem-Component">Link 2</a>
                        <a href="#" class="TypeUser_footerSectionItem-Component">Link 3</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default LandPage;
