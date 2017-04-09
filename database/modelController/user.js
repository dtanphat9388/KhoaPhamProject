const { User } = require('../index.js');

const add = ({username, password} = null) => {
   return User.find({ where: { username } }).then( data => {
      if ( data === null) return User.create({username, password}).then( data => data.dataValues)
      return null;
   })
}

const get = ({username, password} = null) =>{
   return User.find({
      where: {
         username, password
      },
      raw:true
   }).then(data => data) // return an object
}

const gets = ({username, password} = null) => {
   return User.findAll({
      where: {
         username, password
      },
      raw:true
   }).then(data => data) // return array of multi object
}


module.exports = { add, get, gets };
