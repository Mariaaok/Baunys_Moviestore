import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Detalhes() {
  const { id } = useParams();
  const [filme, setFilme] = useState(null);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/filmes/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Filme não encontrado');
        }
        return res.json();
      })
      .then(data => setFilme(data))
      .catch(err => {
        console.error(err);
        setErro(err.message);
      });
  }, [id]);

  if (erro) return <p>Erro: {erro}</p>;
  if (!filme) return <p>Carregando...</p>;

  return (
    <div className="detalhe-container">
      <div className="detalhe-card">
        <img src={filme.Poster} alt={filme.Title} />
        <div className="detalhe-info">
          <h2>{filme.Title}</h2>
          <p><strong>Ano:</strong> {filme.Year}</p>
          <p><strong>Nota:</strong> {filme.imdbRating}</p>
          <p><strong>Gênero:</strong> {filme.Genre}</p>
          <p><strong>Diretor:</strong> {filme.Director}</p>
          <p><strong>Sinopse:</strong> {filme.Plot}</p>
        </div>
      </div>
    </div>
  );
}

export default Detalhes;
