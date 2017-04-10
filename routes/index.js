const express = require('express');
const router = express.Router();
const userModel = require('../database/modelController/user.js');
const productModel = require('../database/modelController/product.js');
const jwt = require('../configs/jwt.js');
const upload = require('../configs/multer.js').single('image');


router.get('/', (req, res) => res.render('index'));

router.route('/signin')
.get((req, res) => res.render('./routes/signin'))
.post((req, res) => {
   userModel.get(req.body).then( data => {
      if ( data === null ) {
         res.json(null);
      } else {
         console.log(15, data);
         jwt.sign( data, ( err, encoded ) => {
            console.log(17, data, encoded);
            res.cookie("userinfo", encoded,{httpOnly: true})
            data.redirect = "/";
            res.json(data);
         })
      }
   })
})

router.route('/signup')
.get((req, res) => res.render('./routes/signup'))
.post((req, res) => userModel.add(req.body).then( data => {
   console.log(29, data);
   if ( data === null ) {
      res.json(null);
   } else {
      jwt.sign( data, ( err, encoded ) => {
         console.log(34, data, encoded);
         res.cookie("userinfo", encoded)
         data.redirect = "/";
         res.json(data);
      })
   }
}))

/*
upload product with multerJS
*/
router.route('/upload')
  .get((req, res) => {res.render('./routes/upload')})
  .post((req, res) => upload(req, res, err => {
    if (err) return;
    const {name, desc} = req.body;
    const imgsrc = req.file.filename;
    console.log(name, desc, imgsrc);
    productModel.add(name, desc, imgsrc)
    .then(() => res.redirect('/'))
  }));

/*
  API to get Product model
*/
router.get('/img', async (req, res) => {
  let image = await productModel.getImage(req.query.imageid);
  res.send(image)
})

router.get('/imgs', async (req, res) => {
  var arrImage = await productModel.getPage(req.query.page - 1);
  res.send(arrImage);
})

module.exports = router;
