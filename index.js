const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require('./routes');

/*
   EXPRESS APP
*/
const app = express();

/*
   express settings
*/
app.set('view engine', 'ejs');
app.set('views', 'views');

/*
   use middlewares
*/
app.use(express.static('./public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', routes);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server started on port ${port}`))
