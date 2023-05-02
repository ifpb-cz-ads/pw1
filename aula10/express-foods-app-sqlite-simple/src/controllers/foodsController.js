const Food = require('../models/Food');

const index = async (req, res) => {
  const foods = await Food.readAll();

  res.render('foods/index.njk', { foods });
};

module.exports = { index };
