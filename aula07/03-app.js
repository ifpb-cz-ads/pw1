const fs = require('fs');
const path = require('path');
const logger = require('morgan');

const express = require('express');
const app = express();

app.use(logger('dev'));

app.use((req, res, next) => {
    const filePath = path.join(__dirname, 'static', req.originalUrl);
    fs.stat(filePath, (err, fileData) => {
        if (err) {
            next();
            return;
        }

        if (fileData.isFile()) {
            res.sendFile(filePath);
        }
    });
});

app.use((req, res, next) => {
    console.log("erro ao ler arquivo");
    res.status(404);
    res.send("arquivo nao encontrado");
});

app.listen(3000, () => console.log('app executando'));