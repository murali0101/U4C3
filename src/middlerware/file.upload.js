const path = require("path");
const multer = require("multer");

const req = require("express/lib/request");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../my_Doc"));
  },
  filename: function (req, file, cb) {
    const uniqueprefix = Date.now();
    cb(null, uniqueprefix + "-" + file.originalname);
  },
});

function fileFilter(req, file, cb) {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("file format should be jpeg/png"), false);
  }
}

let opt = {
  storage,
  fileFilter,
};

let Upload = multer(opt);

module.exports = Upload;
