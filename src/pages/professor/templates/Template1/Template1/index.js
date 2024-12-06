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
import "../Template1/t1.css"; // Importando o CSS
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import api from '../../../../../config/configApi.js'


export const Template1 = ({ selectedUser }) => {
    const navigate = useNavigate()
    const [campo1Text, setTextcampo1] = useState('');
    const [campo2Text, setTextCampo2] = useState('');
    const [campo3Text, setTextCampo3] = useState('');
    const [campo4Text, setTextCampo4] = useState('');
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

        // Prepara os dados para envio
        const formData = new FormData();
        formData.append('numberTemplate', "1");
        formData.append('title', valueTitle);
        formData.append('author', userName);
        formData.append('status', "Revisão");
        formData.append('coluna', userColum);
        formData.append('texts', JSON.stringify([
            campo1Text, // Artigo 1
            campo2Text, // Artigo 2
            campo3Text, // Artigo 3
            campo4Text, // Artigo 4
        ]));
        formData.append('qrCodeText1', qrCodeText1);
        formData.append('qrCodeText2', qrCodeText2);

        // Adiciona a imagem ao FormData, se existir
        if (campo5Image) {
            formData.append('image', campo5Image);
        }

        try {
            // Teste de comunicação com a API (modifique a URL se necessário)
            const response = await api.post('/marcelaob', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Define o tipo de conteúdo
                },
            });

            console.log('Resposta do servidor:', response); // Mostra a resposta do servidor

            if (response.status === 201) {
                alert('Dados enviados com sucesso!');
            } else {
                alert('Erro ao enviar os dados.');
            }
        } catch (error) {
            console.error("Erro ao enviar os dados:", error);
            alert('Erro ao conectar com o servidor.');
        }
    };


    return (
        <div className="main-t1">
            {/* lado esquerdo */}
            <div className="left-side-t1 lado1-t1">
                {/* header principal lado esquerdo */}
                <header className="header-t1">
                    <span className="header__Logo-t1">
                        <h2 className='oEducadorTemplete1Title-t1'> O EDUCADOR</h2>
                        <p className='oEducadorTemplete1SubTitle-t1'>TE MANTER INFORMADO É NOSSA MISSÃO</p>
                    </span>
                    <p>VOLTAR PRÓXIMA PÁGINA <i className='bx bxs-chevron-right'></i></p>
                </header>

                {/* corpo lado esquerdo */}
                <div className="body-left-t1">
                    <form onSubmit={handleSubmit}>
                        <textarea
                            className="title-t1"
                            placeholder="Digite o Título"
                            value={valueTitle}
                            onChange={handleValueTilte}
                            maxLength="30"
                        />
                        

                        {/* header esquerda com inputs */}
                        <div className="header-left-t1">
                            <div className="mid-header-left-t1"></div>
                        </div>

                        {/* conteúdo lado esquerdo */}
                        <div className="conteudo-left-t1">
                            <div className="campos-texts-t1">
                                <div className="text1-t1 text1NameColumnReceiveTemplete1-t1">
                                    <textarea
                                        placeholder="Artigo 1"
                                        value={campo1Text}
                                        onChange={handleTextChange}
                                        maxLength="460"
                                    />
                                    <p>{campo1Text.length}/460</p>
                                </div>
                                <div className="text2-t1 btn-bg-t1" id="text2BtnBg">
                                    <input
                                        className="upImg-t1 file-input-t1"
                                        type="file"
                                        id="handleImageUpload"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, setImagePreview, 'text2BtnBg')}
                                    />
                                    <label htmlFor="handleImageUpload" className="file-label-t1">Escolher Imagem</label>
                                </div>
                                <div className="text3-t1 text1NameColumnReceiveTemplete1-t1">
                                    <textarea
                                        placeholder="Artigo 2"
                                        className="mediumWi-t1"
                                        value={campo2Text}
                                        onChange={handleText4Change}
                                        maxLength="460"
                                    />
                                    <p>{campo2Text.length}/460</p>
                                </div>


                                <div className="text4-t1 btn-bg-t1" id="text4BtnBg">
                                    <input
                                        className="upImg-t1 file-input-t1"
                                        type="file"
                                        id="campo6ImageUpload"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, setCampo4Image, 'text4BtnBg')}
                                    />
                                    <label htmlFor="campo6ImageUpload" className="file-label-t1">Escolher Imagem</label>
                                </div>

                                <div className="text5-t1 text1NameColumnReceiveTemplete1-t1">
                                    <textarea
                                        placeholder="Artigo 3"
                                        value={campo3Text}
                                        onChange={handlecampo3TextChange}
                                        maxLength="365" // Limite de caracteres no textarea
                                    />
                                    <p>{campo3Text.length}/365</p>
                                </div>

                                <div className="text6-t1 btn-bg-t1" id="text6BtnBg">
                                    <input
                                        className="upImg-t1 file-input-t1"
                                        type="file"
                                        id="campo5ImageUpload"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, setCampo5Image, 'text6BtnBg')}
                                    />
                                    <label htmlFor="campo5ImageUpload" className="file-label-t1">Escolher Imagem</label>
                                </div>

                                <div className="text7-t1 text1NameColumnReceiveTemplete1-t1">
                                    <textarea
                                        placeholder="Artigo 4"
                                        value={campo4Text}
                                        onChange={handleCampo7TextChange}
                                        maxLength="460" // Limite de caracteres no textarea
                                    />
                                    <p>{campo4Text.length}/460</p>
                                </div>
                            </div>
                        </div>

                        <div className="text-footer-t1">
                            <div className="text-footer-info-t1">
                                <div className="text8-t1 text1NameColumnReceiveTemplete1-t1">
                                    <textarea
                                        placeholder="qrCode1"
                                        className="mediumWi-t1"
                                        value={qrCodeText1}
                                        onChange={handleqrcode1}
                                        maxLength="30"
                                    />
                                    <p>{qrCodeText1.length}/30</p>
                                </div>

                                <div className="text9-t1 btn-bg-qrcode-t1" id="text9BtnBg">
                                    <input
                                        className="upImg-t1 file-input-t1"
                                        type="file"
                                        id="qrcode1"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, setcode1Image, 'text9BtnBg')}
                                    />
                                    <label htmlFor="qrcode1" className="file-label-qrcode-t1">QrCode1</label>
                                </div>

                                <div className="text10-t1 text1NameColumnReceiveTemplete1-t1">
                                    <textarea
                                        placeholder="qrCode2"
                                        className="mediumWi-t1"
                                        value={qrCodeText2}
                                        onChange={handleqrcode2}
                                        maxLength="30"
                                    />
                                    <p>{qrCodeText2.length}/30</p>
                                </div>

                                <div className="text11-t1 btn-bg-qrcode-t1" id="text11BtnBg">
                                    <input
                                        className="upImg-t1 file-input-t1"
                                        type="file"
                                        id="qrcode2"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, setcode2Image, 'text11BtnBg')}
                                    />
                                    <label htmlFor="qrcode2" className="file-label-qrcode-t1">QrCode2</label>
                                </div>
                            </div>

                            <div className="text12-t1">
                                <button type="submit" className="send-btn-t1" href="/processopostagemProfessor">Enviar</button>
                            </div>
                        </div>
                    </form>

                    {/* footer lado esquerdo */}
                    <div className="footer-left-t1"></div>
                </div>
            </div>

            {/* lado direito */}
            <div className="right-side-t1 lado2-t1">
                <div className="main-right-t1">
                    {/* cabeçalho direita */}
                    <div className="header-right-t1">
                        {/* barra colorida */}
                        <div className="barra-topo-header-right-t1">
                            <img src="../img/logo.svg" alt="imagem topo" />
                        </div>

                        <div className="mid-header-right-t1">
                            <div className="info-mid-header-right-t1">
                                <img src="../img/processoPostagemJornalista.svg" alt="imagem pessoa" />
                                <div className="escrita-mid-header-right-t1">
                                    <h4 className='nameUserTemplete1WriterRightPart-t1'>{userName}</h4>
                                    <p className='nameUserTemplete1WriterRightPartDate-t1'>01/01/2001</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="body-right-t1">
                        {/* <audio className="audio-right-t1" controls autoPlay preload="metadata">
                            <source src="" type="audio/mpeg" />
                        </audio> */}

                        <h1 className="titleNameColumnReceiveTemplete1-t1">{valueTitle}</h1>

                        <div className="conteudo-right-t1">
                            <div className="campos-t1">
                                <div className="campo1-t1">
                                    <p className="textValueReceiveTemplete1-t1">{campo1Text}</p>
                                </div>
                                <div className="campo2-t1">
                                    {imagePreview && <img src={imagePreview} className="image-400w-t1" alt="Imagem carregada" />}
                                </div>
                                <div className="campo3-t1">
                                    <p className="textValueReceiveTemplete1-t1">{campo2Text}</p>
                                </div>
                                <div className="campo4-t1">
                                    <div className="campo4-card-t1">
                                        {/* Imagem carregada para campo4 */}
                                        {campo4Image && <img src={campo4Image} className="image-400w-t1" alt="Imagem do campo4" />}
                                        <div className="texto-t1">
                                            <p className="textValueReceiveTemplete1-t1 textWithBG-t1">{campo3Text}</p> {/* Texto do campo4 */}
                                        </div>
                                    </div>
                                </div>

                                <div className="campo5-t1">
                                    <div className="campo5-card-t1">
                                        {/* Imagem carregada para campo5 */}
                                        {campo5Image && <img src={campo5Image} className="image-400w-t1" alt="Imagem do campo5" />}

                                    </div>
                                </div>
                                <div className="campo6-t1">
                                    <div className="texto-t1">
                                        <p className="textValueReceiveTemplete1-t1 textWithBG-t1">{campo4Text}</p> {/* Texto do campo7 */}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="footer-right-t1">
                            {/* parte dos QRcodes */}
                            {/* QRcode 1 */}
                            <div className="QRcode-1-footer">
                                <div className="campo9-t1">
                                    <div className="texto-t1">
                                        <p className="textValueReceiveTemplete1-t1 textWithBG-t1 LinkQRcode">{qrCodeText1}</p> {/* Texto do campo8 */}
                                    </div>
                                </div>
                                <div className="campo10-t1">
                                    {/* Imagem carregada para campo9 */}
                                    {code1Image && <img src={code1Image} className="image-400w-t1 imgQRcodes" alt="Imagem do campo9" />}
                                </div>
                            </div>
                            {/* QRcode 2 */}
                            <div className="QRcode-2-footer">
                                <div className="campo11-t1">
                                    <div className="texto-t1">
                                        <p className="textValueReceiveTemplete1-t1 textWithBG-t1 LinkQRcode">{qrCodeText2}</p> {/* Texto do campo10*/}
                                    </div>
                                </div>
                                <div className="campo8-t1">
                                    {/* Imagem carregada para campo11 */}
                                    {code2Image && <img src={code2Image} className="image-400w-t1 imgQRcodes" alt="Imagem do campo11" />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Template1;