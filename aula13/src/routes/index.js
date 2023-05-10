const express = require('express');
const router = express.Router();

const foodsController = require('../controllers/foodsController');
const categoriesController = require('../controllers/categoriesController');
const usersController = require('../controllers/usersController');
const lib = require('../lib');

const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  } else {
    req.flash('info', 'Autenticação necessária.');
    res.redirect('/signin');
  }
};

const initLocals = (req, res, next) => {
  res.locals.user = req.session.user;
  res.locals.errors = req.flash('error');
  res.locals.infos = req.flash('info');
  next();
};

router.use(initLocals);

router.get('/', (req, res) => res.redirect('/foods/index'));

router.get('/foods/index', foodsController.index);
router.get('/foods/create', isAuthenticated, foodsController.getCreateForm);
router.get('/foods/delete/:id', isAuthenticated, foodsController.getDeleteForm);
router.get('/foods/update/:id', isAuthenticated, foodsController.getUpdateForm);
router.post('/foods/create', isAuthenticated, lib.parser.single('image'), foodsController.create);
router.post('/foods/update', isAuthenticated, lib.parser.single('image'), foodsController.update);
router.post('/foods/delete', isAuthenticated, foodsController.destroy);

router.get('/categories', categoriesController.readAll);

router.get('/signup', usersController.create);
router.get('/signin', usersController.signin);
router.get('/signout', usersController.signout);
router.post('/signup', usersController.store);
router.post('/signin', usersController.authenticate);

module.exports = router;
