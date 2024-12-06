import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../../professor/dashboardProfessor/dashboardProfessor.css";
import NavBarProf from '../../navBar/navBarProfessor';
import NavBarProfessor from '../../navBar/navBarProfessor';
import Calendario from '../../userComum/calendario';
import { useNavigate } from 'react-router-dom';
import Notificacoes from "../../aluno/dashBoardAluno/ladoEsquedo/notificacoes/notificacoes/index.js"
import ErrorCelular from '../../components/error/index.js';

import { getFirestore, collection, query, where, getDocs, doc, getDoc, addDoc } from 'firebase/firestore'; // Importando doc e getDoc
import { db } from '../../../config/firebaseImgConfig';
import { jwtDecode } from 'jwt-decode'; // Importando jwtDecode


export const DashboardProfessor = () => { // Renomeie para DashboardProfessor
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isAnimatingLeft, setIsAnimatingLeft] = useState(false);
    const [isAnimatingRight, setIsAnimatingRight] = useState(false);
    const [animatingCardLeft, setAnimatingCardLeft] = useState(false);
    const [animatingCardRight, setAnimatingCardRight] = useState(false);
    const [itemsToShow, setItemsToShow] = useState(6);
    const [itemsCardShow, setItemsCardShow] = useState(4);
    const [mostrarNavbarMobile, setMostrarNavbarMobile] = useState(false);
    const [mostrarNavbarProf, setMostrarNavbarProf] = useState(true);
    const [professores, setProfessores] = useState([]);
    const [selectedProfessor, setSelectedProfessor] = useState('');
    const [colunas, setColunas] = useState([]); // Novo estado para armazenar as colunas
    const [userName, setUserName] = useState(''); // Estado para armazenar o nome do usuário
    const [acesso, setAcesso] = useState(''); // Estado para armazenar o nome do usuário
    const [colunasC, setColunasC] = useState(''); // Estado para armazenar o nome do usuário
    const [colunasVisiveis, setColunasVisiveis] = useState([]);
    const [colunasPermitidas, setColunasPermitidas] = useState([]);
    const [colunasEmRevisao, setColunasEmRevisao] = useState([]);
    const [colunasConcluidas, setColunasConcluidas] = useState([]);
    const [colunasPostadas, setColunasPostadas] = useState([]);
    const [colunasNaoEntregues, setColunasNaoEntregues] = useState([]);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth); // Estado para armazenar a largura da tela


    const navigate = useNavigate()
    const handleClick = (colunaName) => {
        // Verifica o acesso do usuário
        if (acesso === "ilimitado") {
            // Salva o nome da coluna no localStorage
            // Salva o nome da coluna no sessionStorage

            sessionStorage.setItem("ColumName", colunaName);
            sessionStorage.setItem("colunaColor", colunas.find(c => c.columname === colunaName)?.color); // Salvando a cor também
            // localStorage.setItem("ColumName", colunaName);
            // localStorage.setItem("colunaColor", colunas.find(c => c.columname === colunaName)?.color); // Salvando a cor também
    
            // Navega para a página /MateriaColuna
            navigate("/MateriaColuna");
        } else if (acesso === 'limitado') {
            // Verifica se a colunaName é a mesma que a coluna do usuário
            if (colunaName === colunasC) {
                sessionStorage.setItem("ColumName", colunaName);
                sessionStorage.setItem("colunaColor", colunas.find(c => c.columname === colunaName)?.color);
                // localStorage.setItem("ColumName", colunaName);
                // localStorage.setItem("colunaColor", colunas.find(c => c.columname === colunaName)?.color);
                navigate("/MateriaColuna");
            } else {
                alert("Você não tem permissão para acessar esta tela. Você só pode acessar a coluna na qual está registrado.");
            }
        }
    };
    const fetchUserName = async () => {
        const storedToken = sessionStorage.getItem('token');
        // const storedToken = localStorage.getItem('token');


        if (storedToken) {
            try {
                const decoded = jwtDecode(storedToken);
                const userId = decoded.id;
                const docRef = doc(db, "users", userId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setUserName(data.name || "Nome não encontrado");
                    setAcesso(data.acesso);
                    setColunasC(data.coluna)


                    const coluna = data.coluna; // Obter coluna 

                    // console.log("Acesso do usuário:", acesso);
                    // console.log(coluna)

                    // Definindo as colunas visíveis com base no acesso
                    if (acesso === "ilimitado") {
                        setColunasVisiveis(colunas); // Exibir todas as colunas
                    } else {
                        setColunasVisiveis(colunas.filter(colunaData => colunaData.title === coluna)); // Exibir apenas a coluna do usuário
                    }
                }
            } catch (error) {
                console.error("Erro ao decodificar o token ou consultar o Firestore:", error);
            }
        }
    };



    const fetchProfessores = async () => {
        try {
            const usersCollection = collection(db, 'users');
            const q = query(usersCollection, where('categoria', '==', 'professor'));
            const querySnapshot = await getDocs(q);

            const listaProfessores = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            setProfessores(listaProfessores);
        } catch (error) {
            console.error('Erro ao buscar os professores:', error);
        }
    };

    const fetchColunas = async () => {
        // const storedToken = localStorage.getItem('token');
        const storedToken = sessionStorage.getItem('token');

        if (storedToken) {
            try {
                const decoded = jwtDecode(storedToken);
                const userId = decoded.id;
                const docRef = doc(db, "users", userId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    const acesso = data.acesso; // Acesso do usuário
                    const colunaDoUsuario = data.coluna; // Coluna do usuário

                    const usersCollection = collection(db, 'users');
                    const querySnapshot = await getDocs(usersCollection);

                    const todasColunas = new Set();
                    querySnapshot.forEach((doc) => {
                        if (doc.data().coluna) {
                            todasColunas.add(doc.data().coluna);
                        }
                    });

                    if (acesso === 'ilimitado') {
                        setColunasPermitidas(Array.from(todasColunas)); // Permite todas as colunas
                    } else {
                        setColunasPermitidas([colunaDoUsuario]); // Apenas a coluna do usuário
                    }
                }
            } catch (error) {
                console.error('Erro ao buscar as colunas:', error);
            }
        }
    };


    const fetchColunasCarrossel = async () => {
        try {
            const colunasRef = collection(db, 'colunas'); // Referência à coleção de colunas
            const colunasSnap = await getDocs(colunasRef);
            const colunasData = colunasSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            // console.log("Colunas buscadas: ", colunasData);
            setColunas(colunasData); // Atualiza o estado com as colunas buscadas
        } catch (error) {
            console.error("Erro ao buscar colunas: ", error);
        }
    };
    const handleNotificarTodos = async () => {
        const newNotification = {
            imgSrc: '../img/sistema.jpg', // Substitua pelo caminho correto
            name: 'Sistema', // Substitua pelo nome do professor
            message: 'aviso!',
            categoria: 'Professor',
            messageModal: 'Você deve finalizar sua coluna até o final do mês',
        };

        try {
            await addDoc(collection(db, 'notificacoes'), newNotification);
            alert('Notificação enviada com sucesso!');
        } catch (error) {
            console.error('Erro ao enviar notificação:', error);
        }
    };



    const handleSelectProfessor = (eventKey) => {
        // console.log("Professor selecionado:", eventKey);
        setSelectedProfessor(eventKey);
    };

    useEffect(() => {
        fetchProfessores();
        fetchColunasCarrossel();
        fetchColunas(); // Chama a função para buscar as colunas
        fetchUserName(); // Chama a função para buscar o nome do usuário
    }, []);

    const handleResize = () => {
        setScreenWidth(window.innerWidth);
    };
    useEffect(() => {
        // Adiciona o event listener quando o componente é montado
        window.addEventListener('resize', handleResize);

        // Limpeza do event listener quando o componente for desmontado
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const fetchColunasByStatus = async () => {
        try {
            const edicaoCollection = collection(db, 'edicao');
            const edicaoSnap = await getDocs(edicaoCollection);

            const emRevisao = [];
            const concluidas = [];
            const postadas = [];
            const naoEntregues = [];

            // Iterando pelos documentos da coleção
            edicaoSnap.docs.forEach(doc => {
                const colunaData = { id: doc.id, ...doc.data() };

                const status = colunaData.status || '';  // Garantindo que o valor de status existe

                // Verificando o status e agrupando nas variáveis corretas
                switch (status) {
                    case 'Revisão':
                        emRevisao.push(colunaData);
                        break;
                    case 'Concluído':
                        concluidas.push(colunaData);
                        break;
                    case 'Postado':
                        postadas.push(colunaData);
                        break;
                    case 'Não Entregue':
                        naoEntregues.push(colunaData);
                        break;
                    default:
                        break;
                }
            });

            // Atualizando os estados com as colunas filtradas
            setColunasEmRevisao(emRevisao);
            setColunasConcluidas(concluidas);
            setColunasPostadas(postadas);
            setColunasNaoEntregues(naoEntregues);

        } catch (error) {
            console.error("Erro ao buscar colunas por status:", error);
        }
    };

    useEffect(() => {
        fetchColunasByStatus();
    }, []);



    const itemCardDashProf = [
        { id: 1, title: 'EM REVISÃO', card: 'cardRevisao-dashboard-Professor', logo: 'logoRevisao-dashboard-Professor', iconeLogoCard: 'bi bi-pencil-square', colunas: colunasEmRevisao, buttonNotFunction: 'buttonNotFunction' },
        { id: 2, title: 'CONCLUÍDO', card: 'cardConclusao-dashboard-Professor', logo: 'logoConclusao-dashboard-Professor', iconeLogoCard: 'bi bi-patch-check', colunas: colunasConcluidas, buttonNotFunction: 'buttonNotFunction' },
        { id: 3, title: 'POSTADO', card: 'cardPostado-dashboard-Professor', logo: 'logoPostado-dashboard-Professor', iconeLogoCard: 'bx bx-paper-plane', colunas: colunasPostadas, buttonNotFunction: 'buttonNotFunction' },
        { id: 4, title: 'NÃO ENTREGUES', card: 'cardNaoEntregue-dashboard-Professor', logo: 'logoNaoEntregue-dashboard-Professor', iconeLogoCard: 'bi bi-exclamation-triangle-fill', colunas: colunasNaoEntregues, buttonNotFunction: 'buttonNotificar-dashboard-Professor' }
    ];


    const itemColuns = [
        { id: 1, title: 'Além do Livro', className: 'alemLivroBall-dashboard-professor' },
        { id: 2, title: 'Além das Fronteiras', className: 'alemFronteirasBall-dashboard-professor' },
        { id: 3, title: 'Educação em foco', className: 'educacaoFocoBall-dashboard-professor' },
        { id: 4, title: 'Monthly dose of english', className: 'monthlyEnglishBall-dashboard-professor' },
        { id: 5, title: 'Palavreando', className: 'palavreandoBall-dashboard-professor' },
        { id: 6, title: 'Aconteceu na escola', className: 'aconteceuEscolaBall-dashboard-professor' },
        { id: 7, title: 'Tecnologia', className: 'tecnologiaBall-dashboard-professor' },
        { id: 8, title: 'Aventuras na História', className: 'aventurasHistoriaBall-dashboard-professor' },
        { id: 9, title: 'Biofímica em ação', className: 'biofimicaBall-dashboard-professor' },
    ];

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



    useEffect(() => {



        const verificarTamanhoTela = () => {
            if (window.innerWidth <= 820) {
                setMostrarNavbarProf(false);
                setMostrarNavbarMobile(true); // Mostra a navbar mobile se a largura for <= 768px
            } else {
                setMostrarNavbarMobile(false); // Esconde a navbar mobile se a largura for maior que 768px
                setMostrarNavbarProf(true);
            }
        };

        const handleResize = () => {

            if (window.innerWidth < 1200) {
                setItemsToShow(5);
            } else {
                setItemsToShow(6); // Mostrar 6 colunas
            }

            if (window.innerWidth < 1000) {
                setItemsToShow(3); // Mostrar 4 colunas
                setItemsCardShow(2)
            } else {
                setItemsToShow(5); // Mostrar 6 colunas
            }

            if (window.innerWidth < 769) {
                setItemsToShow(2)
                setItemsCardShow(4)
            } else {
                setItemsToShow(3)
                setItemsCardShow(2)
            }


            if (window.innerWidth > 1000) {
                setItemsToShow(5)
                setItemsCardShow(4)
            }
        };


        window.addEventListener('resize', verificarTamanhoTela);
        window.addEventListener('resize', handleResize)
        verificarTamanhoTela();
        handleResize(); // Chamada inicial para ajustar na primeira renderização

        // Limpa o event listener quando o componente for desmontado
        return () => {
            window.removeEventListener('resize', verificarTamanhoTela, handleResize);
        };
    }, []);

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


    const cardDashNext = () => {
        if (!animatingCardRight) {
            setAnimatingCardRight(true);
            setTimeout(() => {
                setCurrentCardIndex((prevIndex) => (prevIndex === itemsColunas.length - 1 ? 0 : prevIndex + 1));
                setAnimatingCardRight(false);
            }, 250); // Duração da animação
        }
    }

    const cardDashPrev = () => {
        if (!animatingCardLeft) {
            setAnimatingCardLeft(true);
            setTimeout(() => {
                setCurrentCardIndex((prevIndex) => prevIndex === 0 ? itemsColunas.length - 1 : prevIndex - 1);
                setAnimatingCardLeft(false);
            }, 250); // Duração da animação
        }
    }


    const visibleColunas = [];
    for (let i = 0; i < itemsToShow; i++) {
        visibleColunas.push(colunas[(currentIndex + i) % colunas.length]?.columname); // Usando o campo columname
    }

    const visibleitemsCardDash = [];
    for (let i = 0; i < itemsCardShow; i++) {
        visibleitemsCardDash.push(itemCardDashProf[(currentCardIndex + i) % itemCardDashProf.length])
    }



    return (
        <body>
            <div className="container-dashboard-Professor">

                {mostrarNavbarProf && <NavBarProf />}
                {mostrarNavbarMobile && <NavBarProfessor />}



                <div className="dashboard-content-Professor">

                    {/* Logo do proprio Jornal chamado EDUCADOR */}
                    <div className="logoDashboard-logo-Professor">

                        <h1 className="titleLogo-dashboard-Professor">O EDUCADOR</h1>
                        <h3 className="subTitleLogo-dashboard-Professor">TE MANTER INFORMADO É A NOSSA MISSÃO</h3>
                        <div className="linhalogo-dashboard-Professor"></div>

                    </div>
                    {/* Fim da logo */}

                    {/* Mini texto BEM-VINDO, vai mudar para cada Usuario Professor */}
                    <div className="container-bemVindo-dashboardProfessor">
                        <h1 className='nomeProfessor'>{"Bem vindo(a) "}{userName || 'Você não está logado...'}</h1> {/* Aqui está o nome do usuário */}
                    </div>
                    {/* Fim do Mini texto BEM-VINDO */}


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

                    {/* Cards de Visualização do Professor, com carrossel Responsivo */}
                    <div className="cardVisualizacao-dashboard-Professor">
                        <i className="bi bi-caret-left-fill arrowLeft arrowCards-Dashboard-Professor" onClick={cardDashPrev}></i>

                        {visibleitemsCardDash.map((item) => (
                            <div key={item.id} className={item.card}>
                                <div className={item.logo}>
                                    <i className={item.iconeLogoCard}></i>
                                </div>

                                <h3>{item.title}</h3>

                                <div className={item.colunas}>
                                    {/* Filtra as colunas do item com base nas colunas permitidas */}
                                    {item.colunas
                                        .filter(colunaData => colunasPermitidas.includes(colunaData.coluna))  // Filtrando colunas com base no acesso
                                        .map((colunaData, index) => (
                                            <div key={index} className='colunasVisualizacao-dashboard-Professor'>
                                                <div className='allConteudo-colunas-dashboard-professor'>
                                                    <div className={`classNamePara${colunaData.coluna}`}> {/* Use a coluna para aplicar uma classe específica, se necessário */}
                                                        <i className='bx bx-radio-circle-marked'></i>
                                                    </div>
                                                    <h3>{colunaData.coluna}</h3> {/* Exibindo o nome da coluna */}
                                                </div>
                                            </div>
                                        ))}
                                </div>

                                <button className='buttonNotificar-dashboard-Professor' onClick={handleNotificarTodos}>NOTIFICAR TODOS</button>
                            </div>
                        ))}

                        <i className="bi bi-caret-right-fill arrowRight arrowCards-Dashboard-Professor" onClick={cardDashNext}></i>
                    </div>



                    {/* Fim Cards de Visualização do Professor, com carrossel Responsivo */}

                    {/* footer da tela professor */}
                    {/* <footer className="footer-dashboard-Professor">

        <div className="calendario-dashboard-Professor">
            <Calendario />
        </div>

        <div className='linhaSeparadora-dashboard-Professor'></div>

        <div className="areaImpressão-dashboard-Professor">

            <h1>ÁREA DE IMPRESSÃO</h1>

            <div className='edicaoNova-dashboard-Professor'>

                <h3 className='nomeEdicao-dashboard-Professor'>EDIÇÃO DE JULHO</h3>

                <button className='buttonEdicao-dashboard-Professor'>Baixar Arquivo</button>

            </div>

            <div className='edicaoNova-dashboard-Professor'>

                <h3 className='nomeEdicao-dashboard-Professor'>EDIÇÃO DE JUNHO</h3>

                <button className='buttonEdicao-dashboard-Professor'>Baixar Arquivo</button>

            </div>

            <div className='edicaoNova-dashboard-Professor'>

                <h3 className='nomeEdicao-dashboard-Professor'>EDIÇÃO DE MAIO</h3>

<<<<<<< HEAD
<
                <button className='buttonEdicao-dashboard-Professor'>Baixar Arquivo</button>
=======
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

                {/* Cards de Visualização do Professor, com carrossel Responsivo */}
                <div className="cardVisualizacao-dashboard-Professor">
                    <i className="bi bi-caret-left-fill arrowLeft arrowCards-Dashboard-Professor" onClick={cardDashPrev}></i>

                    {visibleitemsCardDash.map((item) => (
                        <div
                        key={item.id}
                        className={`${item.card}`}
                        style={{
                            height: item.colunas.length > 0 
                                ? `${Math.min(item.colunas.length + 400, 520)}px` // Se o tamanho ultrapassar 520px, ele não aumenta mais
                                : '22%', // Se não houver colunas, a altura será 22%
                        }}
                        >
                            <div className={item.logo}>
                                <i className={item.iconeLogoCard}></i>
                            </div>

                            <h3>{item.title}</h3>

                            <div className={item.colunas}>
                                {/* Filtra as colunas do item com base nas colunas permitidas */}
                                {item.colunas
                                    .filter(colunaData => colunasPermitidas.includes(colunaData.coluna))  // Filtrando colunas com base no acesso
                                    .map((colunaData, index) => (
                                        <div key={index} className='colunasVisualizacao-dashboard-Professor'>
                                            <div className='allConteudo-colunas-dashboard-professor'>
                                                <div className={`classNamePara${colunaData.coluna}`}> {/* Use a coluna para aplicar uma classe específica, se necessário */}
                                                    <i className='bx bx-radio-circle-marked'></i>
                                                </div>
                                                <h3>{colunaData.coluna}</h3> {/* Exibindo o nome da coluna */}
                                            </div>
                                        </div>
                                    ))}
                            </div>

                            <button className='buttonNotificar-dashboard-Professor' onClick={handleNotificarTodos}>NOTIFICAR TODOS</button>
                        </div>
                    ))}

                    <i className="bi bi-caret-right-fill arrowRight arrowCards-Dashboard-Professor" onClick={cardDashNext}></i>
                </div>



                {/* Fim Cards de Visualização do Professor, com carrossel Responsivo */}

                {/* footer da tela professor */}
                {/* <footer className="footer-dashboard-Professor">

                    <div className="calendario-dashboard-Professor">
                        <Calendario />
                    </div>

                    <div className='linhaSeparadora-dashboard-Professor'></div>

                    <div className="areaImpressão-dashboard-Professor">

                        <h1>ÁREA DE IMPRESSÃO</h1>

                        <div className='edicaoNova-dashboard-Professor'>

                            <h3 className='nomeEdicao-dashboard-Professor'>EDIÇÃO DE JULHO</h3>

                            <button className='buttonEdicao-dashboard-Professor'>Baixar Arquivo</button>

                        </div>

                        <div className='edicaoNova-dashboard-Professor'>

                            <h3 className='nomeEdicao-dashboard-Professor'>EDIÇÃO DE JUNHO</h3>

                            <button className='buttonEdicao-dashboard-Professor'>Baixar Arquivo</button>

                        </div>

                        <div className='edicaoNova-dashboard-Professor'>

                            <h3 className='nomeEdicao-dashboard-Professor'>EDIÇÃO DE MAIO</h3>

                            <button className='buttonEdicao-dashboard-Professor'>Baixar Arquivo</button>

                        </div>

                    </div>

                </footer> */}
                {/*Fim do footer */}
<<<<<<< HEAD
>>>>>>> 5abe64af25a3e9dd09cafefd548595af1e57d3de
=======

        
=======

>>>>>>> 07b75f853abfe50a096439256c2d1b28872fa06b
{/* 
            </div>

        </div>

<<<<<<< HEAD
    </footer> */} */}
=======
<<<<<<< HEAD
        {/* </footer> */} 
=======
    </footer> */} 
>>>>>>> e4f5bbe2996a1ebe906da77f13efba69189417b3
>>>>>>> 07b75f853abfe50a096439256c2d1b28872fa06b
                    {/*Fim do footer */}

                {/* </div>

            </div> */}
            <div>

            </div>
        </body>

    );
};

export default DashboardProfessor;
