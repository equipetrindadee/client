import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './materiasColuna.css';
import { Container, Row, Col, Card, Button, Dropdown, DropdownButton, Form, InputGroup } from 'react-bootstrap';
import NavBarProfessor from '../../../navBar/navBarProfessor';
import ErrorCelular from '../../../components/error';
import { db } from "../../../../config/firebaseImgConfig.js";
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import FilterButtonMateriaColunaProfessor from './filterButtonMateriaColunaProfessor';
import { Navigate, useNavigate, useLocation} from 'react-router-dom';



function MateriaColunaCarrossel() {

    const navigate = useNavigate()
    const [filter, setFilter] = useState('Todos');
    const handleFilterChange = (selectedFilter) => {
        setFilter(selectedFilter);
    };
    const [searchQuery, setSearchQuery] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
    const [publications, setPublications] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // Estado correto para pesquisa
    const [bannerError, setBannerError] = useState('');
    const [selectColum, setSelectColum] = useState(localStorage.getItem('ColumName') || '');
    const [bannerImage, setBannerImage] = useState(''); // Estado para armazenar a URL da imagem
    const location = useLocation(); // Hook para obter a rota atual



    useEffect(() => {
        // Recuperando o idColum do localStorage
        const idColum = localStorage.getItem('idColum');

        if (idColum) {
            // Recuperando os dados do Firebase
            const docRef = doc(db, 'colunas', idColum); // 'colunas' é o nome da coleção onde estão os dados das colunas
            getDoc(docRef)
                .then((docSnapshot) => {
                    if (docSnapshot.exists()) {
                        const data = docSnapshot.data();
                        const bannerImage = data.bannerImage; // Pegando o campo imageColumn
                        if (bannerImage) {
                            setBannerImage(bannerImage);
                        } else {
                            setBannerError(true);
                        }
                    } else {
                        setBannerError(true); // Caso o documento não exista
                    }
                })
                .catch((error) => {
                    console.error("Erro ao recuperar dados do Firebase: ", error);
                    setBannerError(true); // Se ocorrer algum erro ao buscar os dados
                });
        } else {
            setBannerError(true); // Caso o idColum não esteja no localStorage
        }
    }, []);


    const fetchPublications = async () => {
        const collectionRef = collection(db, 'edicao');
        const snapshot = await getDocs(collectionRef);
        const publicationsData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        setPublications(publicationsData);
    };




    useEffect(() => {
        fetchPublications(); // Fetch publications when the component mounts
    }, []);




    const filteredPublications = publications

        .filter(pub => filter === 'Todos' || pub.status === filter)
        .filter(pub =>
            (pub.title && pub.title.toLowerCase().includes(searchQuery.toLowerCase()))
        );


    useEffect(() => {
        const storedColor = localStorage.getItem('colunaColor');
        if (storedColor) {
            setBackgroundColor(storedColor);
        }

        // Recupera o valor do ColumName do localStorage
        const storedColumName = localStorage.getItem('ColumName');
        if (storedColumName) {
            setSelectColum(storedColumName);
        }


    }, []);



    useEffect(() => {
        const storedColor = localStorage.getItem('colunaColor');
        if (storedColor) {
            setBackgroundColor(storedColor);
        }
    }, []);

    const handleEditClick = (id) => {
        localStorage.setItem('selectedPublicationId', id);
        navigate("/t" + "1" + "R")
    };

    const getTimeAgo = (timestamp) => {
        if (!timestamp || !timestamp.seconds) {
            return "Data desconhecida"; // Retorna uma mensagem se o timestamp não estiver definido
        }

        const publicationDate = new Date(timestamp.seconds * 1000); // Converte o timestamp para uma data
        const currentDate = new Date();
        const timeDifference = currentDate - publicationDate; // Diferença em milissegundos
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Converte para dias

        if (daysDifference > 0) {
            return `Há ${daysDifference} dias`; // Retorna dias se maior que 0
        }

        const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60)); // Converte para horas
        if (hoursDifference > 0) {
            return `Há ${hoursDifference} horas`; // Retorna horas se maior que 0
        }

        const minutesDifference = Math.floor(timeDifference / (1000 * 60)); // Converte para minutos
        return `Há ${minutesDifference} minutos`; // Retorna minutos
    };

    const getStatusButtonColor = (status) => {
        switch (status) {
            case 'Revisão':
                return '#FFD914';
            case 'Concluído':
                return '#226DFF';
            case 'Postado':
                return '#4CFF2F';
            default:
                return '#95a5a6'; // Cor padrão se o status não for reconhecido
        }
    };
    const [searchText, setSearchText] = useState('');
    const [isExpanded, setIsExpanded] = useState(false); // Controla se o input está expandido
    const [inputValue, setInputValue] = useState(''); // Controla o valor do input

    const handleFocus = () => {
        setIsExpanded(true); // Expande o input ao clicar
    };

    const handleBlur = () => {
        if (inputValue === '') {
            setIsExpanded(false); // Encolhe o input se não houver texto
        }
    };
    const handleSearchChange = (e) => {
        const text = e.target.value;
        setSearchText(text);


    };
    // Função para truncar títulos longos
    const truncateTitle = (title, maxLength = 20) => {
        if (!title) return '';
        return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
    };

    console.log("aqui2", bannerImage)
    
    return (
        <div className="professor-materiaColuna-container">
            <NavBarProfessor />
            <div className="professor-materiaColuna-mainContent">
                <div
                    style={{
                        backgroundImage: `url(${bannerImage})`, // Usando o backgroundImage
                        backgroundSize: "cover", // Ajuste opcional para cobrir o elemento
                        backgroundPosition: "center",

                        height: "19rem", // Ajustando a altura do banner
                        backgroundRepeat: "no-repeat",


                        // Evitar repetição da imagem
                    }}
                >
                    <Col xs={12}>
                        <div className="banner-professorColuna">
                            {bannerError ? (
                                <div className="error-message">
                                    Não foi possível carregar o banner. Verifique se a imagem existe ou tente novamente mais tarde.
                                </div>
                            ) : null} {/* Remova a tag <img> */}
                        </div>
                    </Col>
                </div>
                <div className='professor-materiaColunaMainHeader'>


                    <div className="faleConoscoProfessorFilterButtonsTopOfPage">

                        <div className={`contentColunaHeaderContentProfessor-actionsButtonsSearch-wrapper ${searchText ? 'no-hover' : ''}`}>
                            <div className={`search-containerMaster ${isExpanded ? 'expandedMaster' : ''}`}>
                                <input
                                    type="text"

                                    value={searchTerm} // Atualiza o valor do input conforme o estado
                                    onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o estado com o valor digitado
                                    className="search-inputMaster"
                                    placeholder="Pesquisar..."
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}


                                />
                                <i class='bx bx-search search-iconMaster'></i>
                            </div>
                        </div>

                        <div>
                            <FilterButtonMateriaColunaProfessor onFilterChange={handleFilterChange} />
                        </div>
                    </div>
                </div>

                <div className='professor-materiaColuna-publication-container'>
                    <div className="professor-materiaColuna-publication-innerContainer">
                        <div className="professor-materiaColuna-publicationPartAjust" >
                            {filteredPublications.map((item) => (
                                selectColum === item.coluna ? (
                                    <div xs={12} md={8} key={item.id || item.title}>
                                        <div className="professor-materiaColuna-publication-list">

                                            <div className="professor-materiaColuna-publication-cardInner" >
                                                <div>
                                                    <img src="../img/imgPadraoNewsletterPreview.svg" className="professor-materiaColuna-card-img-top-meusArtigos" alt="Imagem do Artigo" />
                                                </div>
                                                <div className='professor-materiaColuna-publicationCardBody'>
                                                    <Card.Body>
                                                        <Card.Title>
                                                            <h2 className='professor-materiaColuna-Colunaname'>{truncateTitle(item.title, 50)}</h2>
                                                        </Card.Title>

                                                        <Card.Text>
                                                            <div className="professor-materiaColuna-author-info">
                                                                {/* <img src={item.authorImage} alt="Imagem do Autor" className="professor-materiaColuna-author-image" /> */}
                                                                <p className="professor-materiaColuna-author-name">{item.author}</p>

                                                            </div>

                                                            {/* Exibe apenas um botão por publicação */}
                                                            <Button
                                                                style={{
                                                                    backgroundColor: getStatusButtonColor(item.status),
                                                                    opacity: 0.7,
                                                                    marginBottom: '10px',

                                                                }}
                                                                className="professor-materiaColuna-status-button"
                                                            >
                                                                <p>{item.status}</p>
                                                            </Button>

                                                            <p className="professor-materiaColuna-date" style={{ color: backgroundColor }} >{getTimeAgo(item.timestamp)}</p>
                                                        </Card.Text>
                                                    </Card.Body>
                                                </div>
                                            </div>



                                            <div className="professor-materiaColuna-card-footer-line"></div>
                                        </div>

                                    </div>
                                ) : null

                            ))}

                        </div>





                        <div className="professor-materiaColuna-revisao-section">
                            <h4>REVISÃO</h4>
                            <div className="scroll-container">
                                {filteredPublications
                                    .filter((item) => item.status === 'Revisão') // Filtra para exibir apenas as publicações com status "Revisão"
                                    .slice(0, 5) // Limita a exibição para os primeiros 5 itens
                                    .map((item, index) => (
                                        selectColum === item.coluna ? (
                                            <div className="professor-materiaColuna-revisao-item" key={item.id || index}>
                                                <div className="professor-materiaColuna-revisao-content">
                                                    <div className='professor-materiaColuna-revisao-clock' style={{
                                                        backgroundColor: getStatusButtonColor(item.status)
                                                    }}>
                                                        <i className="bi bi-clock professor-materiaColuna-revisao-clock-icon"></i>
                                                    </div>
                                                    <div className='professor-materiaColuna-revisao-text-content'>
                                                        <h2 className="professor-materiaColuna-revisao-text">{truncateTitle(item.title, 10)}</h2>
                                                        <p className="professor-materiaColuna-revisao-author">{item.author || 'Autor Desconhecido'}</p>
                                                    </div>
                                                    <div className="professor-materiaColuna-revisao-icone-pencil">
                                                        <a onClick={() => handleEditClick(item.id)} style={{ cursor: 'pointer' }}>
                                                            <i className="bi bi-pencil-square"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : null
                                    ))}
                            </div>
                        </div>



                    </div>
                </div>
            </div>
            <div className='professor-materiaColuna-mensagem-error'>
                <ErrorCelular />
            </div>
        </div>
    );
}

export default MateriaColunaCarrossel;
