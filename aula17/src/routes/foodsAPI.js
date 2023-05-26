const express = require('express');
const router = express.Router();

const { celebrate, Joi, Segments } = require('celebrate');

const parser = require('../config/parser');
const middleware = require('../middleware');
const foodsAPIController = require('../controllers/foodsAPIController');

router.get('/', foodsAPIController.readAll);
router.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  foodsAPIController.readById
);
router.post(
  '/',
  middleware.isAPIAuthenticated,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      image: Joi.string(),
      price: Joi.number().precision(2).required(),
      category_id: Joi.number().integer().required(),
    }),
  }),
  foodsAPIController.create
);
router.patch(
  '/:id',
  middleware.isAPIAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string(),
      image: Joi.string(),
      price: Joi.number().precision(2),
      category_id: Joi.number().integer(),
    }),
  }),
  foodsAPIController.update
);
router.delete(
  '/:id',
  middleware.isAPIAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  foodsAPIController.destroy
);

module.exports = router;
