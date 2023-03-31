const fs = require('fs');

const options = { encoding: 'utf-8' };

fs.readFile('text.txt', options, (err, data) => {
  if (err) {
    console.log('erro ao ler arquivo');
    return;
  }

  console.log(data);
});

console.log('isso vem depois ou antes?');
