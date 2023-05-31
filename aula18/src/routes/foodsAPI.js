/**
 * @swagger
 * components:
 *   schemas:
 *     Food:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nome da comida.
 *           example: Hambúrguer
 *         image:
 *           type: string
 *           description: URL para uma imagem da comida.
 *           example: /imgs/hamburguer.jpg
 *         price:
 *           type: double
 *           description: Preço da comida, incluindo os centavos.
 *           example: 5.49
 *     NewFood:
 *       allOf:
 *         - $ref: '#/components/schemas/Food'
 *         - type: object
 *           properties:
 *             category_id:
 *               type: integer
 *               description: ID da categoria.
 *               example: 0
 *     GetFood:
 *       allOf:
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: ID da comida.
 *               example: 1
 *             category:
 *               type: string
 *               description: Nome da categoria.
 *               example: Bebida
 *         - $ref: '#/components/schemas/Food'
 *     FoodId:
 *       type: object
 *       properties:
 *         foodId:
 *           type: integer
 *           description: ID da comida criada.
 *           example: 1
 */

const express = require('express');
const router = express.Router();

const { celebrate, Joi, Segments } = require('celebrate');

const parser = require('../config/parser');
const middleware = require('../middleware');
const foodsAPIController = require('../controllers/foodsAPIController');

/**
 * @swagger
 * /api/v1/foods:
 *   get:
 *     summary: Recupera a lista de comidas.
 *     description: Recupera a lista de comidas do cardápio. Pode ser usada sem autenticação.
 *     tags:
 *       - foods
 *     responses:
 *       200:
 *         description: Uma lista de comidas.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 foods:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/GetFood'
 */
router.get('/', foodsAPIController.readAll);

/**
 * @swagger
 * /api/v1/foods/{id}:
 *   get:
 *     summary: Recupera uma única comida.
 *     description: Recupera uma única comida do cardário pelo ID. Pode ser usada sem autenticação.
 *     tags:
 *       - foods
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID numérico da comida a ser recuperada.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Uma única comida.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 food:
 *                   $ref: '#/components/schemas/GetFood'
 */
router.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  foodsAPIController.readById
);

/**
 * @swagger
 * /api/v1/foods:
 *   post:
 *     summary: Cria uma nova comida.
 *     tags:
 *       - foods
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewFood'
 *     responses:
 *       201:
 *         description: Comida criada
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/FoodId'
 */
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

/**
 * @swagger
 * /api/v1/foods/{id}:
 *   patch:
 *     summary: Atualiza uma comida.
 *     description: Modifica os valores de uma comida já cadastrada no cardápio, recuperada pelo ID.
 *     tags:
 *       - foods
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewFood'
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID numérico da comida a ser atualizada.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Comida atualizada.
 */
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

/**
 * @swagger
 * /api/v1/foods/{id}:
 *   delete:
 *     summary: Apaga uma comida.
 *     tags:
 *       - foods
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID numérico da comida a ser recuperada.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Comida apagada.
 */
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
