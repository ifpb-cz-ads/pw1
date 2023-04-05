const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('bem-vindo a homepage padrao');
});

app.get('/homepage', (req, res) => {
  res.send('bem-vindo a homepage personalizada');
});

app.get('/about', (req, res) => {
  res.send('este site e um teste com express e node');
});

app.get('/about/:teste', (req, res) => {
  res.send('este site e um teste para ' + req.params.teste);
});

app.listen(3000, () => {
  console.log('app executando');
});
