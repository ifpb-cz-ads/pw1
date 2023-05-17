const jwt = require('jsonwebtoken');
const multer = require('multer');
const { randomBytes } = require('node:crypto');

const parser = multer({
  storage: multer.diskStorage({
    destination: 'public/imgs',
    filename(req, file, callback) {
      file.key = `${randomBytes(16).toString('hex')}-${file.originalname}`;
      callback(null, file.key);
    },
  }),
});

const initLocals = (req, res, next) => {
  res.locals.user = req.session.user;
  res.locals.errors = req.flash('error');
  res.locals.infos = req.flash('info');
  next();
};

const isAuthenticated = async (req, res, next) => {
  const { access_token } = req.cookies;
  const msg = 'Você precisa se autenticar para acessar essa página.';

  if (access_token) {
    try {
      const [, token] = access_token.split(' ');
      await jwt.verify(token, process.env.SECRET_KEY);

      return next();
    } catch (e) {
      req.session.user = null; // session's over
      req.flash('info', msg);
      return res.redirect('/sigin');
    }
  } else {
    req.session.user = null; // session's over
    req.flash('info', msg);
    return res.redirect('/signin');
  }
};

module.exports = { parser, initLocals, isAuthenticated };
