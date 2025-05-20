import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [filme, setFilme] = useState(null);
  const [busca, setBusca] = useState('');
  const [erro, setErro] = useState('');

  const buscarFilme = () => {
    if (!busca.trim()) return;

    axios.get(`http://localhost:5000/filmes?q=${encodeURIComponent(busca)}`)
      .then(res => {
        setFilme(res.data);
        setErro('');
      })
      .catch(err => {
        setFilme(null);
        setErro('Filme não encontrado ou erro na API.');
        console.error(err);
      });
  };

  return (
    <div className="App">
      <header>
        <h1>🎬 Bauny's Moviestore</h1>
        <div className="busca-container">
          <input
            type="text"
            placeholder="Digite o nome do filme"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <button onClick={buscarFilme}>Buscar</button>
        </div>
      </header>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      {filme && (
        <div className="detalhe-container">
          <div className="detalhe-card">
            <img src={filme.Poster} alt={filme.Title} />
            <div className="detalhe-info">
              <h2>{filme.Title}</h2>
              <p><strong>Ano:</strong> {filme.Year}</p>
              <p><strong>Diretor:</strong> {filme.Director}</p>
              <p><strong>Gênero:</strong> {filme.Genre}</p>
              <p><strong>Duração:</strong> {filme.Runtime}</p>
              <p><strong>Nota IMDb:</strong> {filme.imdbRating}</p>
              <p><strong>Sinopse:</strong> {filme.Plot}</p>
              <button onClick={() => setFilme(null)}>Nova busca</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
