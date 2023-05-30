const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const sendMail = require('../lib/sendMail');

const create = (req, res) => {
  res.render('users/create.njk');
};

const signin = (req, res) => {
  res.render('users/signin.njk');
};

const signout = (req, res) => {
  req.session.destroy();

  res.clearCookie('access_token');
  res.redirect('/');
};

const store = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, Number(process.env.SALT));
    const newUser = { name, email, password: hash };

    const user = await User.createAutoInc(newUser);
    await sendMail.createNewUser(newUser.email);

    req.flash('info', 'Conta criada com sucesso. Realize seu login.');
    res.redirect('/signin');
  } catch (err) {
    console.error(err);
  }
};

const authenticate = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.readByEmail(email);

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      const token = await jwt.sign(
        { userId: user.id },
        process.env.SECRET_KEY,
        { expiresIn: 3600 } // 1h
      );

      const tokenBearer = `Bearer ${token}`;

      req.session.user = user;

      res.cookie('access_token', tokenBearer, { maxAge: 3600000 }); // 1h
      res.set('Authorization', tokenBearer);
      res.redirect('/');
    } else {
      console.log('Senha inválida.');
      req.flash('error', 'Senha inválida. Tente novamente.');
      res.redirect('/signup');
    }
  } catch (error) {
    console.log(error);
    req.flash('error', 'Usuário não cadastrado. Realize seu cadastro.');
    res.redirect('/signup');
  }
};

module.exports = { create, store, signin, signout, authenticate };
