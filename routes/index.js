const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('index'));

router.route('/signin')
.get((req, res) => res.render('Signin'))

router.route('/signup')
.get((req, res) => res.render('Signup'))

module.exports = router;
