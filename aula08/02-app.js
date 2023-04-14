const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('HOME PAGE');
});

app.get('/sobre', (req, res) => {
  res.send('Site sobre Express e Node.');
});

app.get('/contato', (req, res) => {
  res.send('Envie seu e-mail para: pw1@gmail.com');
});

app.get('/saudacao', (req, res) => {
  const nome = req.query.nome;
  const email = req.query.email;
  res.send('olá, ' + nome + ' email ' + email);
});

app.get('/calculo/:numero', (req, res) => {
  const num = Number(req.params.numero);
  if (isNaN(num)) {
    res.status(403).send('parametro invalido');
    return;
  } else {
    const soma = num + 10;
    res.send('o calculo é ' + soma);
  }
});

app.get(/^\/indice\/(\w+)/, (req, res) => {
  const id = req.params[0];
  res.send('olá, ' + id);
});

app.use((req, res) => {
  res.status(404).send('página não encontrada!');
});

app.listen(3000, () => console.log('app executando'));
