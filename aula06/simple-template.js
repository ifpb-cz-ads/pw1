const express = require('express');
const logger = require('morgan');
const path = require('path');

const app = express();

const viewsPath = path.resolve(__dirname, 'views');
app.set('views', viewsPath);
app.set('view engine', 'ejs');

app.use(logger('dev'));

app.get('/', (req, res) => {
  res.render('home', {
    mensagem: 'outra coisa',
  });
});

app.listen(3000, () => {
  console.log('app executando');
});
