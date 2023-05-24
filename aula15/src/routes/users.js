const express = require('express');
const router = express.Router();

const { celebrate, Joi, Segments } = require('celebrate');

const usersController = require('../controllers/usersController');

router.get('/signup', usersController.create);
router.get('/signin', usersController.signin);
router.get('/signout', usersController.signout);
router.post(
      '/signup',
      celebrate({
            [Segments.BODY]: Joi.object().keys({
                  name: Joi.string().required(),
                  email: Joi.string().email(),
                  password: Joi.string().min(8),
                  confirm_password: Joi.ref('password'),
            }),
      }),
      usersController.store
);
router.post('/signin', usersController.authenticate);

module.exports = router;
