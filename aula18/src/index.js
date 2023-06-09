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
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const routes = require('./routes');
const Seed = require('./seeders');
const Migration = require('./migrations');
const { dbFile } = require('./db');

const app = express();

// swagger set up
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API REST Express de um gerenciador simples de cardápio para lanchonetes.',
    version: '1.0.0',
    description:
      'Esta é uma aplicação de API REST feita com Express.' +
      'Ela utiliza dados de um cardápio de comidas.',
    license: {
      name: 'Licenciado sob GPL.',
      url: 'https://github.com/pauloewerton/pw1',
    },
    contact: {
      name: 'Paulo Ewerton',
      url: 'https://github.com/pauloewerton',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor de desenvolvimento',
    },
    {
      url: 'https://pw1-foods-app.onrender.com',
      description: 'Servidor de produção',
    },
  ],
};
const options = {
  swaggerDefinition,
  apis: ['./src/routes/foodsAPI.js', './src/routes/usersAPI.js'],
};
const swaggerSpec = swaggerJSDoc(options);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
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
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, res, next) => {
  res.status(404).send('Content not found');
});

app.use((err, req, res, next) => {
  console.log(err);

  if (isCelebrateError(err)) {
    const message = err.message + ': ' + Object.fromEntries(err.details).body.details[0].message;
    if (!req.originalUrl.includes('api')) {
      // joi error comes from the web app, so redirect with a flash
      req.flash('error', message);
      return res.redirect(req.originalUrl);
    }

    // joi error comes from an API request, so send an error response
    return res.status(400).json({ error: message });
  } else {
    res.status(500).send('Internal server error');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Food App is running!');
});
