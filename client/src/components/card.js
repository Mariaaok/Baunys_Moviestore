import React from 'react';
import { Link } from 'react-router-dom';
import './card.css';

const Card = ({ filme }) => {
  return (
    <Link to={`/filme/${filme.imdbID}`} className="card-link">
      <div className="card">
        <img
          src={filme.Poster !== 'N/A' ? filme.Poster : 'https://via.placeholder.com/300x445?text=Sem+Imagem'}
          alt={filme.Title}
        />
        <h2>{filme.Title}</h2>
        <p>{filme.imdbRating ? `Nota: ${filme.imdbRating}` : 'Sem nota'}</p>
      </div>
    </Link>
  );
};

export default Card;
