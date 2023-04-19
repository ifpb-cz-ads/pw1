const path = require('path');
const express = require('express');

const app = express();

const publicPath = path.resolve(__dirname, 'public');
const staticPath = path.resolve(__dirname, 'static');

app.use('/public', express.static(publicPath));
app.use('/static', express.static(staticPath));

app.use((req, res) => {
    res.send('arquivo nao encontrado');
})

app.listen(3000, () => console.log('app executando'));