const express = require('express');
//const http = require('http');
const app = express();

//function hello(req, res) {
//  console.log('olá pw1!');
//  res.send('olá pw1!');
//}

app.use((req, res) => {
  console.log('olá pw1!');
  res.send('olá pw1!');
});

//const server = http.createServer(app);
app.listen(3000, () => {
  console.log('app executando');
});
