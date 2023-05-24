const express = require('express');
const api = express.Router();

api.get('/timezone', (req, res) => {
    res.json({ result: 'API 2: super cool new response for /timezone' });
});

module.exports = api;
