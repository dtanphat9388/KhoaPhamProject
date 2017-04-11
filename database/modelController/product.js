const { Product } = require('../index.js');

const add = (name, desc, imgsrc) => {
  return Product.create({name, desc, imgsrc})
};

const get= id => {
  return  Product.find({
            raw:true,
            where : {id}
          })
          .then( product => product)
          .catch(e => "no data")
};

const getOnCart = (arrProductList) => {
  return  Product.findAll({
            raw:true,
            where : {
              id: {$in: arrProductList}
            }
          })
          .then( image => image)
          .catch(e => "no data")
};

const getOnPage = (page = 1)  => {
  const limit = 6;
  const offset = limit*page ;

  return Product.findAll({limit, offset, raw: true})
};

module.exports = { add, get, getOnCart, getOnPage }
