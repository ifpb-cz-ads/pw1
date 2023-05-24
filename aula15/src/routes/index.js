const express = require('express');
const router = express.Router();

const categoriesController = require('../controllers/categoriesController');

const middleware = require('../middleware');

const foodsRouter = require('./foods');
const usersRouter = require('./users');

router.use(middleware.initLocals);
router.use(usersRouter);
router.use('/foods', foodsRouter);

router.get('/', (req, res) => res.redirect('/foods/index'));
router.get('/categories', categoriesController.readAll);

module.exports = router;
