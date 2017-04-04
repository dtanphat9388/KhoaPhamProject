const express = require('express');
const router = express.Router();
const userModel = require('../database/modelController/user.js');

router.get('/', (req, res) => res.render('index'));

router.route('/signin')
.get((req, res) => res.render('./routes/signin'))
.post((req, res) => {
   userModel.getUser(req.body).then( data => {
      if ( data === null ) {
         res.json(null);
      } else {
         // làm thêm phần jwt
         data.redirect = "/signup";
         res.json(data);
      }
   })
})

router.route('/signup')
.get((req, res) => res.render('./routes/signup'))
.post((req, res) => userModel.addUser(req.body).then( data => {
   console.log(24, data);
   if ( data === null ) {
      res.json(null);
   } else {
      // làm thêm phần jwt
      data.redirect = "/";
      console.log(30, data);
      res.json(data);
   }
}))

module.exports = router;
