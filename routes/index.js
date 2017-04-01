const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('index'));

router.route('/signin')
.get((req, res) => res.render('./routes/signin'))
.post((req, res) => res.send('recieved a post'))

router.route('/signup')
.get((req, res) => res.render('./routes/signup'))
.post((req, res) => res.send('recieved a post'))

module.exports = router;
