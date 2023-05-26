const Food = require('../models/Food');
const Category = require('../models/Category');

const readAll = async (req, res) => {
  const foods = await Food.readAll();

  res.json({ foods });
};

const readById = async (req, res) => {
  const { id } = req.params;

  const food = await Food.readById(id);

  if (food) {
    return res.json({ food });
  }

  res.status(404).json({ error: 'Food not found.' });
};

const create = async (req, res) => {
  const foodId = await Food.createAutoInc(req.body);

  res.status(201).json({ foodId });
};

const update = async (req, res) => {
  const { name, image, price, category_id } = req.body;
  const { id } = req.params;

  const food = await Food.readById(id);

  if (food) {
    const updatedFood = { name, image, price, category_id };

    await Food.update(id, updatedFood);

    return res.status(204).send();
  }

  res.status(404).json({ error: 'Food not found.' });
};

const destroy = async (req, res) => {
  const { id } = req.params;

  const food = await Food.readById(id);

  if (food) {
    await Food.destroy(id);

    return res.status(204).send();
  }

  res.status(404).json({ error: 'Food not found.' });
};

module.exports = {
  readAll,
  readById,
  create,
  update,
  destroy,
};
