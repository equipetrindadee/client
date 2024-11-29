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
} from 'firebase/firestore';
import { db } from '../../../../config/firebaseImgConfig'
import "../Template2/t2.css"; // Importando o CSS'
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";


export const Template2 = ({ selectedUser }) => {
    const navigate = useNavigate()
    const [campo1Text, setTextcampo1] = useState('');
    const [campo2Text, setTextCampo2] = useState('');
    const [campo3Text, setTextCampo3] = useState('');
    const [campo4Text, setTextcampo4] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [userId, setUserId] = useState('');
    const [campo5Image, setCampo5Image] = useState(null);
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

    const handlecampo4TextChange = (event) => {
        const newValue = event.target.value;
        if (newValue.length <= 460) {
            setTextcampo4(newValue);
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
            numberTemplate: "2",
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
            setTextcampo4('');
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
        <div className="main-t2">
            {/* lado esquerdo */}
            <div className="left-side-t2 lado1-t2">
                {/* header principal lado esquerdo */}
                <header className="header-t2">
                    <span className="header__Logo-t2">
                        <h2 className='oEducadorTemplete1Title-t2'> O EDUCADOR</h2>
                        <p className='oEducadorTemplete1SubTitle-t2'>TE MANTER INFORMADO É NOSSA MISSÃO</p>
                    </span>
                    <p>VOLTAR PRÓXIMA PÁGINA <i className='bx bxs-chevron-right'></i></p>
                </header>

                {/* corpo lado esquerdo */}
                <div className="body-left-t2">
                    <form onSubmit={handleSubmit}>
                        <textarea
                            className="title-t2"
                            placeholder="Digite o Título"
                            value={valueTitle}
                            onChange={handleValueTilte}
                            maxLength="30"
                        />
                        <p>{valueTitle.length}/30</p>

                        {/* header esquerda com inputs */}
                        <div className="header-left-t2">
                            <div className="mid-header-left-t2"></div>
                        </div>

                        {/* conteúdo lado esquerdo */}
                        <div className="conteudo-left-t2">
                            <div className="campos-texts-t2">
                                <div className="text1-t2 text1NameColumnReceiveTemplete1-t2">
                                    <textarea
                                        placeholder="Artigo 1"
                                        value={campo1Text}
                                        onChange={handleTextChange}
                                        maxLength="460"
                                    />
                                    <p>{campo1Text.length}/460</p>
                                </div>
                                <div className="text2-t2 btn-bg-t2" id="text2BtnBg">
                                    <input
                                        className="upImg-t2 file-input-t2"
                                        type="file"
                                        id="handleImageUpload"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, setImagePreview, 'text2BtnBg')}
                                    />
                                    <label htmlFor="handleImageUpload" className="file-label-t2">Escolher Imagem</label>
                                </div>

                                <div className="text3-t2 btn-bg-t2" id="text4BtnBg">
                                    <input
                                        className="upImg-t2 file-input-t2"
                                        type="file"
                                        id="campo6ImageUpload"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, setCampo4Image, 'text4BtnBg')}
                                    />
                                    <label htmlFor="campo6ImageUpload" className="file-label-t2">Escolher Imagem</label>
                                </div>

                                <div className="text4-t2 text1NameColumnReceiveTemplete1-t2">
                                    <textarea
                                        placeholder="Artigo 2"
                                        value={campo2Text}
                                        onChange={handleText4Change}
                                        maxLength="460"
                                    />
                                    <p>{campo2Text.length}/460</p>
                                </div>

                                <div className="text5-t2 text1NameColumnReceiveTemplete1-t2">
                                    <textarea
                                        placeholder="Artigo 3"
                                        className="mediumWi-t2"
                                        value={campo3Text}
                                        onChange={handlecampo3TextChange}
                                        maxLength="465" // Limite de caracteres no textarea
                                    />
                                    <p>{campo3Text.length}/465</p>
                                </div>

                                <div className="text6-t2 btn-bg-t2" id="text6BtnBg">
                                    <input
                                        className="upImg-t2 file-input-t2"
                                        type="file"
                                        id="campo5ImageUpload"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, setCampo5Image, 'text6BtnBg')}
                                    />
                                    <label htmlFor="campo5ImageUpload" className="file-label-t2">Escolher Imagem</label>
                                </div>

                            </div>
                        </div>

                        <div className="text-footer-t2">
                            <div className="text-footer-info-t2">
                                <div className="text8-t2 text1NameColumnReceiveTemplete1-t2">
                                    <textarea
                                        placeholder="qrCode1"
                                        className="mediumWi-t2"
                                        value={qrCodeText1}
                                        onChange={handleqrcode1}
                                        maxLength="30"
                                    />
                                    <p>{qrCodeText1.length}/30</p>
                                </div>

                                <div className="text9-t2 btn-bg-qrcode-t2" id="text9BtnBg">
                                    <input
                                        className="upImg-t2 file-input-t2"
                                        type="file"
                                        id="qrcode1"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, setcode1Image, 'text9BtnBg')}
                                    />
                                    <label htmlFor="qrcode1" className="file-label-qrcode-t2">QrCode1</label>
                                </div>

                                <div className="text10-t2 text1NameColumnReceiveTemplete1-t2">
                                    <textarea
                                        placeholder="qrCode2"
                                        className="mediumWi-t2"
                                        value={qrCodeText2}
                                        onChange={handleqrcode2}
                                        maxLength="30"
                                    />
                                    <p>{qrCodeText2.length}/30</p>
                                </div>

                                <div className="text11-t2 btn-bg-qrcode-t2" id="text11BtnBg">
                                    <input
                                        className="upImg-t2 file-input-t2"
                                        type="file"
                                        id="qrcode2"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, setcode2Image, 'text11BtnBg')}
                                    />
                                    <label htmlFor="qrcode2" className="file-label-qrcode-t2">QrCode2</label>
                                </div>
                            </div>

                            <div className="text12-t2">
                                <button type="submit" className="send-btn-t2" href="/processopostagemProfessor">Enviar</button>
                            </div>
                        </div>
                    </form>

                    {/* footer lado esquerdo */}
                    <div className="footer-left-t2"></div>
                </div>
            </div>

            {/* lado direito */}
            <div className="right-side-t2 lado2-t2">
                <div className="main-right-t2">
                    {/* cabeçalho direita */}
                    <div className="header-right-t2">
                        {/* barra colorida */}
                        <div className="barra-topo-header-right-t2">
                            <img src="../img/logo.svg" alt="imagem topo" />
                        </div>

                        <div className="mid-header-right-t2">
                            <div className="info-mid-header-right-t2">
                                <img src="../img/processoPostagemJornalista.svg" alt="imagem pessoa" />
                                <div className="escrita-mid-header-right-t2">
                                    <h4 className='nameUserTemplete1WriterRightPart-t2'>{userName}</h4>
                                    <p className='nameUserTemplete1WriterRightPartDate-t2'>01/01/2001</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="body-right-t2">
                        {/* <audio className="audio-right-t2" controls autoPlay preload="metadata">
                            <source src="" type="audio/mpeg" />
                        </audio> */}

                        <h1 className="titleNameColumnReceiveTemplete1-t2">{valueTitle}</h1>

                        <div className="conteudo-right-t2">
                            <div className="campos-t2">


                                <div className="campo1-t2">
                                    <p className="textValueReceiveTemplete1-t2">{campo1Text}</p>
                                </div>
                                <div className="campo2-t2">
                                    {imagePreview && <img src={imagePreview} className="image-400w-t2" alt="Imagem carregada" />}
                                </div>
                                <div className="campo4-t2">
                                    <p className="textValueReceiveTemplete1-t2">{campo2Text}</p>
                                </div>
                                <div className="campo3-t2">
                                    {/* Imagem carregada para campo4 */}
                                    {campo4Image && <img src={campo4Image} className="image-400w-t2" alt="Imagem do campo4" />}
                                </div>
                                <div className="campo5-t2">
                                    <div className="texto-t2">
                                        <p className="textValueReceiveTemplete1-t2 textWithBG-t2">{campo3Text}</p> {/* Texto do campo4 */}
                                    </div>
                                </div>

                                <div className="campo6-t2 ">
                                    
                                        {/* Imagem carregada para campo5 */}
                                        {campo5Image && <img src={campo5Image} className="image-400w-t2" alt="Imagem do campo5" />}

                                    
                                </div>
                                <div className="campo6-t2">
                                    <div className="texto-t2">
                                        <p className="textValueReceiveTemplete1-t2 textWithBG-t2">{campo4Text}</p> {/* Texto do campo7 */}
                                    </div>
                                </div> 
                            </div>
                        </div>

                        <div className="footer-right-t2">
                            <p className="textValueReceiveTemplete1-t2">{qrCodeText1}</p>
                            {code1Image && <img src={code1Image} className="image-150w-t2" alt="QrCode1" />}
                            <p className="textValueReceiveTemplete1-t2">{qrCodeText2}</p>
                            {code2Image && <img src={code2Image} className="image-150w-t2" alt="QrCode2" />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Template2;