const express = require('express');
const logger = require('morgan');
const app = express();

app.use(logger('dev'));

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

app.get('/incompleto', (req, res) => {
  res.redirect('https://www.ifpb.edu.br');
});

app.listen(3000, () => {
  console.log('app executando');
});
