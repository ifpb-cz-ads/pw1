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

app.use((req, res) => {
  res.status(404).send('página não encontrada!');
});

app.listen(3000, () => console.log('app executando'));
