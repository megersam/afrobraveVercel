const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, './uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename = file.originalname.split('.')[0];
    const extension = path.extname(file.originalname).toLowerCase();
    cb(null, filename + '-' + uniqueSuffix + extension);
  },
  fileFilter: function (req, file, cb) {
    const allowedExtensions = ['.pdf', '.png', 'jpeg'];
    const extension = path.extname(file.originalname).toLowerCase();

    if (allowedExtensions.includes(extension)) {
      return cb(null, true);
    }

    cb('Error: Only PDF and PNG files are allowed.');
  },
});

exports.upload = multer({storage: storage});