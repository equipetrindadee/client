import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './editarTelaInicial.css';
import { Modal, Button } from 'react-bootstrap';


export const EditarTelaProf = () => {

    /* Data atual */
    const [dataAtual, setDataAtual] = useState('');

    /* Menu */
    const [menuAberto, setMenuAberto] = useState(false);

    /* Titulo Chamativo */
    const [titleChamativoValue1, setTitleChamativoValue1] = useState("Grêmio Estudantil");

    /* Paragrafo 1 */
    const [titleParagrafoValue1, setTitleParagrafoValue1] = useState("")
    const [textAreaValue1, setTextAreaValue1] = useState("");
    const [deQuemFoiValue1, setDeQuemFoiValue1] =useState("")

    /* Paragrafo 2 */
    const [titleParagrafoValue2, setTitleParagrafoValue2] = useState("")
    const [textAreaValue2, setTextAreaValue2] = useState("");
    const [deQuemFoiValue2, setDeQuemFoiValue2] =useState("")

    /* Paragrafo 3 */
    const [titleParagrafoValue3, setTitleParagrafoValue3] = useState("")
    const [textAreaValue3, setTextAreaValue3] = useState("");
    const [deQuemFoiValue3, setDeQuemFoiValue3] =useState("")
    const [imageParagrafoSrcValue3, setImageParagrafoSrcValue3] = useState("");
    const [descriptionImageValue1, setDescriptionImageValue1] = useState("");

    /* Paragrafo 4 */
    const [titleParagrafoValue4, setTitleParagrafoValue4] = useState("")
    const [textAreaValue4, setTextAreaValue4] = useState("");
    const [deQuemFoiValue4, setDeQuemFoiValue4] =useState("")
    const [imageParagrafoSrcValue4, setImageParagrafoSrcValue4] = useState("");
    const [descriptionImageValue2, setDescriptionImageValue2] = useState("");

    /* Paragrafo Coluna */
    const [imageColunaSrc, setImageColunaSrc] = useState("");
    const [descriptionImageValue3, setDescriptionImageValue3] = useState("");
    
    /* Paragrafo Coluna 1 */
    const [titleParagrafoColunaValue1, setTitleParagrafoColunaValue1] = useState("")
    const [textAreaColunaValue1, setTextAreaColunaValue1] = useState("");
    const [deQuemFoiColunaValue1, setDeQuemFoiColunaValue1] =useState("")

    /* Paragrafo Coluna 2 */
    const [titleParagrafoColunaValue2, setTitleParagrafoColunaValue2] = useState("")
    const [textAreaColunaValue2, setTextAreaColunaValue2] = useState("");
    const [deQuemFoiColunaValue2, setDeQuemFoiColunaValue2] =useState("")

    /* Galeria Imagem */
    const [imageGaleriaSrc1, setImageGaleriaSrc1] = useState("")
    const [imageGaleriaSrc2, setImageGaleriaSrc2] = useState("")
    const [imageGaleriaSrc3, setImageGaleriaSrc3] = useState("")
    const [imageGaleriaSrc4, setImageGaleriaSrc4] = useState("")

    /* Const Modal */
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [modalId, setModalId] = useState(null);

    const handleClose = () => setShowModal(false);

    const handleShow = (id) => {
        const savedContent = localStorage.getItem(`legendaModal${id}`) || '';
        setModalContent(savedContent);
        setModalId(id);
        setShowModal(true);
    };


    /* Função do Titulo Chamativo */
    const titleChamativo = (e, setTitleChamativoValue) => {
        setTitleChamativoValue(e.target.value)
    }

    /* Função dos Paragrafos de cima */
    const titleParagrafo = (e, setTitleParagrafoValue) => {
        setTitleParagrafoValue(e.target.value)
    }

    const textAreaChange = (e, setTextAreaValue) => {
        setTextAreaValue(e.target.value);
    };

    const linkTirado = (e, setDeQuemFoiValue) => {
        setDeQuemFoiValue(e.target.value)
    }

    /* Função descrição das Imagens */
    const descricao = (e, setDescriptionImageValue) => {
        setDescriptionImageValue(e.target.value)
    }

    /* Função Menu */
    const toggleMenu = () => {
        setMenuAberto(!menuAberto); // Alterna o estado do menu
    };

    /* Função imagem paragrafo */
    const imagemParagrafo = (e, setImageParagrafoSrcValue) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageParagrafoSrcValue(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    /* Função imagem Coluna */
    const imagemColuna = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageColunaSrc(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    /* Função Imagem Galeria */
    const imagemGaleria = (e, setImageGaleriaSrc) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageGaleriaSrc(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }
    

    /* Função do Paragrafo das Colunas */
    const titleParagrafoColuna = (e, setTitleParagrafoColunaValue) => {
        setTitleParagrafoColunaValue(e.target.value)
    }

    const textAreaColunaChange = (e, setTextAreaColunaValue) => {
        setTextAreaColunaValue(e.target.value);
    };

    const linkTiradoColuna = (e, setDeQuemFoiColunaValue) => {
        setDeQuemFoiColunaValue(e.target.value)
    }


    const handleSaveImages = () => {
        const imagens = {
            paragrafo3: imageParagrafoSrcValue3,
            paragrafo4: imageParagrafoSrcValue4,
            coluna: imageColunaSrc,
            galeria: {
                image1: imageGaleriaSrc1,
                image2: imageGaleriaSrc2,
                image3: imageGaleriaSrc3,
                image4: imageGaleriaSrc4,
            }
        };

        // Salvando as imagens no localStorage
        localStorage.setItem('imagens', JSON.stringify(imagens));
    };

    const handleImageChange = (e, setImageSrc) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setImageSrc(base64String);
            };
            reader.readAsDataURL(file);
        }
    };


    /* Tela de mudar cor da Coluna */
    const [titulo, setTitulo] = useState('Aconteceu na Escola');
    const [corFundo, setCorFundo] = useState('#FFFFFF'); // Cor inicial do fundo
    const [corLinha, setCorLinha] = useState('#000000'); // Cor inicial da linha

    const handleSelectChange = (e) => {
        const value = e.target.value;
        let titulo, corFundo, corLinha;

        switch (value) {
            case '1':
                titulo = 'Educação em foco';
                corFundo = '#AFF24B';
                corLinha = '#AFF24B';
                break;
            case '2':
                titulo = 'Além das fronteiras';
                corFundo = '#CD3542';
                corLinha = '#CD3542';
                break;
            case '3':
                titulo = 'Monthly dose of english';
                corFundo = '#312CBF';
                corLinha = '#312CBF';
                break;
            case '4':
                titulo = 'Tecnologia';
                corFundo = '#024959';
                corLinha = '#024959';
                break;
            case '5':
                titulo = 'Aventuras na história';
                corFundo = '#A66E4E';
                corLinha = '#A66E4E';
                break;
            case '6':
                titulo = 'Palavreando';
                corFundo = '#FFF500';
                corLinha = '#FFF500';
                break;
            case '7':
                titulo = 'Além do livro';
                corFundo = '#BC91D9';
                corLinha = '#BC91D9';
                break;
            case '8':
                titulo = 'Bioquímica em ação';
                corFundo = '#41BFB3';
                corLinha = '#41BFB3';
                break;
            default:
                titulo = 'Aconteceu na Escola';
                corFundo = '#F2357B';
                corLinha = '#F2357B';
                break;
        }

        setTitulo(titulo);
        setCorFundo(corFundo);
        setCorLinha(corLinha);

        // Salvar no localStorage
        localStorage.setItem('opcaoSelecionada', value);
        localStorage.setItem('titulo', titulo);
        localStorage.setItem('corFundo', corFundo);
        localStorage.setItem('corLinha', corLinha);
    };
    

    /* Função de salvar */
    useEffect(() => {
        /* Salvar textarea */
        const savedData = JSON.parse(localStorage.getItem('dados'));
        if (savedData) {
            setTitleChamativoValue1(savedData.titleChamativo || "");

            setTitleParagrafoValue1(savedData.paragrafo1?.title || "");
            setTextAreaValue1(savedData.paragrafo1?.content || "");
            setDeQuemFoiValue1(savedData.paragrafo1?.author || "");

            setTitleParagrafoValue2(savedData.paragrafo2?.title || "");
            setTextAreaValue2(savedData.paragrafo2?.content || "");
            setDeQuemFoiValue2(savedData.paragrafo2?.author || "");

            setTitleParagrafoValue3(savedData.paragrafo3?.title || "");
            setTextAreaValue3(savedData.paragrafo3?.content || "");
            setDeQuemFoiValue3(savedData.paragrafo3?.author || "");
            setDescriptionImageValue1(savedData.paragrafo3?.description || "")

            setTitleParagrafoValue4(savedData.paragrafo4?.title || "");
            setTextAreaValue4(savedData.paragrafo4?.content || "");
            setDeQuemFoiValue4(savedData.paragrafo4?.author || "");
            setDescriptionImageValue2(savedData.paragrafo4?.description || "")

            setTitleParagrafoColunaValue1(savedData.coluna1?.title || "");
            setTextAreaColunaValue1(savedData.coluna1?.content || "");
            setDeQuemFoiColunaValue1(savedData.coluna1?.author || "");

            setTitleParagrafoColunaValue2(savedData.coluna2?.title || "");
            setTextAreaColunaValue2(savedData.coluna2?.content || "");
            setDeQuemFoiColunaValue2(savedData.coluna2?.author || "");
            
            setDescriptionImageValue3(savedData.coluna2?.description || "")
        }

        /* Salvar Select Coluna */
        const opcaoSalva = localStorage.getItem('opcaoSelecionada');
        const tituloSalvo = localStorage.getItem('titulo');
        const corFundoSalva = localStorage.getItem('corFundo');
        const corLinhaSalva = localStorage.getItem('corLinha');

        if (opcaoSalva) {
            setTitulo(tituloSalvo || 'Aconteceu na Escola');
            setCorFundo(corFundoSalva || '#F2357B');
            setCorLinha(corLinhaSalva || '#F2357B');
        }

        /* Função data atual */

        // Obtém a data atual
        const hoje = new Date();
        // Formata a data no formato desejado (ex: dd/mm/aaaa)
        const dia = String(hoje.getDate()).padStart(2, '0');
        const mes = String(hoje.getMonth() + 1).padStart(2, '0'); // Meses começam do 0
        const ano = hoje.getFullYear();
        const dataFormatada = `${dia}/${mes}/${ano}`;
        
        // Atualiza o estado com a data formatada
        setDataAtual(dataFormatada);

        const imagensSalvas = JSON.parse(localStorage.getItem('imagens'));
        if (imagensSalvas) {
            setImageParagrafoSrcValue3(imagensSalvas.paragrafo3);
            setImageParagrafoSrcValue4(imagensSalvas.paragrafo4);
            setImageColunaSrc(imagensSalvas.coluna);
            setImageGaleriaSrc1(imagensSalvas.galeria.image1);
            setImageGaleriaSrc2(imagensSalvas.galeria.image2);
            setImageGaleriaSrc3(imagensSalvas.galeria.image3);
            setImageGaleriaSrc4(imagensSalvas.galeria.image4);
        }
            
    }, []);

    /* Salvando os Textareas usando um banco de dados improvisado */
    const handleSave = () => {
        const data = {
            titleChamativo: titleChamativoValue1,

            paragrafo1: {
                title: titleParagrafoValue1,
                content: textAreaValue1,
                author: deQuemFoiValue1,
            },

            paragrafo2: {
                title: titleParagrafoValue2,
                content: textAreaValue2,
                author: deQuemFoiValue2,
            },

            paragrafo3: {
                title: titleParagrafoValue3,
                content: textAreaValue3,
                author: deQuemFoiValue3,
                description: descriptionImageValue1,
            },

            paragrafo4: {
                title: titleParagrafoValue4,
                content: textAreaValue4,
                author: deQuemFoiValue4,
                description: descriptionImageValue2,
            },

            coluna1: {
                title: titleParagrafoColunaValue1,
                content: textAreaColunaValue1,
                author: deQuemFoiColunaValue1,
            },

            coluna2: {
                title: titleParagrafoColunaValue2,
                content: textAreaColunaValue2,
                author: deQuemFoiColunaValue2,
                description: descriptionImageValue3,
            },

        };
        
        // Salvando dados no localStorage
        localStorage.setItem('dados', JSON.stringify(data));

        // Chamar a função que salva as imagens
        handleSaveImages();

        alert("Alterações salvas com extremo sucesso!");
    };

    const saveLegends = () => {
        localStorage.setItem(`legendaModal${modalId}`, modalContent);
        handleClose();
    }
    

    /* Retorno da aplicação */
    return (

        /* Container do Codigo Inteiro */
        <div className='container-editarTelaInicial-professor'>

            {/* Header do site */}
            <header className='menu-editarTelaInicial-professor'>
                
                {/* Button que abre o Menu */}
                <button 
                    type='button' 
                    className='buttonMenu-editarTelaInicial-professor' 
                    onClick={toggleMenu} // Chama a função ao clicar
                >
                    <i className='bx bx-menu'></i>
                </button>

                {/* Renderiza o menu condicionalmente */}
                <div className={`menu-editarTelaInicial ${menuAberto ? 'aberto' : 'fechado'}`}>

                    {/* Navbar do Editar Tela Inicial */}
                    <ul className="navBar-editarTelaInicial">

                        <li className="navbar_Item-editarTelaInicial logo-NavBar-editarTelaInicial">
                            <a href="http://localhost:3000/dashboardProfessor">O EDUCADOR</a>
                        </li>

                        <li className="navbar_Item-editarTelaInicial">
                            <a href="http://localhost:3000/dashboardProfessor">
                                <i className='bi bi-house-door'></i>
                                <p>Dashboard</p>
                            </a>
                        </li>

                        <li className="navbar_Item-editarTelaInicial">
                            <a href="http://localhost:3000/materiaColuna">
                                <i className='bi bi-journal-bookmark-fill'></i>
                                <p>Vizualizar Colunas</p>
                            </a>
                        </li>

                        <li className="navbar_Item-editarTelaInicial">
                            <a href="http://localhost:3000/controleColuna">
                                <i className='bi bi-person-plus-fill'></i>
                                <p>Controle Colunista</p>
                            </a>
                        </li>

                        <li className="navbar_Item-editarTelaInicial navbar_ItemSelected-editarTelaInicial">
                            <a href="http://localhost:3000/editarTelaInicial">
                                <i className='bi bi-file-post'></i>
                                <p>Editar Tela Inicial</p>
                            </a>
                        </li>

                        <li className="navbar_Item-editarTelaInicial">
                            <a href="/chat">
                                <i className='bi bi-chat-text'></i>
                                <p>Chat</p>
                            </a>
                        </li>

                        <li className="navbar_Item-editarTelaInicial">
                            <a href="http://localhost:3000/faleconoscoProfessor">
                                <i className='bi bi-chat-left-quote'></i>
                                <p>Fale Conosco</p>
                            </a>
                        </li>
                        
                        <li className="navbar_Item-editarTelaInicial navbar_Sair-editarTelaInicial">
                            <a href="http://localhost:3000/login">
                                <i className='bi bi-box-arrow-right professor_navBar_exit-icon'></i>
                                <p>Sair</p>
                            </a>
                        </li>

                    </ul>

                </div>

            </header>

            {/* Container da seção do Jornal */}
            <div className='containerEdicao-editarTelaInicial-professor'>

                {/* Section do lado Esquerdo */}
                <div className='sectionEsquerda-editarTelaInicial-professor'>
                    
                    {/* Div da Logo do Lado Esquerdo */}
                    <div className='logo-editarTelaInicial-professor'>

                        {/* Chamada da função da data atual */}
                        <h4>{`${dataAtual}`}</h4>

                        {/* Resto da Logo */}
                        <div className='linhaLogo-editarTelaInicial-professor'></div>

                        <h1>O EDUCADOR</h1>

                        <h4>TE MANTER INFORMADO É NOSSA MISSÃO</h4>

                    </div>

                    {/* Div de Salvar e ir para processo de postagem */}
                    <div className='buttonResponsive-editarTelaInicial-professor'>

                        {/* Div de Salvar e ir para processo de postagem */}
                        <a href='http://localhost:3000/postagem/telaInicial'>
                            <button className='buttonSave-editarTelaInicial-professor' onClick={handleSave}>
                                SALVAR
                            </button>
                        </a>

                    </div>

                    {/* Section responsavel pelos primeiros textareas */}
                    <section className='sectionInicio-ladoEsquerdo-editarTelaInicial-professor'>

                        {/* Div que é responsavel pelos textareas da Esquerda */}
                        <div className='sectionLeft-ladoEsquerdo-editarTelaInicial-professor'>

                            {/* Titulo Chamativo função */}
                            <textarea
                                className='titleParagrafo-ladoEsquerdo-editarTelaInicial-professor'
                                value={titleChamativoValue1}
                                onChange={(e) => titleChamativo(e, setTitleChamativoValue1)}
                                rows="4"
                                cols="50"
                                maxLength={26}
                            />

                            {/* Div Responsavel pelo Paragrafo 1 */}
                            <div>

                                {/* Paragrafo 1 */}
                                <h3>Paragrafo 1</h3>

                                <textarea
                                 name="titleParagrafo1" 
                                 rows="1" 
                                 cols="50"
                                 value={titleParagrafoValue1}
                                 onChange={(e) => titleParagrafo(e, setTitleParagrafoValue1)}
                                 maxLength={30}
                                />

                                <textarea 
                                name="w3review" 
                                rows="1" 
                                cols="20"
                                value={deQuemFoiValue1}
                                onChange={(e) => linkTirado(e, setDeQuemFoiValue1)}
                                maxLength={27}
                                />

                                <textarea 
                                name="w3review" 
                                rows="6" 
                                cols="50"
                                value={textAreaValue1}
                                onChange={(e) => textAreaChange(e, setTextAreaValue1)}
                                maxLength={350}
                                />           

                            </div>

                            {/* Div responsavel para o paragrafo 2 */}
                            <div>

                                <h3>Paragrafo 2</h3>

                                <textarea
                                 name="titleParagrafo1" 
                                 rows="1" 
                                 cols="50"
                                 value={titleParagrafoValue2}
                                 onChange={(e) => titleParagrafo(e, setTitleParagrafoValue2)}
                                 maxLength={30}
                                />

                                <textarea 
                                name="w3review" 
                                rows="1" 
                                cols="20"
                                value={deQuemFoiValue2}
                                onChange={(e) => linkTirado(e, setDeQuemFoiValue2)}
                                maxLength={27}
                                />

                                <textarea 
                                name="w3review" 
                                rows="6"  
                                cols="50"
                                value={textAreaValue2}
                                onChange={(e) => textAreaChange(e, setTextAreaValue2)}
                                maxLength={350}
                                />

                            </div>

                        </div>

                        {/* Div que é responsavel pelos textareas da parte de cima da Direita */}
                        <div className='sectionLeftTop-ladoEsquerdo-editarTelaInicial-professor'>

                            {/* Div responsavel pelo input da Imagem */}
                            <div className="input-imagem-container">

                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    id="input-imagemParagrafo3"
                                    className='designInput-editarTela-professor'
                                    onChange={(e) => imagemParagrafo(e, setImageParagrafoSrcValue3)} 
                                />

                                <label id='inputImagemParagrafo' htmlFor="input-imagemParagrafo3" className="imageParagrafo-editarTelaInicial-professor">
                                    <i className="bx bx-image-add"></i> Escolher imagem
                                </label>

                                <textarea 
                                name="w3review" 
                                rows="1" 
                                cols="20"
                                value={descriptionImageValue1}
                                onChange={(e) => descricao(e, setDescriptionImageValue1)}
                                maxLength={27}
                                />

                            </div>

                            {/* Div responsavel pelo paragrafo 3 */}
                            <div>

                                <h3>Paragrafo 3</h3>

                                <textarea
                                 name="titleParagrafo3" 
                                 rows="1" 
                                 cols="50"
                                 value={titleParagrafoValue3}
                                 onChange={(e) => titleParagrafo(e, setTitleParagrafoValue3)}
                                 maxLength={30}
                                />

                                <textarea 
                                name="w3review" 
                                rows="1" 
                                cols="20"
                                value={deQuemFoiValue3}
                                onChange={(e) => linkTirado(e, setDeQuemFoiValue3)}
                                maxLength={27}
                                />

                                <textarea 
                                name="w3review" 
                                rows="6" 
                                cols="50"
                                value={textAreaValue3}
                                onChange={(e) => textAreaChange(e, setTextAreaValue3)}
                                maxLength={350}
                                />

                            </div>

                        </div>

                        {/* Div que é responsavel pelos textareas da parte de baixo da Direita */}
                        <div className='sectionLeftBot-ladoEsquerdo-editarTelaInicial-professor'>

                            {/* Div responsavel pelo paragrafo 4 */}
                            <div>

                                <h3>Paragrafo 4</h3>

                                <textarea
                                 name="titleParagrafo3" 
                                 rows="1" 
                                 cols="50"
                                 value={titleParagrafoValue4}
                                 onChange={(e) => titleParagrafo(e, setTitleParagrafoValue4)}
                                 maxLength={30}
                                />

                                <textarea 
                                name="w3review" 
                                rows="1" 
                                cols="20"
                                value={deQuemFoiValue4}
                                onChange={(e) => linkTirado(e, setDeQuemFoiValue4)}
                                maxLength={27}
                                />

                                <textarea 
                                name="w3review" 
                                rows="6" 
                                cols="50"
                                value={textAreaValue4}
                                onChange={(e) => textAreaChange(e, setTextAreaValue4)}
                                maxLength={350}
                                />

                            </div>

                            {/* Div responsavel pelo input da Imagem */}
                            <div className="input-imagem-container">

                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    id="input-imagemParagrafo4"
                                    className='designInput-editarTela-professor'
                                    onChange={(e) => imagemParagrafo(e, setImageParagrafoSrcValue4)} 
                                />
                                
                                <label id='inputImagemParagrafo' htmlFor="input-imagemParagrafo4" className="imageParagrafo-editarTelaInicial-professor">
                                    <i className="bx bx-image-add"></i> Escolher imagem
                                </label>

                                <textarea 
                                name="w3review" 
                                rows="1" 
                                cols="20"
                                value={descriptionImageValue2}
                                onChange={(e) => descricao(e, setDescriptionImageValue2)}
                                maxLength={27}
                                />

                            </div>

                        </div>

                    </section>

                    {/* Segunda section que cuida da Galeria */}
                    <section className='sectionGaleria-ladoEsquerdo-editarTelaInicial-professor'>

                        <h1>Galeria</h1>

                        {/* Div grid, que separa a area da Galeria */}
                        <div className='gridGaleria-ladoEsquerdo-editarTelaInicial-professor'>

                            {/* Div responsavel pelo input da imagem 1 */}
                            <div className="input-imagem-container input1-ladoEsquerdo-editarTelaInicial-professor">

                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    id="input-imagemGaleria1"
                                    className='designInput-editarTela-professor'
                                    onChange={(e) => imagemGaleria(e, setImageGaleriaSrc1)} 
                                />

                                <label htmlFor="input-imagemGaleria1" className="input-imagem-label">
                                    <i class="bi bi-1-square"></i> Imagem
                                </label>

                            </div>

                            {/* Div responsavel pelo input da imagem 2 */}
                            <div className="input-imagem-container input2-ladoEsquerdo-editarTelaInicial-professor">

                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    id="input-imagemGaleria2"
                                    className='designInput-editarTela-professor'
                                    onChange={(e) => imagemGaleria(e, setImageGaleriaSrc2)} 
                                />

                                <label htmlFor="input-imagemGaleria2" className="input-imagem-label">
                                    <i class="bi bi-2-square"></i> Imagem
                                </label>

                            </div>
                            
                            {/* Div responsavel pelo input da imagem 3 */}
                            <div className="input-imagem-container input3-ladoEsquerdo-editarTelaInicial-professor">

                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    id="input-imagemGaleria3"
                                    className='designInput-editarTela-professor'
                                    onChange={(e) => imagemGaleria(e, setImageGaleriaSrc3)} 
                                />

                                <label htmlFor="input-imagemGaleria3" className="input-imagem-label">
                                    <i class="bi bi-3-square"></i> Imagem
                                </label>

                            </div>
                            
                            {/* Div responsavel pelo input da imagem 4 */}
                            <div className="input-imagem-container input4-ladoEsquerdo-editarTelaInicial-professor">

                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    id="input-imagemGaleria4"
                                    className='designInput-editarTela-professor'
                                    onChange={(e) => imagemGaleria(e, setImageGaleriaSrc4)} 
                                />

                                <label htmlFor="input-imagemGaleria4" className="input-imagem-label">
                                    <i class="bi bi-4-square"></i> Imagem
                                </label>

                            </div>

                        </div>

                            {/* Botões para adicionar legenda em imagens */}
                            <div className='containerButtonsLegendas-ladoEsquerdo-editarTelaInicial-professor'>
                                
                                {/* Button Legenda image 1 */}
                                <button className='button1Legendas-ladoEsquerdo-editarTelaInicial-professor' onClick={() => handleShow(1)}>
                                    Legenda Imagem 1
                                </button>

                                {/* Button Legenda image 2 */}
                                <button className='button2Legendas-ladoEsquerdo-editarTelaInicial-professor' onClick={() => handleShow(2)}>
                                    Legenda Imagem 2
                                </button>

                                {/* Button Legenda image 3 */}
                                <button className='button3Legendas-ladoEsquerdo-editarTelaInicial-professor' onClick={() => handleShow(3)}>
                                    Legenda Imagem 3
                                </button>

                                {/* Button Legenda image 4 */}
                                <button className='button4Legendas-ladoEsquerdo-editarTelaInicial-professor' onClick={() => handleShow(4)}>
                                    Legenda Imagem 4
                                </button>

                            </div>

                    </section>

                    {/* Terceira section que cuida sobre informações da coluna */}
                    <section className='sectionColuna-ladoEsquerdo-editarTelaInicial-professor'>

                        <h1>COLUNA</h1>

                        {/* Select para selecionar o titulo e fundo que você ira utilizar */}
                        <select className="form-select selectColuna-ladoEsquerdo-editarTelaInicial-professor" 
                        onChange={handleSelectChange} value={localStorage.getItem('opcaoSelecionada') || '0'}>
                            <option value="0">Aconteceu na Escola</option>
                            <option value="1">Educação em foco</option>
                            <option value="2">Além das fronteiras</option>
                            <option value="3">Monthly dose of english</option>
                            <option value="4">Tecnologia</option>
                            <option value="5">Aventuras na história</option>
                            <option value="6">Palavreando</option>
                            <option value="7">Além do livro</option>
                            <option value="8">Bioquímica em ação</option>
                        </select>

                        {/* Div Grid, que cuida das informações da area da coluna */}
                        <div className='gridInformate-ladoEsquerdo-editarTelaInicial-professor'>

                            {/* Div responsavel pelo textarea Coluna 1 */}
                            <div>

                                <textarea 
                                name="titleParagrafoColuna1" 
                                rows="1" 
                                cols="50"
                                value={titleParagrafoColunaValue1}
                                onChange={(e) => titleParagrafoColuna(e, setTitleParagrafoColunaValue1)}
                                maxLength={30}
                                />

                                <textarea 
                                name="w3review" 
                                rows="1" 
                                cols="20"
                                value={deQuemFoiColunaValue1}
                                onChange={(e) => linkTiradoColuna(e, setDeQuemFoiColunaValue1)}
                                maxLength={27}
                                />

                                <textarea 
                                name="w3review" 
                                rows="6"  
                                cols="50"
                                value={textAreaColunaValue1}
                                onChange={(e) => textAreaColunaChange(e, setTextAreaColunaValue1)}
                                maxLength={350}
                                />

                            </div>
                            
                            {/* Div responsavel pelo textarea Coluna 2 */}
                            <div>

                                <textarea 
                                name="titleParagrafoColuna1" 
                                rows="1" 
                                cols="50"
                                value={titleParagrafoColunaValue2}
                                onChange={(e) => titleParagrafoColuna(e, setTitleParagrafoColunaValue2)}
                                maxLength={30}
                                />

                                <textarea 
                                name="w3review" 
                                rows="1" 
                                cols="20"
                                value={deQuemFoiColunaValue2}
                                onChange={(e) => linkTiradoColuna(e, setDeQuemFoiColunaValue2)}
                                maxLength={27}
                                />

                                <textarea 
                                name="w3review" 
                                rows="6" 
                                cols="50"
                                value={textAreaColunaValue2}
                                onChange={(e) => textAreaColunaChange(e, setTextAreaColunaValue2)}
                                maxLength={350}
                                />

                            </div>

                            {/* Div responsavel pela imagem Coluna */}
                            <div className="input-imagem-container">

                                <input 
                                type="file" 
                                name="arquivos" 
                                accept="image/*" 
                                id='input-imagemColuna'
                                className='designInput-editarTela-professor'
                                onChange={imagemColuna} 
                                />

                                <label htmlFor="input-imagemColuna" className="imagemColuna-editarTelaInicial-professor">
                                    <i className="bx bx-image-add"></i> Escolher imagem
                                </label>

                                <textarea 
                                name="w3review" 
                                rows="1" 
                                cols="20"
                                value={descriptionImageValue3}
                                onChange={(e) => descricao(e, setDescriptionImageValue3)}
                                maxLength={27}
                                />

                            </div>

                        </div>

                    </section>

                    {/* Modals do Lado Esquerdo */}
                    <Modal show={showModal} onHide={handleClose}>

                        <Modal.Header className='modalLegenda-editarTelaInicial-professor' closeButton>
                            <Modal.Title>Legenda Imagens</Modal.Title>
                        </Modal.Header>

                        <Modal.Body className='modalTextarea-editarTelaInicial-professor'>
                            <h2>Coloque uma breve legenda, sobre de onde foi tirada a imagem</h2>
                            <h2 className='maxCaracterModal-editarTelaInicial-professor'>Máximo de<h3>150</h3>caracteres</h2>
                            <textarea
                                className="form-control"
                                rows="3"
                                maxLength={150}
                                value={modalContent}
                                onChange={(e) => setModalContent(e.target.value)}
                                style={{ 
                                    resize: 'none' // Impede redimensionamento
                                }}
                            />
                        </Modal.Body>

                        <Modal.Footer className='fotterTextarea-editarTelaInicial-professor'>
                            <Button className='buttonCloseModal-editarTelaInicial-professor' variant="secondary">
                                Fechar
                                <Button variant="secondary" className="buttonAnimationClose-editarTelaInicial-professor" onClick={handleClose}>
                                    <p>FECHAR <i className="bx bx-exit"></i></p>
                                </Button>
                            </Button>
                            <Button className='buttonSaveModal-editarTelaInicial-professor' variant="primary" onClick={saveLegends}>
                                Salvar
                                <Button variant="secondary" className="buttonAnimationSave-editarTelaInicial-professor" onClick={handleClose}>
                                    <p>SALVAR <i class='bx bx-check'></i></p>
                                </Button>
                            </Button>
                        </Modal.Footer>

                    </Modal>

                </div>

                {/* Section do lado Direito */}
                <div className='sectionDireita-editarTelaInicial-professor'>

                    {/* Div da Logo do Lado Esquerdo */}
                    <div className='logo-editarTelaInicial-professor'>

                        {/* Chamada da função da data atual */}
                        <h4>{`${dataAtual}`}</h4>

                        {/* Resto da logo */}
                        <div className='linhaLogo-editarTelaInicial-professor'></div>

                        <h1>O EDUCADOR</h1>

                        <h4>TE MANTER INFORMADO É NOSSA MISSÃO</h4>

                    </div>

                    {/* Section responsavel pelos primeiros textos */}
                    <section className='sectionInicio-ladoDireito-editarTelaInicial-professor'>

                        {/* Section responsavel pela parte direita do Jornal */}
                        <div className='sectionRight-ladoDireito-editarTelaInicial-professor'>

                            {/* Titulo Chamativo */}
                            <h3 className='titleParagrafo-ladoDireito-editarTelaInicial-professor' name="w3review" rows="4" cols="50">
                                {titleChamativoValue1}
                            </h3>

                            {/* Div responsavel pelo paragrafo 1 */}
                            <div>

                                {/* Titulo Primeiro paragrafo */}
                                <h4>
                                    {titleParagrafoValue1}
                                </h4>

                                <p className='linkColor-editarJornal-professor'>{deQuemFoiValue1}</p>

                                <p name="w3review" rows="4" cols="50" >
                                    {textAreaValue1}
                                </p>

                            </div>
                            
                            {/* Div responsavel pelo paragrafo 2 */}
                            <div>

                                <h4>
                                    {titleParagrafoValue2}
                                </h4>

                                <p className='linkColor-editarJornal-professor'>{deQuemFoiValue2}</p>

                                <p name="w3review" rows="4" cols="50">
                                    {textAreaValue2}
                                </p>

                            </div>

                        </div>
                        
                        {/* Section responsavel pela parte esquerda top do Jornal */}
                        <div className='sectionRightTop-ladoDireito-editarTelaInicial-professor'>

                            {/* Div responsavel pelo paragrafo 3 */}
                            <div>
                                {
                                imageParagrafoSrcValue3 
                                && 
                                <img src={imageParagrafoSrcValue3} 
                                alt="Imagem carregada" 
                                />
                                }

                                <p className='linkColor-editarJornal-professor'>{descriptionImageValue1}</p>

                            </div>

                            <div>

                                <h4>
                                    {titleParagrafoValue3}
                                </h4>

                                <p className='linkColor-editarJornal-professor'>{deQuemFoiValue3}</p>

                                <p name="w3review" rows="4" cols="50">
                                    {textAreaValue3}
                                </p>

                            </div>

                        </div>
                        
                        {/* Section responsavel pela parte esquerda bottom do Jornal */}
                        <div className='sectionRightBot-ladoDireito-editarTelaInicial-professor'>
                                
                                {/* Div responsavel pelo paragrafo 4 */}
                                <div>

                                    <h4>
                                        {titleParagrafoValue4}
                                    </h4>

                                    <p className='linkColor-editarJornal-professor'>{deQuemFoiValue4}</p>

                                    <p name="w3review" rows="4" cols="50">
                                        {textAreaValue4}
                                    </p>

                                </div>

                            <div>
                                {
                                imageParagrafoSrcValue4 
                                && 
                                <img src={imageParagrafoSrcValue4} 
                                alt="Imagem carregada" 
                                />
                                }

                                <p className='linkColor-editarJornal-professor'>{descriptionImageValue2}</p>
                            </div>

                        </div>

                    </section>
                    
                    {/* Segunda section que cuida da Galeria */}
                    <section className='sectionGaleria-ladoDireito-editarTelaInicial-professor'>

                        <h1>Galeria</h1>

                        <p className='linkColor-editarJornal-professor descricaoGaleria-editarJornal-professor'>TODAS AS FOTOS FORAM RETIRADOS DO NOSSO ARQUIVO PESSOAL</p>

                        <div className='gridGaleria-ladoDireito-editarTelaInicial-professor'>

                            {
                            imageGaleriaSrc1
                            && 
                            <img src={imageGaleriaSrc1} 
                            alt="Imagem carregada" 
                            className='img1-ladoEsquerdo-editarTelaInicial-professor'
                            />
                            }

                            {
                            imageGaleriaSrc2
                            && 
                            <img src={imageGaleriaSrc2} 
                            alt="Imagem carregada" 
                            className='img2-ladoEsquerdo-editarTelaInicial-professor'
                            />
                            }

                            {
                            imageGaleriaSrc3
                            && 
                            <img src={imageGaleriaSrc3} 
                            alt="Imagem carregada" 
                            className='img3-ladoEsquerdo-editarTelaInicial-professor'
                            />
                            }

                            {
                            imageGaleriaSrc4
                            && 
                            <img src={imageGaleriaSrc4} 
                            alt="Imagem carregada" 
                            className='img4-ladoEsquerdo-editarTelaInicial-professor'
                            />
                            }

                        </div>

                    </section>

                    {/* Terceira section que cuida sobre informações da coluna */}
                    <section className='sectionColuna-ladoDireito-editarTelaInicial-professor'>

                        <div className='fundoColuna-ladoDireito-editarTelaInicial-professor' style={{ backgroundColor: corFundo }}>
                            <h1>{titulo}</h1>
                        </div>      

                        <div className='gridInformate-ladoDireito-editarTelaInicial-professor'>
                            <div>
                                <h4>
                                    {titleParagrafoColunaValue1}
                                </h4>

                                <p className='linkColor-editarJornal-professor'>{deQuemFoiColunaValue1}</p>

                                <p name="w3review" rows="4" cols="50">
                                    {textAreaColunaValue1}
                                </p>

                            </div>

                            <div className='linhaInformate-ladoDireito-editarTelaInicial-professor' style={{ backgroundColor: corLinha }}></div>

                            <div>
                                <h4>
                                    {titleParagrafoColunaValue2}
                                </h4>

                                <p className='linkColor-editarJornal-professor'>{deQuemFoiColunaValue2}</p>

                                <p name="w3review" rows="4" cols="50">
                                    {textAreaColunaValue2}
                                </p>

                            </div>

                            <div>
                                {imageColunaSrc && 
                                <img 
                                    src={imageColunaSrc} 
                                    alt="Imagem carregada" 
                                />}

                                <p className='linkColor-editarJornal-professor'>{descriptionImageValue3}</p>
                            </div>

                        </div>

                    </section>

                </div>

            </div>

        </div>
    );

};

export default EditarTelaProf;