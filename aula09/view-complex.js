const express = require('express');
const path = require('path');
const ejs = require('ejs');
const app = express();

app.locals.appName = 'Song Lyrics';

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));
app.engine('html', ejs.renderFile);

app.use(function (req, res, next) {
  res.locals.userAgent = req.headers['user-agent'];
  res.locals.cache = true;
  next();
});

app.get('/about', function (req, res) {
  res.render('about', {
    currentUser: 'india-arie123',
  });
});

app.get('/contact', function (req, res) {
  res.render('contact.ejs');
});

app.use(function (req, res) {
  res.status(404);
  res.render('404.html', {
    urlAttempted: req.url,
  });
});

app.listen(3000);
