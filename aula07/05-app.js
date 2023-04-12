const fs = require('fs');
const path = require('path');
const logger = require('morgan');

const express = require('express');
const app = express();

app.use(logger('dev'));

app.use((req, res, next) => {
    const filePath = path.join(__dirname, 'static', req.originalUrl);
    res.sendFile(filePath, (err) => {
        if (err) {
            next(new Error('erro ao ler arquivo'));
        }
    });
});

app.use((err, req, res, next) => {
    console.log(err);
    next(err);
});

app.use((err, req, res, next) => {
    res.status(500);
    res.send('erro interno do servidor');
});

app.listen(3000, () => console.log('app executando'));