const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const termosBusca = ['star', 'love', 'war', 'hero', 'space', 'life', 'night', 'day', 'dream', 'dark'];

const OMDB_API_KEY = '560adedd';

app.get('/filmes', async (req, res) => {
  try {
    const filmes = new Map();

    while (filmes.size < 16) {
      const termo = termosBusca[Math.floor(Math.random() * termosBusca.length)];

      const response = await axios.get('http://www.omdbapi.com/', {
        params: {
          apikey: OMDB_API_KEY,
          s: termo,
          type: 'movie',
        },
      });

      if (response.data.Response === 'True') {
        const lista = response.data.Search;

        for (const filme of lista) {
          if (!filmes.has(filme.imdbID)) {
            const detalhes = await axios.get('http://www.omdbapi.com/', {
              params: {
                apikey: OMDB_API_KEY,
                i: filme.imdbID,
                plot: 'short',
              },
            });

            filmes.set(filme.imdbID, detalhes.data);

            if (filmes.size === 18) break;
          }
        }
      }
    }

    res.json(Array.from(filmes.values()));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao consultar a OMDb API.' });
  }
});

app.get('/', (req, res) => {
  res.send('API de filmes está online!');
});

app.get('/filmes/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get('http://www.omdbapi.com/', {
      params: {
        apikey: OMDB_API_KEY,
        i: id,
        plot: 'full',
      },
    });

    if (response.data.Response === 'False') {
      return res.status(404).json({ error: 'Filme não encontrado.' });
    }

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar detalhes do filme.' });
  }
});


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
