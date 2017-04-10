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
    productModel.add(req.file.filename)
    .then(() => res.redirect('/imag'))
  }));

router.get('/img', async (req, res) => {
  let image = await productModel.getImage(req.query.imageid);
  res.send(image)
})

router.get('/imgs', async (req, res) => {
  console.log(62, req.query.page);
  var arrImage = await productModel.getPage(req.query.page);
  console.log(64, arrImage);
  res.send(arrImage);
})



module.exports = router;
