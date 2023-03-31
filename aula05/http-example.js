const http = require('http');

function requestHandler(request, response) {
  console.log('requisicao para: ' + request.url);
  response.end('requisicao realizada com sucesso!');
}

const server = http.createServer(requestHandler);
server.listen(3000);
