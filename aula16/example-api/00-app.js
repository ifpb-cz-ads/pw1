const express = require('express');

const app = express();

app.get('/random/:min/:max', (req, res) => {
    // le os dois parametros da requisicao
    const min = parseInt(req.params.min);
    const max = parseInt(req.params.max);

    // realiza a validacao
    if (isNaN(min) || isNaN(max)) {
        res.status(400);
        res.json({ error: 'Bad request.' });
        return;
    }

    // calcula e envia o json de resposta
    const result = Math.round(Math.random() * (max - min) + min);
    res.json({ result });
});

app.listen(3000, () => {
    console.log('App started on port 3000');
});
