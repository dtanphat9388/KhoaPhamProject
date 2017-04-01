const express = require('express');

const routes = require('./routes');

/*
   EXPRESS APP
*/
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server started on port ${port}`))


/*
   express settings
*/
app.set('view engine', 'ejs');
app.set('views', 'views');


/*
   use middlewares
*/
app.use(express.static('./public'))
app.use('/', routes);
