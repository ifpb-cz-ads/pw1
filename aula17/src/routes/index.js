const express = require('express');
const router = express.Router();

const categoriesController = require('../controllers/categoriesController');

const middleware = require('../middleware');

const foodsRouter = require('./foods');
const foodsAPIRouter = require('./foodsAPI');
const usersRouter = require('./users');
const usersAPIRouter = require('./usersAPI');

router.use(middleware.initLocals);
router.use(usersRouter);
router.use('/foods', foodsRouter);
router.use('/api/v1/foods', foodsAPIRouter);
router.use('/api/v1/users', usersAPIRouter);

router.get('/', (req, res) => res.redirect('/foods/index'));
router.get('/categories', categoriesController.readAll);

module.exports = router;
