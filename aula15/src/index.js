const fs = require('fs');
const express = require('express');

const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const nunjucks = require('nunjucks');
const flash = require('connect-flash');
const dotenv = require('dotenv').config();
const SQLiteStore = require('connect-sqlite3')(session);
const { isCelebrateError } = require('celebrate');

const routes = require('./routes');
const Seed = require('./seeders');
const Migration = require('./migrations');
const { dbFile } = require('./db');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(logger('tiny'));
app.use(cookieParser());
app.use(flash());
app.use(
  session({
    store: new SQLiteStore(),
    secret: process.env.SECRET_KEY, // used to sign the cookie
    name: 'sessionId', // change session name for better security
    resave: false, // deactivates saving a session when it's not modified
    saveUninitialized: true, // save new sessions even if they're not modified
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }, // 1 week
  })
);

app.set('view engine', 'njk');

nunjucks.configure('src/views', {
  express: app,
  autoescape: true,
  noCache: true,
});

(async () => {
  if (!fs.existsSync(dbFile)) {
    await Migration.up();
    await Seed.up();
  }
})();

app.use(routes);

app.use((req, res, next) => {
  res.status(404).send('Content not found');
});

app.use((err, req, res, next) => {
  console.error(err);

  if (isCelebrateError(err)) {
    const redirUrl =
      req.originalUrl.includes('create') || req.originalUrl.includes('signup')
        ? req.originalUrl
        : '/';

    req.flash('error', 'Um ou mais campos inválidos ou vazios. Tente novamente.');

    return res.redirect(redirUrl);
  } else {
    return res.status(500).send('Internal server error');
  }
});

app.listen(3000, () => {
  console.log('Food App is running!');
});
