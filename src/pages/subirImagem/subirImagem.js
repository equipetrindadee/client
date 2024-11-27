import React, { useState, useEffect } from 'react';
import api from '../../config/configApi';

const SubirImagem = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [file, setFile] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [fetchedImages, setFetchedImages] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        fetchImages();
    }, []);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
            setFile(file);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setErrorMessage('Por favor, selecione uma imagem.');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await api.post('/imagens', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Imagem enviada com sucesso!', response.data);
            setSuccessMessage('Imagem enviada com sucesso!');
            setSelectedImage(null);
            setFile(null);
        } catch (error) {
            console.error('Erro ao enviar a imagem:', error);
            setErrorMessage('Erro ao enviar a imagem. Tente novamente.');
        }

    };

    const fetchImages = async () => {
        try {
            const response = await api.get(`/imagens/${userId}`);
            console.log('Imagens retornadas:', response.data); // Verifique os dados aqui
            setFetchedImages(response.data);
        } catch (error) {
            console.error('Erro ao buscar imagens:', error);
            setErrorMessage('Erro ao buscar imagens.');
        }
    };

    return (
        <div style={{ textAlign: 'center', margin: '20px' }}>
            <h1>Upload de Imagem</h1>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button onClick={handleUpload} style={{ marginTop: '20px' }}>
                Enviar
            </button>

            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            <h2 style={{ marginTop: '20px' }}>Imagens do Banco:</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {fetchedImages.length > 0 ? (
                    fetchedImages.map((image, index) => (
                        <div key={index} style={{ margin: '10px' }}>
                            <img
                                src={image.url} // Verifique se 'url' está correto
                                alt={`Imagem ${index + 1}`}
                                style={{ maxWidth: '300px', maxHeight: '300px' }}
                            />
                        </div>
                    ))
                ) : (
                    <p>Nenhuma imagem encontrada.</p>
                )}
            </div>
        </div>
    );
};

export default SubirImagem;
