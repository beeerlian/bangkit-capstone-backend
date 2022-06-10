const mult = require("multer")

const multerMiddleware = mult({
       storage: mult.memoryStorage(),
       limits: {
              // fileSize: 3 * 224 * 224,
              fileSize: 3 * 1024 * 1024,
       }
});

module.exports = multerMiddleware