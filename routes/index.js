const express = require('express');
const jwt = require('../configs/jwt.js');
const upload = require('../configs/multer.js').single('image');

/*
  models
*/
const User = require('../database/modelController/user.js');
const Product = require('../database/modelController/product.js');

/*
  routes
*/
const router = express.Router();

router.get('/', (req, res) => res.render('index'));

router.route('/signin')
.get((req, res) => res.render('signin'))
.post((req, res) => {
   User.get(req.body).then( data => {
      if ( data === null ) {
         res.json(null);
      } else {
        //  console.log("Route /sigin line 15: ", data);
         jwt.sign( data, ( err, encoded ) => {
            // console.log("Route /sigin line 15: ", data, encoded);
            res.cookie("userinfo", encoded,{httpOnly: true})
            data.redirect = "/";
            res.json(data);
         })
      }
   })
})

router.route('/signup')
.get((req, res) => res.render('signup'))
.post((req, res) => User.add(req.body).then( data => {
  //  console.log(29, data);
   if ( data === null ) {
      res.json(null);
   } else {
      jwt.sign( data, ( err, encoded ) => {
        //  console.log(34, data, encoded);
         res.cookie("userinfo", encoded)
         data.redirect = "/";
         res.json(data);
      })
   }
}))

router.route('/upload')
  .get((req, res) => {res.render('upload')})
  .post((req, res) => upload(req, res, err => {
    if (err) return res.json({
      "Error": err.toString(),
      "Files suport": {
        "image": ["bmp", "png", "jpeg"]
      }
    });

    const {name, desc} = req.body;
    const imgsrc = req.file.filename;
    Product.add(name, desc, imgsrc)
    .then(() => res.redirect('/'))
  }));

router.get('/product/detail/:id', (req, res) => {
  Product.get(req.params.id).then( product => {
    console.log(product);
    res.render('productDetail', {product})
  })
})

/*
  API to get Product model, get with AJAX
*/
router.get('/img', (req, res) => {
  Product.get(req.query.imageid)
  .then(image => console.log(image) || res.send(image));
})

router.get('/page', (req, res) => {
  Product.getOnPage(req.query.page - 1).then(arrProduct => console.log(arrProduct) || res.send(arrProduct));
})

router.get('/cart', (req, res) => {
  Product.getOnCart(req.query.arrProductCart)
  .then(arrProduct => console.log(arrProduct) || res.send(arrProduct))
})


module.exports = router;
