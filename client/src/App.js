import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [livros, setLivros] = useState([]);
  const [modo, setModo] = useState('vitrine'); 
  const [livroSelecionado, setLivroSelecionado] = useState(null);
  const [novoLivro, setNovoLivro] = useState({
    titulo: '',
    autores: '',
    isbn: '',
    edicao: '',
    ano: '',
    editora: '',
    qtd_paginas: '',
    link_compra: '',
    imagem_capa: '',
  });

  useEffect(() => {
    axios.get('http://localhost:5000/livros')
      .then(res => setLivros(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleCadastro = () => {
    axios.post('http://localhost:5000/livros', novoLivro)
      .then(res => {
        setLivros([...livros, res.data]);
        resetForm();
        setModo('vitrine');
      })
      .catch(err => console.error(err));
  };

  const handleEdicao = () => {
    axios.put(`http://localhost:5000/livros/${novoLivro.id}`, novoLivro)
      .then(() => {
        setLivros(livros.map(l => (l.id === novoLivro.id ? novoLivro : l)));
        resetForm();
        setModo('vitrine');
      })
      .catch(err => console.error(err));
  };

  const handleExcluir = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este livro?")) {
      axios.delete(`http://localhost:5000/livros/${id}`)
        .then(() => {
          setLivros(livros.filter(l => l.id !== id));
          setModo('vitrine');
        })
        .catch(err => console.error(err));
    }
  };

  const resetForm = () => {
    setNovoLivro({
      titulo: '',
      autores: '',
      isbn: '',
      edicao: '',
      ano: '',
      editora: '',
      qtd_paginas: '',
      link_compra: '',
      imagem_capa: '',
    });
    setLivroSelecionado(null);
  };

  return (
    <div className="App">
      <header>
        <h1> Mooney's Bookstore</h1>
        {modo === 'vitrine' && (
          <button onClick={() => {
            resetForm();
            setModo('cadastro');
          }}>
            Novo Livro
          </button>
        )}
      </header>

      {/* Cadastro / Edição */}
      {(modo === 'cadastro' || modo === 'edicao') && (
        <div className="formulario">
          <h2>{modo === 'cadastro' ? 'Cadastrar Livro' : 'Editar Livro'}</h2>
          {Object.keys(novoLivro).map((campo) => (
            <input
              key={campo}
              type="text"
              placeholder={campo}
              value={novoLivro[campo]}
              onChange={e => setNovoLivro({ ...novoLivro, [campo]: e.target.value })}
            />
          ))}
          <button onClick={modo === 'cadastro' ? handleCadastro : handleEdicao}>
            {modo === 'cadastro' ? 'Cadastrar' : 'Salvar Alterações'}
          </button>
          <button onClick={() => setModo('vitrine')}>Cancelar</button>
        </div>
      )}

      {/* Detalhes */}
      {modo === 'detalhes' && livroSelecionado && (
        <div className="detalhe-container">
          <div className="detalhe-card">
            <img src={livroSelecionado.imagem_capa} alt={livroSelecionado.titulo} />
            <div className="detalhe-info">
              <h2>{livroSelecionado.titulo}</h2>
              <p><strong>Autores:</strong> {livroSelecionado.autores}</p>
              <p><strong>ISBN:</strong> {livroSelecionado.isbn}</p>
              <p><strong>Edição:</strong> {livroSelecionado.edicao}</p>
              <p><strong>Ano:</strong> {livroSelecionado.ano}</p>
              <p><strong>Editora:</strong> {livroSelecionado.editora}</p>
              <p><strong>Páginas:</strong> {livroSelecionado.qtd_paginas}</p>
              <p><strong>Comprar:</strong> <a href={livroSelecionado.link_compra} target="_blank" rel="noreferrer">Link</a></p>
              <div className="botoes-livro">
                <button onClick={() => setModo('vitrine')}>Voltar</button>
                <button onClick={() => {
                  setNovoLivro(livroSelecionado);
                  setModo('edicao');
                }}>Editar</button>
                <button onClick={() => handleExcluir(livroSelecionado.id)}>Excluir</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Vitrine */}
      {modo === 'vitrine' && (
        <div className="vitrine">
          {livros.map((livro) => (
            <div className="card" key={livro.id} onClick={() => {
              setLivroSelecionado(livro);
              setModo('detalhes');
            }}>
              <img src={livro.imagem_capa} alt={livro.titulo} />
              <h2>{livro.titulo}</h2>
              <p>{livro.autores}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
