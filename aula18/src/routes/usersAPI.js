/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: E-mail do usuário.
 *           example: user@domain.com
 *         password:
 *           type: string
 *           description: Senha do usuário com ao menos 8 caracteres.
 *           example: Us3rS#$@
 *     NewUser:
 *       allOf:
 *         - $ref: '#/components/schemas/Food'
 *         - type: object
 *           properties:
 *             name:
 *               type: string
 *               description: Nome do usuário.
 *               example: User
 *     Token:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: Token de autorização JWT.
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 */

const express = require('express');
const router = express.Router();

const { celebrate, Joi, Segments } = require('celebrate');

const usersAPIController = require('../controllers/usersAPIController');

/**
 * @swagger
 * /api/v1/users/signup:
 *   post:
 *     summary: Cadastra um novo usuário.
 *     tags:
 *       - users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewUser'
 *     responses:
 *       201:
 *         description: Usuário cadastrado.
 */
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

/**
 * @swagger
 * /api/v1/users/signin:
 *   post:
 *     summary: Autentica um usuário cadastrado.
 *     tags:
 *       - users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuário autenticado.
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Token'
 *         headers:
 *           Authorization:
 *             schema:
 *               type: string
 *             description: Token JWT criado.
 */
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
