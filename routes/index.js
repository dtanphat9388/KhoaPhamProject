const express = require('express');
const router = express.Router();
const userModel = require('../database/modelController/user.js');
const jwt = require('../configs/jwt.js');

router.get('/', (req, res) => res.render('index'));

router.route('/signin')
.get((req, res) => res.render('./routes/signin'))
.post((req, res) => {
   userModel.getUser(req.body).then( data => {
      if ( data === null ) {
         res.json(null);
      } else {
         console.log(15, data);
         jwt.sign( data, ( err, encoded ) => {
            console.log(17, data, encoded);
            res.cookie("userinfo", encoded)
            data.redirect = "/";
            res.json(data);
         })
      }
   })
})

router.route('/signup')
.get((req, res) => res.render('./routes/signup'))
.post((req, res) => userModel.addUser(req.body).then( data => {
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

module.exports = router;
