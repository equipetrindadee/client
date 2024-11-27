import React, { useState } from 'react';
import './colunistas.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FlipMove from 'react-flip-move'; // Importa a biblioteca
import { motion } from 'framer-motion'; // Importa o Framer Motion
import { Modal, Button, Form } from 'react-bootstrap'; // Importa componentes do Bootstrap
import { Dropdown } from 'react-bootstrap';
import NavbarUserComum from '../../navBar/navBarUserComum';


function ColunistaUsuario() {
  const [colunistas, setColunistas] = useState([
    { nome: "Ana Silva", ano: "2024", materia: "ACONTECEU ESCOLA", imagem: "../img/TecnaWinson1.svg", cor: "#FF5733", descricao: "Ana é uma excelente matemática, sempre pronta para ajudar!" },
    { nome: "Pedro Souza", ano: "2023", materia: "BIOFIMICA EM AÇÃO", imagem: "../img/LinaFigueredo1.svg", cor: "#33C1FF", descricao: "Pedro é apaixonado por história e adora contar curiosidades!" },
    { nome: "Maria Oliveira", ano: "2022", materia: "EDUCAÇÃO EM FOCO", imagem: "../img/NoahLima1.svg", cor: "#75FF33", descricao: "Maria é uma bióloga em formação e ama a natureza!" },
    { nome: "Lucas Lima", ano: "2021", materia: "TECNOLOGIA D' BOA", imagem: "../img/TecnaWinson1.svg", cor: "#FF33B8", descricao: "Lucas sempre traz novas experiências sobre física!" },
    { nome: "Joaquin Cardoso", ano: "2023", materia: "ALÉM DESSES LIVROS", imagem: "../img/LinaFigueredo2.svg", cor: "#008000", descricao: "Pedro é apaixonado por história e adora contar curiosidades!" },
    { nome: "Alex Gomes", ano: "2022", materia: "AVENTURA HISTÓRIA", imagem: "../img/NoahLima2.svg", cor: "#e428c4", descricao: "Maria é uma bióloga em formação e ama a natureza!" },
    { nome: "Maria Oliveira", ano: "2022", materia: "EDUCAÇÃO EM FOCO", imagem: "../img/LinaFigueredo1.svg", cor: "#75FF33", descricao: "Maria é uma bióloga em formação e ama a natureza!" },
    { nome: "Miriã Chefinha", ano: "2024", materia: "PALAVREANDO LETRA", imagem: "../img/NoahLima1.svg", cor: "#ffff00", descricao: "Lucas sempre traz novas experiências sobre física!" }
  ]);




  const [flippedIndex, setFlippedIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newColunista, setNewColunista] = useState({
    nome: '',
    ano: '',
    materia: '',
    cor: '',
    descricao: ''
  });

  const handleFlip = (index) => setFlippedIndex(flippedIndex === index ? null : index);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewColunista({ ...newColunista, [name]: value });
  };

  // Função de submissão do formulário para criar um novo colunista
  const handleSubmit = () => {
    const novoColunista = {
      nome: newColunista.nome,
      ano: newColunista.ano,
      materia: materia, // Usa a matéria do estado
      cor: materiaColor, // Usa a cor da matéria encontrada
      descricao: newColunista.descricao,
      imagem: "../img/colunista_default.svg" // Define uma imagem padrão
    };

    // Adiciona o novo colunista ao array existente
    setColunistas([...colunistas, novoColunista]);

    // Limpa o formulário e fecha o modal
    setNewColunista({ nome: '', ano: '', materia: '', cor: '', descricao: '' });
    setMateria(''); // Limpa o campo de matéria
    setMateriaColor(''); // Limpa a cor da matéria
    handleCloseModal(); // Fecha o modal
  };

  // Estados e handlers para o filtro de matéria e cores
  const [materia, setMateria] = useState('');
  const [materiaColor, setMateriaColor] = useState('');
  const handleMateriaChange = (e) => {
    const materiaNome = e.target.value.toLowerCase();
    setMateria(materiaNome);

    const materiaEncontrada = colunistas.find(
      (colunista) => colunista.materia.toLowerCase() === materiaNome
    );

    if (materiaEncontrada) {
      setMateriaColor(materiaEncontrada.cor);
    } else {
      setMateriaColor('');
    }
  };

  // Estado e handler para o termo de pesquisa
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Estado para a matéria selecionada no dropdown
  const [materiaSelecionada, setMateriaSelecionada] = useState('');
  const handleMateriaSelect = (materia, cor) => {
    setMateriaSelecionada(materia);
    setMateriaColor(cor);
  };

  // Função combinada para filtrar os colunistas com base no termo de pesquisa e na matéria selecionada
  const filteredColunistas = colunistas.filter((colunista) => {
    const matchMateria = materiaSelecionada
      ? colunista.materia.toLowerCase() === materiaSelecionada.toLowerCase()
      : true;
    const matchNome = colunista.nome.toLowerCase().includes(searchTerm);
    return matchMateria && matchNome;
  });
  

  return (
    <div className="usercomum-container-colunistas">
      <NavbarUserComum/>
      {/* Botão para criar um novo colunista */}
      {/* <div className="button-containercolunista">
        <Button variant="primary" onClick={handleShowModal}>
          Criar Novo Colunista
        </Button>
      </div> */}
      

      {/* Div Filtros */}
      <div className="usercomum-filtros-colunistas">
        {/* Input com ícone de lupa */}
        <div className="usercomuminput-lupasearchcolunistas">
          <input type="text" 
          class="search-input" 
          value={searchTerm} 
          onChange={handleSearchChange} 
        />
          <i class='bx bx-search-alt-2'></i>
        </div>

        {/* Dropdown com ícone de funil */}
        <Dropdown>
          <Dropdown.Toggle className="dropdownfiltrosicone-colunas">
            Filtro
            <i class='bx bxs-filter-alt'></i>
          </Dropdown.Toggle>
          
          <Dropdown.Menu className="dropdowncolunistas-menuusercomum">
            {colunistas.map((colunista) => (
              <Dropdown.Item className="dropdowncolunistas-itemusercomum"
                key={colunista.materia}
                onClick={() => handleMateriaSelect(colunista.materia, colunista.cor)}
                style={{ backgroundColor: colunista.cor, justifyContent: 'center',}}
              >
                {colunista.materia}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* Modal para adicionar colunista */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Criar Colunista</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                value={newColunista.nome}
                onChange={handleChange}
                placeholder="Nome do colunista"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ano</Form.Label>
              <Form.Control
                as="select"
                name="ano"
                value={newColunista.ano}
                onChange={handleChange}
              >
                <option value="">Selecione o ano</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Matéria</Form.Label>
              <Form.Control

                type="text"
                className="form-control"
                placeholder="Nome da Matéria"
                value={materia} // O estado atual da matéria
                onChange={handleMateriaChange} // Chama a função ao mudar
              />

            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cor</Form.Label>
              <Form.Control

                type="color"
                className="form-control"
                value={materiaColor} // Usar a cor da matéria encontrada
                readOnly // Torna o input apenas leitura


              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                as="textarea"
                name="descricao"
                value={newColunista.descricao}
                onChange={handleChange}
                placeholder="Descrição do colunista"
                rows={3}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Enviar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Header */}
      <div className="headerusercomum-usercolunistas">
        <div className="leftlinhaheader-colunistas-usercomum"/>
        <h1 className="h1titleheader-usercomum-colunistas">COLUNISTAS</h1>
        <div className="lineuser-usercomumcolunistas-header" />

      </div>

      {/* Conteúdo dos Colunistas */}
      <FlipMove className="flipcolunistas-conteudousercomum">
        <div className="conteudo-colunistaUser">
          {filteredColunistas.map((colunista, index) => (
            <motion.div
              key={colunista.nome}
              className="card-conteudoColunista"
              style={{
                maxWidth: '28.6rem',
                backgroundColor: colunista.cor,
                margin: '21px',
                borderRadius: '12px',
                width: '120px',
                height: '300px',
              }}
              onClick={() => handleFlip(index)}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="cardbody-conteudo-usercolunistas">
                {flippedIndex === index ? (
                  <>
                    <h5 className="cardh5-nomeusercomum-colunista">{colunista.nome}</h5>
                    <h6 className="cardh6-subtitleusercomum-colunista">{colunista.ano}</h6>
                    <p className="cardparagrafo-textusercomum-colunista">{colunista.descricao}</p>
                  </>
                ) : (
                  <>
                    <div className='usercomum-colunista-cardcontent'>
                      <h5 className="segundocardh5-titlenome-usercomumcolunista">{colunista.nome}</h5>
                      <h6 className="segundoh6-cardcolunistas-subtitleano">{colunista.ano}</h6>
                      <div className='testeusercomum-colunistastemporario'>
                      <h6 className="terceiroh6-materiatitle-usercomumcolunista">{colunista.materia}</h6>
                      <div className="materiaaluno-ColunistaIMG">
                      <img src={colunista.imagem}  />
                    </div>
                      </div>
                      
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </FlipMove>

    </div>
  );
}

export default ColunistaUsuario;