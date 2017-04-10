const multer = require('multer');

const storage = multer.diskStorage({
  destination: 'public/image',
  filename(req, file, cb){
    cb(null, file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  console.log(file.mimetype);
  const acceptMimetype = ['image/jpeg','image/png','image/bmp'];
  if (acceptMimetype.includes(file.mimetype)){
    cb(null, true)
  } else {
    cb(new Error("do not support this file;"))
  }
}

const upload = multer({storage, fileFilter})

module.exports = upload
