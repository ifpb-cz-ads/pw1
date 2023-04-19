const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    console.log('página do modulo acervo');
    next();
});

router.get('/cadastrar-livro', (req, res) => {
    res.send('Página de cadastro de novo livro.');
})

router.get('/listar-livros', (req, res) => {
    res.send('Página com todo os livros');
});

module.exports = router;