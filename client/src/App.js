import React, { useEffect, useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Card from './components/card';
import Detalhes from './components/detalhes';

function App() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/filmes')
      .then(res => res.json())
      .then(data => setFilmes(data))
      .catch(err => console.error(err));
  }, []);

  return (
      <div className="App">
        <header>
          <h1>Bauny's Moviestore</h1>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <div className="vitrine">
                {filmes.map((filme) => (
                  <Card key={filme.imdbID} filme={filme} />
                ))}
              </div>
            }
          />
          <Route path="/filme/:id" element={<Detalhes />} />
        </Routes>
      </div>
  );
}

export default App;
