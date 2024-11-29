import React, { useState, useEffect, useRef } from "react";
import {
    collection, addDoc, getFirestore,
    doc,
    getDocs,
    getDoc,
    setDoc,
    updateDoc,
    onSnapshot,
    arrayUnion,
    increment,

} from 'firebase/firestore'; // Importando a função para adicionar documentos
import { db } from '../../../../config/firebaseImgConfig'
import "../Template1/Template1/t1.css"

import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";


export const RevisaoT1 = ({ selectedUser }) => {
    const navigate = useNavigate()
    const [textValue, setTextValue] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [userId, setUserId] = useState('');
    const [text4, setText4] = useState('');
    const [campo5Image, setCampo5Image] = useState(null);
    const [campo4Image, setCampo4Image] = useState(null);
    const [code1Image, setcode1Image] = useState(null);
    const [code2Image, setcode2Image] = useState(null);
    const [campo4Text, setCampo4Text] = useState('');
    const [campo7Text, setCampo7Text] = useState('');
    const [userName, setUserName] = useState('');
    const [valueTitle, setValueTitle] = useState('');
    const [valueAuthor, setValueAuthor] = useState('');
    const [valueStatus, setValueStatus] = useState('');
    const [qrCodeText1, setQrCodeText1] = useState('');
    const [qrCodeText2, setQrCodeText2] = useState('');
    const [userColum, setColumName] = useState('');
    const [publications, setPublications] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('Todos');
    const [texts, setTexts] = useState([]); // Declare o estado texts aqui
    const [title, setTitle] = useState([]);

    const rightSideRef = useRef(null);



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

    const handleNavigateToPostagem = () => {
        const rightSideHTML = rightSideRef.current?.outerHTML;
        navigate('/PR', {
            state: { rightSideHTML },
        });
    };

    const banenrImg = localStorage.getItem("imageColumn");
    const selectedPublicationId = localStorage.getItem("selectedPublicationId");
    console.log(banenrImg)

    // Filtra as publicações para encontrar aquela que corresponde ao id do localStorage
    const filteredPublication = publications
        .filter(pub => pub.id === selectedPublicationId)  // Filtra pela publicação com o id correspondente
        .filter(pub => filter === 'Todos' || pub.status === filter)  // Filtro adicional de status
        .filter(pub =>
            (pub.title && pub.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (pub.author && pub.author.toLowerCase().includes(searchQuery.toLowerCase()))
        );


    useEffect(() => {
        const fetchUserData = async () => {
            const selectedPublicationId = localStorage.getItem('selectedPublicationId'); // Obtém o ID da publicação selecionada
            const docRef = doc(db, "edicao", selectedPublicationId); // Acesso ao documento na coleção 'edicao'

            try {
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();

                    // Verifica se o campo 'text' é um array e o armazena
                    if (Array.isArray(data.texts)) {
                        setTexts(data.texts); // Armazena o array no estado
                     
                    } else {
                        setTexts([data.texts]); // Converte para array se não for um
                     

                    }

                    setUserName(data.author || "Autor não encontrado"); // Exibe o autor
                    setColumName(data.coluna || "Coluna não encontrada");
                    setTitle(data.title || "Title não encontrado"); // Exibe o autor
                    setUserId(selectedPublicationId); // Armazena o ID da publicação
                 
                } else {
                   
                }

            } catch (error) {
                console.error("Erro ao consultar o Firestore:", error);
            }

        };

        fetchUserData();
    }, []);

    const saveTextsToDatabase = async (texts) => {
        const selectedPublicationId = localStorage.getItem('selectedPublicationId'); // Obtém o ID da publicação selecionada
        const docRef = doc(db, 'edicao', selectedPublicationId); // Referência ao documento na coleção 'edicao'

        try {
            // Atualiza o documento com o array 'texts'
            await updateDoc(docRef, {
                texts: texts // Aqui atualiza o array inteiro
            });
          
        } catch (error) {
          
        }
    };




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
                    }

                } catch (error) {
                    console.error("Erro ao decodificar o token ou consultar o Firestore:", error);
                }
            }
        };

        fetchUserData();
    }, []);



    // }
    const handleTextChange = (index) => (event) => {
        const newTexts = [...texts]; // Cria uma cópia do array de textos
        newTexts[index] = event.target.value; // Atualiza o texto no índice correspondente
        setTexts(newTexts); // Atualiza o estado com a nova cópia
    };
    const handleText4Change = (index) => (event) => {
        const newTexts = [...texts]; // Cria uma cópia do array de textos
        newTexts[index] = event.target.value; // Atualiza o texto no índice correspondente
        setText4(newTexts); // Atualiza o estado com a nova cópia
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

    const handleCampo4TextChange = (event) => {
        const newValue = event.target.value;
        if (newValue.length <= 465) {
            setCampo4Text(newValue);
        }
    };

    const handleCampo7TextChange = (event) => {
        const newValue = event.target.value;
        if (newValue.length <= 460) {
            setCampo7Text(newValue);
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
        event.preventDefault(); // Evita o envio do formulário

        try {
            // Exemplo de como salvar os textos
            await saveTextsToDatabase(texts); // Substitua por sua lógica de salvamento
          
            // Redireciona ou limpa o estado após o sucesso
        } catch (error) {
            console.error("Erro ao salvar os textos:", error);
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
                            value={title} // Valor controlado pelo estado
                            onChange={(e) => setTitle(e.target.value)} // Atualiza o estado ao editar
                            maxLength="30"
                        />
                        <p>{valueTitle.length}/30</p>

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
                                        value={texts[0] || ''}
                                        onChange={(e) => {
                                            const updatedTexts = [...texts];
                                            updatedTexts[0] = e.target.value;
                                            setTexts(updatedTexts);
                                        }}
                                        maxLength="460"
                                    />
                                    <p>{(texts[0] || '').length}/460</p>
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
                                        value={texts[1] || ''}
                                        onChange={(e) => {
                                            const updatedTexts = [...texts];
                                            updatedTexts[1] = e.target.value;
                                            setTexts(updatedTexts);
                                        }}
                                        maxLength="460"
                                    />
                                    <p>{(texts[1] || '').length}/460</p>
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
                                        value={texts[2] || ''}
                                        onChange={(e) => {
                                            const updatedTexts = [...texts];
                                            updatedTexts[2] = e.target.value;
                                            setTexts(updatedTexts);
                                        }}
                                        maxLength="465"
                                    />
                                    <p>{(texts[2] || '').length}/465</p>
                                </div>

                                <div className="text7-t1 text1NameColumnReceiveTemplete1-t1">
                                    <textarea
                                        placeholder="Artigo 4"
                                        value={texts[3] || ''}
                                        onChange={(e) => {
                                            const updatedTexts = [...texts];
                                            updatedTexts[3] = e.target.value;
                                            setTexts(updatedTexts);
                                        }}
                                        maxLength="460"
                                    />
                                    <p>{(texts[3] || '').length}/460</p>
                                </div>
                            </div>

                        </div>

                        <div className="text-footer-t1">
                            <div className="text-footer-info-t1">
                                <div className="text8-t1 text1NameColumnReceiveTemplete1-t1">
                                    <textarea
                                        placeholder="qrCode1"
                                        className="mediumWi-t1"
                                        value={texts[4] || ''}
                                        onChange={(e) => {
                                            const updatedTexts = [...texts];
                                            updatedTexts[4] = e.target.value;
                                            setTexts(updatedTexts);
                                        }}
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
                                        value={texts[5] || ''}
                                        onChange={(e) => {
                                            const updatedTexts = [...texts];
                                            updatedTexts[5] = e.target.value;
                                            setTexts(updatedTexts);
                                        }}
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
                                <button type="submit" className="send-btn-t1" href="/processopostagemProfessor">Salvar</button>
                                <button onClick={handleNavigateToPostagem} className="send-btn-t1">Enviar</button>
                            </div>
                        </div>
                    </form>

                    {/* footer lado esquerdo */}
                    <div className="footer-left-t1"></div>
                </div>
            </div>

            {/* lado direito */}
            <div className="right-side-t1 lado2-t1" ref={rightSideRef}>
                <div className="main-right-t1">
                    {/* cabeçalho direita */}
                    <div className="header-right-t1">
                        {/* barra colorida */}
                        <div className="barra-topo-header-right-t1">
                            <img src={banenrImg} alt="imagem topo" />
                        </div>
                    </div>

                    <div className="body-right-t1">
                        <div className="mid-header-right-t1">
                            <div className="info-mid-header-right-t1">
                                <img src="../img/processoPostagemJornalista.svg" alt="imagem pessoa" />
                                {filteredPublication.length > 0 && (
                                    <div className="escrita-mid-header-right-t1">
                                        <h4 className='nameUserTemplete1WriterRightPart-t1'>
                                            {filteredPublication[0].author}  {/* Exibe o autor da publicação filtrada */}
                                        </h4>
                                        <p className='nameUserTemplete1WriterRightPartDate-t1'>
                                            01/01/2001 {/* Coloque a data correta, se disponível */}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* <audio className="audio-right-t1" controls autoPlay preload="metadata">
                            <source src="" type="audio/mpeg" />
                        </audio> */}

                        <h1 className="titleNameColumnReceiveTemplete1-t1">{title}</h1>

                        <div className="conteudo-right-t1">
                            <div className="campos-t1">
                                <div className="campo1-t1">
                                    <p className="textValueReceiveTemplete1-t1">{texts[0]}</p>
                                </div>
                                <div className="campo2-t1">
                                    {imagePreview && <img src={imagePreview} className="image-400w-t1" alt="Imagem carregada" />}
                                </div>
                                <div className="campo3-t1">
                                    <p className="textValueReceiveTemplete1-t1">{texts[1]}</p>
                                </div>
                                <div className="campo4-t1">
                                    <div className="campo4-card-t1">
                                        {/* Imagem carregada para campo4 */}
                                        {campo4Image && <img src={campo4Image} className="image-400w-t1" alt="Imagem do campo4" />}
                                        <div className="texto-t1">
                                            <p className="textValueReceiveTemplete1-t1 textWithBG-t1">{texts[2]}</p> {/* Texto do campo4 */}
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
                                        <p className="textValueReceiveTemplete1-t1 textWithBG-t1">{texts[3]}</p> {/* Texto do campo7 */}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* footer lado direito */}
                        <div className="footer-right-t1"></div>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default RevisaoT1;