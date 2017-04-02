const express = require('express');
const router = express.Router();
const userModel = require('../database');

router.get('/', (req, res) => res.render('index'));

router.route('/signin')
.get((req, res) => res.render('./routes/signin'))
.post((req, res) => userModel.getUser(req.body).then( data => {
   if ( data !== null ) {
   		console.log(data)
      // adding jsonwebtoken
      data.redirect = "/";
      res.send(data);
   } else {
   		console.log(data)
   		
      res.send(data)
   }
}))

router.route('/signup')
.get((req, res) => res.render('./routes/signup'))
.post((req, res) => res.send('recieved a post'))

module.exports = router;
