import React, { useState, useEffect } from "react";
import {
    collection, addDoc, getFirestore,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    onSnapshot,
    arrayUnion,
    increment
} from 'firebase/firestore'; // Importando a função para adicionar documentos
import { db } from '../../../../../config/firebaseImgConfig'; // Importando a configuração do Firebase
import "../Template4/t4.css"; // Importando o CSS
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";


export const Template4 = ({ selectedUser }) => {
    const navigate = useNavigate()
    const [campo1Text, setTextcampo1] = useState('');
    const [campo2Text, setTextCampo2] = useState('');
    const [campo3Text, setTextCampo3] = useState('');
    const [campo4Text, setTextCampo4] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [userId, setUserId] = useState('');
    const [campo5Image, setCampo5Image] = useState(null);
    const [campo6Image, setCampo6Image] = useState(null);
    const [campo4Image, setCampo4Image] = useState(null);
    const [code1Image, setcode1Image] = useState(null);
    const [code2Image, setcode2Image] = useState(null);
    const [userName, setUserName] = useState('');
    const [valueTitle, setValueTitle] = useState('');
    const [valueAuthor, setValueAuthor] = useState('');
    const [valueStatus, setValueStatus] = useState('');
    const [qrCodeText1, setQrCodeText1] = useState('');
    const [qrCodeText2, setQrCodeText2] = useState('');
    const [userColum, setColumName] = useState('');



    useEffect(() => {
        const fetchUserData = async () => {
            const storedToken = localStorage.getItem('token');

            if (storedToken) {
                try {
                    const decoded = jwtDecode(storedToken);
                    const userId = decoded.id;
                    const docRef = doc(db, "users", userId);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setUserName(data.name || "Nome não encontrado");
                        setColumName(data.coluna || "Coluna não encontrada");
                        setUserId(userId); // Armazena o ID do usuário logado
                        console.log(`Usuário logado: F(ID: ${userId})`);
                    }

                } catch (error) {
                    console.error("Erro ao decodificar o token ou consultar o Firestore:", error);
                }
            }
        };

        fetchUserData();
    }, []);

    // const handleNavigateProcesso{

    // }
    const handleTextChange = (event) => {
        setTextcampo1(event.target.value);
    };

    const handleText4Change = (event) => {
        setTextCampo2(event.target.value);
    };

    
    const handleValueAuthor = (event) => {
        setValueTitle = setUserName;
    };
    const handleValueStatus = (event) => {
        const newValue = event.target.value;
        if (newValue.length <= 30) {
            setValueStatus(newValue);
        }
    };

    const handleValueTilte = (event) => {
        const newValue = event.target.value;
        if (newValue.length <= 30) {
            setValueTitle(newValue);
        }
    };



    const handleqrcode1 = (event) => {
        const newValue = event.target.value;
        if (newValue.length <= 30) {
            setQrCodeText1(newValue);
        }
    };

    const handleqrcode2 = (event) => {
        const newValue = event.target.value;
        if (newValue.length <= 30) {
            setQrCodeText2(newValue);
        }
    };

    const handlecampo3TextChange = (event) => {
        const newValue = event.target.value;
        if (newValue.length <= 465) {
            setTextCampo3(newValue);
        }
    };

    const handleCampo7TextChange = (event) => {
        const newValue = event.target.value;
        if (newValue.length <= 460) {
            setTextCampo4(newValue);
        }
    };

    const handleImageUpload = (event, setImagePreview, elementId) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                const element = document.getElementById(elementId);
                if (element) {
                    element.style.backgroundImage = `url(${reader.result})`;
                    element.style.backgroundSize = 'cover';
                    element.style.backgroundPosition = 'center';
                    element.style.backgroundRepeat = 'no-repeat';
                }
            };
            reader.readAsDataURL(file);
        } else {
            alert('Por favor, selecione uma imagem.');
        }
    };

    // Função para enviar os dados para o Firestore
    const handleSubmit = async (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Coleta os valores dos textareas
        const dataToSave = {
            numberTemplate: "1",
            title: valueTitle,
            author: userName,
            status: "Revisão",
            coluna: userColum,
            texts: [
                campo1Text, // Artigo 1
                campo2Text,     // Artigo 2
                campo3Text,// Artigo 3
                campo4Text,// Artigo 4
                qrCodeText1, // QR Code 1
                qrCodeText2  // QR Code 2

            ],
            timestamp: new Date() // Adicionando a data e hora atuais

        };
        try {
            // Referência à coleção do Firestore onde os dados serão armazenados
            const collectionRef = collection(db, 'edicao'); // Substitua pelo seu nome de coleção

            // Adiciona os dados como um novo documento
            await addDoc(collectionRef, dataToSave);

            // Limpa os campos após o envio
            setTextcampo1('');
            setTextCampo2('');
            setTextCampo3('');
            setTextCampo4('');
            setValueTitle('');
            setQrCodeText1('');
            setQrCodeText2('');


            alert('Dados enviados com sucesso!');
        } catch (error) {
            console.error("Erro ao enviar os dados:", error);
            alert('Erro ao enviar os dados.');
        }
    };


    return (
        <div className="main-t4">
            {/* lado esquerdo */}
            <div className="left-side-t4 lado1-t4">
                {/* header principal lado esquerdo */}
                <header className="header-t4">
                    <span className="header__Logo-t4">
                        <h2 className='oEducadorTemplete1Title-t4'> O EDUCADOR</h2>
                        <p className='oEducadorTemplete1SubTitle-t4'>TE MANTER INFORMADO É NOSSA MISSÃO</p>
                    </span>
                    <p>VOLTAR PRÓXIMA PÁGINA <i className='bx bxs-chevron-right'></i></p>
                </header>

                {/* corpo lado esquerdo */}
                <div className="body-left-t4">
                    <form onSubmit={handleSubmit}>
                        <textarea
                            className="title-t4"
                            placeholder="Digite o Título"
                            value={valueTitle}
                            onChange={handleValueTilte}
                            maxLength="30"
                        />
                        <p>{valueTitle.length}/30</p>

                        {/* header esquerda com inputs */}
                        <div className="header-left-t4">
                            <div className="mid-header-left-t4"></div>
                        </div>

                        {/* conteúdo lado esquerdo */}
                        <div className="conteudo-left-t4">
                            {/* Div Pai lado Esquerdo */}
                            <div className="campos-texts-t4">
                                <div className="text1-t4 text1NameColumnReceiveTemplete1-t4">
                                    <textarea
                                        placeholder="Artigo 1"
                                        value={campo1Text}
                                        onChange={handleTextChange}
                                        maxLength="460"
                                    />
                                    <p>{campo1Text.length}/460</p>
                                </div>
                                <div className="text2-t4 btn-bg-t4" id="text2BtnBg">
                                    <input
                                        className="upImg-t4 file-input-t4"
                                        type="file"
                                        id="handleImageUpload"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, setImagePreview, 'text2BtnBg')}
                                    />
                                    <label htmlFor="handleImageUpload" className="file-label-t4">Escolher Imagem</label>
                                </div>
                                <div className="text3-t4 text1NameColumnReceiveTemplete1-t4">
                                    <textarea
                                        placeholder="Artigo 2"
                                        className="mediumWi-t4"
                                        value={campo2Text}
                                        onChange={handleText4Change}
                                        maxLength="460"
                                    />
                                    <p>{campo2Text.length}/460</p>
                                </div>

                                    {/* imagem 1 */}
                                <div className="text4-t4 btn-bg-t4" id="text4BtnBg">
                                    <input
                                        className="upImg-t4 file-input-t4"
                                        type="file"
                                        id="campo6ImageUpload"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, setCampo4Image, 'text4BtnBg')}
                                    />
                                    <label htmlFor="campo6ImageUpload" className="file-label-t4">Escolher Imagem</label>
                                </div>

                                    {/* imagem 2 */}
                                <div className="text5-t4 btn-bg-t4 text1NameColumnReceiveTemplete1-t4" id="text6BtnBg">
                                <input
                                        className="upImg-t4 file-input-t4"
                                        type="file"
                                        id="campo5ImageUpload"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, setCampo5Image, 'text6BtnBg')}
                                    />
                                    <label htmlFor="campo5ImageUpload" className="file-label-t4">Escolher Imagem</label>
                                </div>

                                    {/* imagem 3 */}
                                <div className="text6-t4 btn-bg-t4" id="text5BtnBg">
                                    <input
                                        className="upImg-t4 file-input-t4"
                                        type="file"
                                        id="campo3ImageUpload"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, setCampo6Image, 'text5BtnBg')}
                                    />
                                    <label htmlFor="campo3ImageUpload" className="file-label-t4">Escolher Imagem</label>
                                </div>

                                <div className="text7-t4 text1NameColumnReceiveTemplete1-t4">
                                    <textarea
                                        placeholder="Artigo 3"
                                        className="mediumWi-t4"
                                        value={campo4Text}
                                        onChange={handleCampo7TextChange}
                                        maxLength="460" // Limite de caracteres no textarea
                                    />
                                    <p>{campo4Text.length}/460</p>
                                </div>
                                
                            </div>
                        </div>

                        {/* footer */}

                        <div className="text-footer-t4">
                            <div className="text-footer-info-t4">
                                <div className="text8-t4 text1NameColumnReceiveTemplete1-t4">
                                    <textarea
                                        placeholder="qrCode1"
                                        className="mediumWi-t4"
                                        value={qrCodeText1}
                                        onChange={handleqrcode1}
                                        maxLength="30"
                                    />
                                    <p>{qrCodeText1.length}/30</p>
                                </div>

                                <div className="text9-t4 btn-bg-qrcode-t4" id="text9BtnBg">
                                    <input
                                        className="upImg-t4 file-input-t4"
                                        type="file"
                                        id="qrcode1"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, setcode1Image, 'text9BtnBg')}
                                    />
                                    <label htmlFor="qrcode1" className="file-label-qrcode-t4">QrCode1</label>
                                </div>

                                <div className="text10-t4 text1NameColumnReceiveTemplete1-t4">
                                    <textarea
                                        placeholder="qrCode2"
                                        className="mediumWi-t4"
                                        value={qrCodeText2}
                                        onChange={handleqrcode2}
                                        maxLength="30"
                                    />
                                    <p>{qrCodeText2.length}/30</p>
                                </div>

                                <div className="text11-t4 btn-bg-qrcode-t4" id="text11BtnBg">
                                    <input
                                        className="upImg-t4 file-input-t4"
                                        type="file"
                                        id="qrcode2"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, setcode2Image, 'text11BtnBg')}
                                    />
                                    <label htmlFor="qrcode2" className="file-label-qrcode-t4">QrCode2</label>
                                </div>
                            </div>

                            <div className="text12-t4">
                                <button type="submit" className="send-btn-t4" href="/processopostagemProfessor">Enviar</button>
                            </div>
                        </div>
                    </form>

                    {/* footer lado esquerdo */}
                    <div className="footer-left-t4"></div>
                </div>
            </div>

            {/* lado direito */}
            <div className="right-side-t4 lado2-t4">
                <div className="main-right-t4 ">
                    {/* cabeçalho direita */}
                    <div className="header-right-t4">
                        {/* barra colorida */}
                        <div className="barra-topo-header-right-t4">
                            <img src="../img/logo.svg" alt="imagem topo" />
                        </div>

                        <div className="mid-header-right-t4">
                            <div className="info-mid-header-right-t4">
                                <img src="../img/processoPostagemJornalista.svg" alt="imagem pessoa" />
                                <div className="escrita-mid-header-right-t4">
                                    <h4 className='nameUserTemplete1WriterRightPart-t4'>{userName}</h4>
                                    <p className='nameUserTemplete1WriterRightPartDate-t4'>01/01/2001</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="body-right-t4">
                        <audio className="audio-right-t4" controls autoPlay preload="metadata">
                            <source src="" type="audio/mpeg" />
                        </audio>

                        <h1 className="titleNameColumnReceiveTemplete1-t4">{valueTitle}</h1>

                        <div className="conteudo-right-t4">
                            {/* Div Pai lado Direito */}
                            <div className="campos-t4">
                                {/* // */}
                                <div className="campo1-t4">
                                    <p className="textValueReceiveTemplete1-t4">{campo1Text}</p>
                                </div>
                                <div className="campo2-t4">
                                    {imagePreview && <img src={imagePreview} className="image-400w-t4" alt="Imagem carregada" />}
                                </div>
                                <div className="campo3-t4">
                                    <p className="textValueReceiveTemplete1-t4">{campo2Text}</p>
                                </div>

                                {/* 3 imagens */}
                               
                                    <div className="campo4-t4 ">
                                        <div className="campo4-card-t4 ">
                                            {/* Imagem carregada para campo4 */}
                                            {campo4Image && <img src={campo4Image} className="image-400w-t4" alt="Imagem do campo4" />}
                                            <div className="texto-t4">
                                                <p className="textValueReceiveTemplete1-t4 textWithBG-t4">{campo3Text}</p> {/* Texto do campo4 */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="campo5-t4">
                                        <div className="campo4-card-t4 ">
                                            {/* Imagem carregada para campo5 */}
                                            {campo5Image && <img src={campo5Image} className="image-400w-t4" alt="Imagem do campo5" />}
                                            <div className="texto-t4">
                                                <p className="textValueReceiveTemplete1-t4 textWithBG-t4">{campo3Text}</p> {/* Texto do campo5 */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="campo6-t4">
                                        <div className="campo4-card-t4 ">
                                            {/* Imagem carregada para campo6 */}
                                            {campo6Image && <img src={campo6Image} className="image-400w-t4" alt="Imagem do campo5" />}
                                            <div className="texto-t4">
                                                <p className="textValueReceiveTemplete1-t4 textWithBG-t4">{campo3Text}</p> {/* Texto do campo6 */}
                                            </div>
                                        </div>
                                    </div>
                                {/* fim  3 imagens */}

                                <div className="campo7-t4 ">
                                        <p className="textValueReceiveTemplete1-t4 textWithBG-t4 ">{campo4Text}</p> {/* Texto do campo7 */}
                                </div>
                                
                            </div>
                        </div>

                        <div className="footer-right-t4">
                            <p className="textValueReceiveTemplete1-t4">{qrCodeText1}</p>
                            {code1Image && <img src={code1Image} className="image-150w-t4" alt="QrCode1" />}
                            <p className="textValueReceiveTemplete1-t4">{qrCodeText2}</p>
                            {code2Image && <img src={code2Image} className="image-150w-t4" alt="QrCode2" />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Template4;