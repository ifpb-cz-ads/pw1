const express = require('express');
const router = express.Router();

const { celebrate, Joi, Segments } = require('celebrate');

const usersAPIController = require('../controllers/usersAPIController');

router.post(
      '/signup',
      celebrate({
            [Segments.BODY]: Joi.object().keys({
                  name: Joi.string().required(),
                  email: Joi.string().email().required(),
                  password: Joi.string().min(8).required(),
            }),
      }),
      usersAPIController.store
);
router.post(
      '/signin',
      celebrate({
            [Segments.BODY]: Joi.object().keys({
                  email: Joi.string().email().required(),
                  password: Joi.string().min(8).required(),
            }),
      }),
      usersAPIController.authenticate
);

module.exports = router;
