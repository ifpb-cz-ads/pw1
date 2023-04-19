const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    console.log('página do modulo vendas');
    next();
});

router.get('/', (req, res) => {
    res.send('Página do módulo de vendas da livraria.');
})

router.get('/nova-venda', (req, res) => {
    res.send('Página de venda de um novo livro.');
})

router.get('/listar-vendas', (req, res) => {
    res.send('Página com todas as vendas');
});

module.exports = router;