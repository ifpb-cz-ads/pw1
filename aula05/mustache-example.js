const mustache = require('mustache');

console.log(mustache.render('{{ nome }} {{ sobrenome }}', {
  nome: 'Paulo',
  sobrenome: 'Ewerton'
}))
