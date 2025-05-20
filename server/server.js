const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = 5000;

// 🔑 Substitua pela sua chave real da OMDb
const OMDB_API_KEY = 'http://www.omdbapi.com/?apikey=[yourkey]&';

app.use(cors());
app.use(express.json());

// 🎬 Rota para buscar filme na OMDb por título
app.get('/filmes', async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: 'Parâmetro "q" (título do filme) é obrigatório.' });
  }

  try {
    const response = await axios.get('https://www.omdbapi.com/', {
      params: {
        apikey: OMDB_API_KEY,
        t: query
      }
    });

    if (response.data.Response === 'False') {
      return res.status(404).json({ error: 'Filme não encontrado.' });
    }

    res.json(response.data);
  } catch (error) {
    console.error('Erro ao consultar OMDb:', error.message);
    res.status(500).json({ error: 'Erro ao buscar dados da OMDb.' });
  }
});

// 🚀 Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
