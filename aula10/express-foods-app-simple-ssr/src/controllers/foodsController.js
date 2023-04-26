const Food = require('../models/Food');

const index = (req, res) => {
  const foods = Food.readAll();

  res.render('foods/index.njk', { foods });
};

module.exports = { index };
