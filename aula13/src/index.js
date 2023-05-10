const fs = require('fs');
const express = require('express');
const session = require('express-session');

const logger = require('morgan');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv').config();
const flash = require('connect-flash');

const routes = require('./routes');
const Seed = require('./seeders');
const Migration = require('./migrations');
const { dbFile } = require('./db');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(logger('tiny'));
app.use(flash());
app.use(
  session({
    secret: process.env.SECRET_KEY, // used to sign the cookie
    name: 'sessionId', // change session name for better security
    resave: false, // deactivates saving a session when it's not modified
    saveUninitialized: true, // save new sessions even if they're not modified
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
  console.error(err.stack);
  res.status(500).send('Internal server error');
});

app.listen(3000, () => {
  console.log('Food App is running!');
});
