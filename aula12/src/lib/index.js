const path = require('path');
const { randomBytes } = require('node:crypto');

const multer = require('multer');
const imagesPath = path.join('public', 'imgs');

const parser = multer({
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, imagesPath);
    },
    filename: function (req, file, callback) {
      const fileName = `${randomBytes(16).toString('hex')}-${file.originalname}`;
      callback(null, fileName);
    },
  }),
});

module.exports = { parser };
