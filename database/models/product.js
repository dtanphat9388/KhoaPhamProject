module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {type: DataTypes.STRING},
    desc: {type: DataTypes.STRING},
    imgsrc: {type: DataTypes.STRING}
  })
  return Product
}
