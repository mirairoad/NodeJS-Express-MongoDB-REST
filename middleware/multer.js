const multer = require("multer");

//-----------MULTER CONFIG & CREATE A FOLDER --------//
//update image and create a folder
const upload = multer({
    limits: {
      fileSize: 5000000,
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new Error("Please upload an image"));
      }
      cb(undefined, true);
    },
  });

module.exports ={
    upload,
    multer
}