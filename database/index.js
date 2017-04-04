const Sequelize = require('sequelize');

const config = {

}

const db = new Sequelize(
   'd80grv4dsbcbl6', // database
   'kzufkicnxudsih', // username
   '3e12789bdaa4e90779566d40e0dd9b39f253216cd56ca0c28728ad7bc80754d2', // password
   {
      host: 'ec2-23-21-46-94.compute-1.amazonaws.com',
      port: 5432,
      dialect: 'postgres',
      dialectOptions: { // not in document but present in source
         ssl: true
      }
   }
)

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
