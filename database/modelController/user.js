const { User } = require('../index.js');

const addUser = ({username, password} = null) => {
   return User.find({ where: { username } }).then( data => {
      if ( data === null) return User.create({username, password}).then( data => data.dataValues)
      return null;
   })
}

const getUser = ({username, password} = null) =>{
   return User.find({
      where: {
         username, password
      },
      raw:true
   }).then(data => data) // return an object
}

const getUsers = ({username, password} = null) => {
   return User.findAll({
      where: {
         username, password
      },
      raw:true
   }).then(data => data) // return array of multi object
}


module.exports = { addUser, getUser, getUsers };
