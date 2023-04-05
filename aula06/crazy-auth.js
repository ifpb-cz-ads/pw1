const express = require('express');
const app = express();

app.use((req, res, next) => {
  console.log(`requisição para ${req.originalUrl} data: ${new Date()}`);
  next();
});

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

app.listen(3000, () => {
  console.log('app executando');
});
