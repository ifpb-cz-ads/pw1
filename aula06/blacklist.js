const express = require('express');
const logger = require('morgan');
const app = express();

const IP_PROIBIDO = '::1';

app.use(logger('dev'));

app.use((req, res, next) => {
  if (req.ip === IP_PROIBIDO) {
    res.send('nao autorizado');
    return;
  }
  next();
});

app.use((req, res) => {
  res.send('olá pw1!');
});

app.listen(3000, () => {
  console.log('app executando');
});
