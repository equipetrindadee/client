import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './postagemTelaInicial.css';
import NavBarProfessor from '../../navBar/navBarProfessor';
import AreaProfessor from "../../professor/areaProfessor/index.js"

export const PostagemTelaInicial = () => {
    const [dataAtual, setDataAtual] = useState('');

    const [titleChamativoValue1, setTitleChamativoValue1] = useState('');

    const [titleParagrafoValue1, setTitleParagrafoValue1] = useState('');
    const [textAreaValue1, setTextAreaValue1] = useState('');
    const [deQuemFoiValue1, setDeQuemFoiValue1] = useState('');

    const [titleParagrafoValue2, setTitleParagrafoValue2] = useState('');
    const [textAreaValue2, setTextAreaValue2] = useState('');
    const [deQuemFoiValue2, setDeQuemFoiValue2] = useState('');

    const [imageParagrafoSrcValue3, setImageParagrafoSrcValue3] = useState('');
    const [descriptionImageValue1, setDescriptionImageValue1] = useState('');
    const [titleParagrafoValue3, setTitleParagrafoValue3] = useState('');
    const [textAreaValue3, setTextAreaValue3] = useState('');
    const [deQuemFoiValue3, setDeQuemFoiValue3] = useState('');
    
    const [imageParagrafoSrcValue4, setImageParagrafoSrcValue4] = useState('');
    const [titleParagrafoValue4, setTitleParagrafoValue4] = useState('');
    const [textAreaValue4, setTextAreaValue4] = useState('');
    const [deQuemFoiValue4, setDeQuemFoiValue4] = useState('');
    const [descriptionImageValue2, setDescriptionImageValue2] = useState('');

    const [titulo, setTitulo] = useState('');
    const [corFundo, setCorFundo] = useState('');
    const [corLinha, setCorLinha] = useState('');

    const [titleParagrafoColunaValue1, setTitleParagrafoColunaValue1] = useState('');
    const [deQuemFoiColunaValue1, setDeQuemFoiColunaValue1] = useState('');
    const [textAreaColunaValue1, setTextAreaColunaValue1] = useState('');

    const [titleParagrafoColunaValue2, setTitleParagrafoColunaValue2] = useState('');
    const [deQuemFoiColunaValue2, setDeQuemFoiColunaValue2] = useState('');
    const [textAreaColunaValue2, setTextAreaColunaValue2] = useState('');

    const [imageColunaSrc, setImageColunaSrc] = useState('');
    const [descriptionImageValue3, setDescriptionImageValue3] = useState('');

    const [imageGaleriaSrc1, setImageGaleriaSrc1] = useState('');
    const [imageGaleriaSrc2, setImageGaleriaSrc2] = useState('');
    const [imageGaleriaSrc3, setImageGaleriaSrc3] = useState('');
    const [imageGaleriaSrc4, setImageGaleriaSrc4] = useState('');

    useEffect(() => {
        // Recuperar os dados do localStorage
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
            setDescriptionImageValue1(savedData.paragrafo3?.description || "");

            setTitleParagrafoValue4(savedData.paragrafo4?.title || "");
            setTextAreaValue4(savedData.paragrafo4?.content || "");
            setDeQuemFoiValue4(savedData.paragrafo4?.author || "");
            setDescriptionImageValue2(savedData.paragrafo4?.description || "");

            setTitleParagrafoColunaValue1(savedData.coluna1?.title || "");
            setDeQuemFoiColunaValue1(savedData.coluna1?.author || "");
            setTextAreaColunaValue1(savedData.coluna1?.content || "");

            setTitleParagrafoColunaValue2(savedData.coluna2?.title || "");
            setDeQuemFoiColunaValue2(savedData.coluna2?.author || "");
            setTextAreaColunaValue2(savedData.coluna2?.content || "");

            setDescriptionImageValue3(savedData.coluna2?.description || "");
        }

        const opcaoSalva = localStorage.getItem('opcaoSelecionada');
        const tituloSalvo = localStorage.getItem('titulo');
        const corFundoSalva = localStorage.getItem('corFundo');
        const corLinhaSalva = localStorage.getItem('corLinha');

        if (opcaoSalva) {
            setTitulo(tituloSalvo || 'Aconteceu na Escola');
            setCorFundo(corFundoSalva || '#F2357B');
            setCorLinha(corLinhaSalva || '#F2357B');
        }

        const imagensSalvas = JSON.parse(localStorage.getItem('imagens'));
        if (imagensSalvas) {
            setImageParagrafoSrcValue3(imagensSalvas.paragrafo3);
            setImageParagrafoSrcValue4(imagensSalvas.paragrafo4);
            setImageGaleriaSrc1(imagensSalvas.galeria.image1);
            setImageGaleriaSrc2(imagensSalvas.galeria.image2);
            setImageGaleriaSrc3(imagensSalvas.galeria.image3);
            setImageGaleriaSrc4(imagensSalvas.galeria.image4);
            setImageColunaSrc(imagensSalvas.coluna);
        }

        // Formata a data
        const hoje = new Date();
        const dia = String(hoje.getDate()).padStart(2, '0');
        const mes = String(hoje.getMonth() + 1).padStart(2, '0');
        const ano = hoje.getFullYear();
        const dataFormatada = `${dia}/${mes}/${ano}`;
        setDataAtual(dataFormatada);
    }, []);

    return (
        <div className='containerPostagem-postagemTelaInicial-professor'>
            <NavBarProfessor />

            <AreaProfessor/>

            <main className='conteudoPostagem-postagemTelaInicial-professor'>

                <div className='folhaJornal-postagemTelaInicial-professor'>
                    
                    <div className='logo-editarTelaInicial-professor'>

                        <h4>{dataAtual}</h4>

                        <div className='linhaLogo-editarTelaInicial-professor'></div>

                        <h1>O EDUCADOR</h1>

                        <h4>TE MANTER INFORMADO É NOSSA MISSÃO</h4>

                    </div> 
                    
                    {/* Grid que cuida da section 1 */}
                    <section className='gridSection1-editarTelaInicial-professor'>

                        {/* Grid que Cuida do lado esquerdo da section */}
                        <div className='gridTextoEsquerdo-postarTelaInicial-professor'>

                            <h3 className='titleChamativo-postarTelaInicial-professor'>{titleChamativoValue1}</h3>

                            <div className='paragrafo1-postarTelaInicial-professor'>

                                <h4 className='titleParagrafos-postarTelaInicial-professor'>{titleParagrafoValue1}</h4>

                                <p className='descricaoParagrafo-postarTelaInicial-professor'>{deQuemFoiValue1}</p>

                                <p>{textAreaValue1}</p>

                            </div>

                            <div className='paragrafo2-postarTelaInicial-professor'>

                                <h4 className='titleParagrafos-postarTelaInicial-professor'>{titleParagrafoValue2}</h4>

                                <p className='descricaoParagrafo-postarTelaInicial-professor'>{deQuemFoiValue2}</p>

                                <p>{textAreaValue2}</p>

                            </div>

                        </div>
                        
                        {/* Grid que cuida do lado direito top da section */}
                        <div className='gridTextoDireitoTop-postarTelaInicial-professor'>   

                            <div className='imageDireitaTop-postarTelaInicial-professor'>

                                {imageParagrafoSrcValue3 && <img src={imageParagrafoSrcValue3} alt="Imagem carregada" />}

                                <p className='descricaoParagrafo-postarTelaInicial-professor'>{descriptionImageValue1}</p>

                            </div>

                            <div className='textoDireitaTop-postarTelaInicial-professor'>

                                <h4 className='titleParagrafos-postarTelaInicial-professor'>{titleParagrafoValue3}</h4>

                                <p className='descricaoParagrafo-postarTelaInicial-professor'>{deQuemFoiValue3}</p>

                                <p>{textAreaValue3}</p>

                            </div>

                        </div>

                        {/* Grid que cuida do lado direito bottom da section */}
                        <div className='gridTextoDireitoBottom-postarTelaInicial-professor'>

                            <div>

                                <h4 className='titleParagrafos-postarTelaInicial-professor'>{titleParagrafoValue4}</h4>

                                <p className='descricaoParagrafo-postarTelaInicial-professor'>{deQuemFoiValue4}</p>

                                <p>{textAreaValue4}</p>

                            </div>

                            <div>

                                {imageParagrafoSrcValue4 && <img src={imageParagrafoSrcValue4} alt="Imagem carregada" />}

                                <p className='descricaoParagrafo-postarTelaInicial-professor'>{descriptionImageValue2}</p>

                            </div>

                        </div>

                    </section>

                    <section className='section2-editarTelaInicial-professor'>

                        <h1>Galeria</h1>

                        <div className='galeriaGrid-editarTelaInicial-professor'>

                            {imageGaleriaSrc1 && <img src={imageGaleriaSrc1} alt="Imagem da galeria 1" className='galeriaImage1-postarTelaInicial-professor'/>}

                            {imageGaleriaSrc2 && <img src={imageGaleriaSrc2} alt="Imagem da galeria 2" className='galeriaImage2-postarTelaInicial-professor'/>}

                            {imageGaleriaSrc3 && <img src={imageGaleriaSrc3} alt="Imagem da galeria 3" className='galeriaImage3-postarTelaInicial-professor'/>}

                            {imageGaleriaSrc4 && <img src={imageGaleriaSrc4} alt="Imagem da galeria 4" className='galeriaImage4-postarTelaInicial-professor'/>}

                        </div>

                    </section>

                    <section className='sectionColuna-ladoDireito-editarTelaInicial-professor'>

                        <div className='designColuna-postarTelaInicial-professor' style={{ backgroundColor: corFundo }}>
                            <h1>{titulo}</h1>
                        </div>

                        <div className='gridColuna-postarTelaInicial-professor'>
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

            </main>

        </div>
    );
};

export default PostagemTelaInicial;
