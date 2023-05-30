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

module.exports = parser;
