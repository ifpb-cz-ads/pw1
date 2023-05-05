const express = require('express');
const router = express.Router();

const foodsController = require('../controllers/foodsController');
const categoriesController = require('../controllers/categoriesController');
const lib = require('../lib');

router.get('/', (req, res) => res.redirect('/foods/index'));

router.get('/foods/index', foodsController.index);
router.get('/foods/create', foodsController.getCreateForm);
router.get('/foods/delete/:id', foodsController.getDeleteForm);
router.get('/foods/update/:id', foodsController.getUpdateForm);
router.post('/foods/create', lib.parser.single('image'), foodsController.create);
router.post('/foods/update', lib.parser.single('image'), foodsController.update);
router.post('/foods/delete', foodsController.destroy);

router.get('/categories', categoriesController.readAll);

module.exports = router;
