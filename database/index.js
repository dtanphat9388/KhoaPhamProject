const Sequelize = require('sequelize');
const dbconfig = require('../configs/db.js');

const db = new Sequelize(dbconfig.database, dbconfig.username, dbconfig.password, dbconfig.config);

db.authenticate()
.then( status => console.log('connected to heroku postgres database "d80grv4dsbcbl6"') )
.catch( status => console.log(status.toString()) )

db.User = db.import('./models/user.js')

db.sync();

module.exports = db;
// User.create({username: 'tanphat', password: 'Dtanphat'})
// .then(data => console.log(data))
// const obj = {username: 'tanphat', password: 'Dtanphat'};
// const {username, password} = obj;
// const username = 'tanphat';
// const password = 'Dtanphat';
//
