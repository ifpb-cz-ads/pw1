const fs = require('fs');
const path = require('path');
const logger = require('morgan');

const express = require('express');
const app = express();

app.use(logger('dev'));

const staticPath = path.join(__dirname, 'static');
app.use(express.static(staticPath));

app.use((req, res, next) => {
    console.log("erro ao ler arquivo");
    res.status(404);
    res.send("arquivo nao encontrado");
});

app.listen(3000, () => console.log('app executando'));