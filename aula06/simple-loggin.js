const express = require('express');
const app = express();

app.use((req, res, next) => {
  console.log('requisição para ' + req.originalUrl + 'data: ' + new Date());
  next();
});

app.listen(3000, () => {
  console.log('app executando');
});
