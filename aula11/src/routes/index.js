const express = require('express');
const router = express.Router();

const foodsController = require('../controllers/foodsController');
const categoriesController = require('../controllers/categoriesController');
const usersController = require('../controllers/usersController');

const middleware = require('../middleware');

router.get('/', (req, res) => res.redirect('/foods/index'));

router.get('/', (req, res) => res.redirect('/foods/index'));
router.get('/foods', foodsController.readAll);
router.get('/foods/index', foodsController.index);
router.get('/foods/create', middleware.isAuthenticated, foodsController.getCreateForm);
router.get('/foods/delete/:id', middleware.isAuthenticated, foodsController.getDeleteForm);
router.get('/foods/update/:id', middleware.isAuthenticated, foodsController.getUpdateForm);
router.post(
  '/foods/create',
  middleware.isAuthenticated,
  middleware.parser.single('image'),
  foodsController.create
);
router.post(
  '/foods/update',
  middleware.isAuthenticated,
  middleware.parser.single('image'),
  foodsController.update
);
router.post('/foods/delete', middleware.isAuthenticated, foodsController.destroy);

router.get('/categories', categoriesController.readAll);

router.get('/signup', usersController.create);
router.get('/signin', usersController.signin);
router.get('/signout', usersController.signout);
router.post('/signup', usersController.store);
router.post('/signin', usersController.authenticate);

module.exports = router;
