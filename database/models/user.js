module.exports = (sequelize, DataTypes) => {
   const User = sequelize.define('User',{
      username: {
         type: DataTypes.STRING
      },
      password: {
         type: DataTypes.STRING
      }
   },{
      paranoid: true
   });
   return User;
}
