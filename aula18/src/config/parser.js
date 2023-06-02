const multer = require('multer');
const { randomBytes } = require('node:crypto');

const parser = multer({
  storage: multer.diskStorage({
    destination: 'public/imgs',
    filename(req, file, callback) {
      if (file) {
        file.key = `${randomBytes(16).toString('hex')}-${file.originalname}`;
        callback(null, file.key);
      } else {
        callback(new Error('File cannot be empty'));
      }
    },
  }),
});

module.exports = parser;
