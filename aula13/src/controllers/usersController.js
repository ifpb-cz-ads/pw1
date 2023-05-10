const bcrypt = require('bcrypt');

const User = require('../models/User');

const create = (req, res) => {
  res.render('users/create.njk');
};

const signin = (req, res) => {
  res.render('users/signin.njk');
};

const signout = (req, res) => {
  req.session.destroy();
  res.locals.user = null;
  res.redirect('/');
};

const store = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = { name, email, password };

    await User.createAutoInc(newUser);

    req.flash('info', 'Conta criada com sucesso. Realize seu login.');
    res.redirect('/');
  } catch (err) {
    console.error(err);
  }
};

const authenticate = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.readByEmail(email);

  const match = user ? await bcrypt.compare(password, user.password) : undefined;

  if (user && match) {
    req.session.user = user;
    res.locals.user = user;
    res.redirect('/');
  } else {
    req.flash = ('error', 'Usuário ou senha inválidos.');
    res.redirect('/signin');
  }
};

module.exports = { create, store, signin, signout, authenticate };
