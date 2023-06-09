const fs = require('fs');
const path = require('path');

const Food = require('../models/Food');
const Category = require('../models/Category');

const index = async (req, res) => {
  const foods = await Food.readAll();

  const categories = await Category.readAll();

  res.render('foods/index.njk', { foods, categories });
};

const getCreateForm = async (req, res) => {
  const categories = await Category.readAll();

  res.locals.mode = 'create';
  res.render('foods/form.njk', { categories });
};

const create = async (req, res) => {
  const { name, image, price, category_id } = req.body;

  const newFood = { name, image, price, category_id };

  const foodId = await Food.createAutoInc(newFood);

  res.redirect('/');
};

const getUpdateForm = async (req, res) => {
  const { id } = req.params;

  const food = await Food.readById(id);
  const categories = await Category.readAll();

  res.locals.mode = 'update';
  res.render('foods/form.njk', { food, categories });
};

const update = async (req, res) => {
  const { id, name, originalImage, price, category_id } = req.body;
  const image = req.body.image || originalImage;

  const updateFood = { name, image, price, category_id };

  const result = await Food.update(id, updateFood);

  res.redirect('/');
};

const getDeleteForm = async (req, res) => {
  const { id } = req.params;

  const food = await Food.readById(id);

  res.render('foods/delete.njk', { food });
};

const destroy = async (req, res) => {
  const { id } = req.body;

  const deleteId = await Food.destroy(id);

  res.redirect('/');
};

module.exports = {
  index,
  create,
  update,
  destroy,
  getCreateForm,
  getUpdateForm,
  getDeleteForm,
};
