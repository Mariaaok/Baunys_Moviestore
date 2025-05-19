const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let livros = [
    {
      id: 1,
      titulo: "1984",
      autores: "George Orwell",
      isbn: "9788535914849",
      edicao: "1ª",
      ano: "1949",
      editora: "Companhia das Letras",
      qtd_paginas: "328",
      link_compra: "https://www.amazon.com.br/dp/8535914846",
      imagem_capa: "https://m.media-amazon.com/images/I/71rpa1-kyvL._AC_UF1000,1000_QL80_.jpg"
    },
    {
      id: 2,
      titulo: "O Apanhador no Campo de Centeio",
      autores: "J.D. Salinger",
      isbn: "9780316769488",
      edicao: "1ª",
      ano: "1951",
      editora: "Little, Brown",
      qtd_paginas: "234",
      link_compra: "https://www.amazon.com.br/dp/0316769487",
      imagem_capa: "https://i5.walmartimages.com/seo/Catcher-in-the-Rye-Hardcover-9780812415285_cf330196-804a-4369-a1bd-3778ac590203.e9aa459e65855839580a27cee2cd103d.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF"
    },
    {
      id: 3,
      titulo: "O Amor nos Tempos do Cólera",
      autores: "Gabriel García Márquez",
      isbn: "9788535926873",
      edicao: "1ª",
      ano: "1985",
      editora: "Record",
      qtd_paginas: "368",
      link_compra: "https://www.amazon.com.br/dp/8535926878",
      imagem_capa: "https://img.skoob.com.br/t8lMIS9hgDUCTaab4N3KQFu5AP0=/200x/center/top/smart/filters:format(jpeg)/https://skoob.s3.amazonaws.com/livros/20332/O_AMOR_NOS_TEMPOS_DO_COLERA_171695256620332SK-V11716952569B.jpg"
    },
    {
      id: 4,
      titulo: "Crime e Castigo",
      autores: "Fiódor Dostoiévski",
      isbn: "9788535916522",
      edicao: "1ª",
      ano: "1866",
      editora: "Companhia das Letras",
      qtd_paginas: "656",
      link_compra: "https://www.amazon.com.br/dp/8535916520",
      imagem_capa: "https://images.tcdn.com.br/img/img_prod/850317/90_crime_e_castigo_capa_dura_4273_1_c7ddec48eada3a59944d78a741dd7fab.jpg"
    },
    {
      id: 5,
      titulo: "O Estrangeiro",
      autores: "Albert Camus",
      isbn: "9788535914849",
      edicao: "1ª",
      ano: "1942",
      editora: "Record",
      qtd_paginas: "208",
      link_compra: "https://www.amazon.com.br/dp/8535914846",
      imagem_capa: "https://static.fnac-static.com/multimedia/Images/PT/NR/2c/ca/09/641580/1540-6/tsp20160819041407/O-Estrangeiro.jpg"
    },
    {
      id: 6,
      titulo: "Lolita",
      autores: "Vladimir Nabokov",
      isbn: "9789643218008",
      edicao: "1ª",
      ano: "1955",
      editora: "Alfred A. Knopf",
      qtd_paginas: "336",
      link_compra: "https://www.amazon.com.br/dp/9643218007",
      imagem_capa: "https://www.zouzoustore.com/cdn/shop/files/Lolita-Libri.jpg?v=1708189547"
    },
    {
      id: 7,
      titulo: "O Grande Gatsby",
      autores: "F. Scott Fitzgerald",
      isbn: "9788535914566",
      edicao: "1ª",
      ano: "1925",
      editora: "Penguin",
      qtd_paginas: "180",
      link_compra: "https://www.amazon.com.br/dp/853591456X",
      imagem_capa: "https://m.media-amazon.com/images/I/81af+MCATTL.jpg"
    },
    {
      id: 8,
      titulo: "A Revolução dos Bichos",
      autores: "George Orwell",
      isbn: "9788535914849",
      edicao: "1ª",
      ano: "1945",
      editora: "Companhia das Letras",
      qtd_paginas: "152",
      link_compra: "https://www.amazon.com.br/dp/8535914846",
      imagem_capa: "https://images-americanas.b2w.io/produtos/5640514/imagens/livro-a-revolucao-dos-bichos-um-conto-de-fadas/5640514_1_large.jpg"
    },
    {
      id: 9,
      titulo: "Dom Casmurro",
      autores: "Machado de Assis",
      isbn: "9788503013273",
      edicao: "1ª",
      ano: "1899",
      editora: "Editora Ática",
      qtd_paginas: "256",
      link_compra: "https://www.amazon.com.br/dp/8503013274",
      imagem_capa: "https://cdn.awsli.com.br/2500x2500/1754/1754872/produto/321534857/dom-casmurro-1-ymixorc2mi.jpg"
    },
    {
      id: 10,
      titulo: "O Morro dos Ventos Uivantes",
      autores: "Emily Brontë",
      isbn: "9788537801529",
      edicao: "1ª",
      ano: "1847",
      editora: "L&PM",
      qtd_paginas: "376",
      link_compra: "https://www.amazon.com.br/dp/8537801523",
      imagem_capa: "https://martinsfontespaulista.vteximg.com.br/arquivos/ids/234227-800-800/883224_ampliada.jpg"
    }

  ];
  

  app.get('/livros', (req, res) => res.json(livros));

  app.post('/livros', (req, res) => {
    const novo = { id: livros.length + 1, ...req.body };
    livros.push(novo);
    res.status(201).json(novo);
  });
  
  app.put('/livros/:id', (req, res) => {
    const { id } = req.params;
    const index = livros.findIndex(l => l.id == id);
    if (index !== -1) {
      livros[index] = { ...req.body, id: parseInt(id) };
      res.json(livros[index]);
    } else {
      res.status(404).json({ error: 'Livro não encontrado' });
    }
  });
  
  app.delete('/livros/:id', (req, res) => {
    const { id } = req.params;
    const index = livros.findIndex(l => l.id == id);
    if (index !== -1) {
      const removido = livros.splice(index, 1);
      res.json(removido[0]);
    } else {
      res.status(404).json({ error: 'Livro não encontrado' });
    }
  });
  
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
