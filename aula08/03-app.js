const express = require('express');

const logger = require('morgan');

const vendas = require('./routes/vendas');
const acervo = require('./routes/acervo');

const app = express();

app.use(logger('dev'));

app.use('/vendas', vendas);
app.use('/acervo', acervo);

app.get('/', (req, res) => {
    res.send('Página principal da livraria');
});

app.use((req, res, next) => {
    res.status(404).send('Página não encontrada!');
})

app.listen(3000, () => console.log('app executando'));
