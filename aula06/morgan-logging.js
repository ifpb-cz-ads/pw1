const express = require('express');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));

app.use((req, res, next) => {
  const minutes = new Date().getMinutes();
  const autorizado = minutes % 2 === 0;

  if (autorizado) {
    next();
    return;
  } else {
    res.send('acesso nao autorizado');
  }
});

app.use((req, res) => {
  res.send('olá, pw1!');
});

app.listen(3000, () => {
  console.log('app executando');
});
