const url = require('url');

const parsedUrl = url.parse('https://www.ifpb.edu.br:8080?query=name');

console.log(parsedUrl.host);
console.log(parsedUrl.protocol);
console.log(parsedUrl.port);
