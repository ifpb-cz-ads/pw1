const express = require('express');
const api = express.Router();

api.get('/timezone', (req, res) => {
    res.json({ result: 'Sample response for /timezone' });
});

api.get('/all_timezones', (req, res) => {
    res.json({ result: 'Sample response for /all_timezones' });
});

module.exports = api;
