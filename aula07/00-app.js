const express = require('express');
const app = express();

app.use((req, res, next) => {
    console.log('Requisicao para: ' + req.originalUrl);
    console.log('Data da requisicao: ' + new Date());
    next();
});

app.listen(3000, () => console.log('app executando'));