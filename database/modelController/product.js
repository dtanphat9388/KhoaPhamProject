const { Product } = require('../index.js');

const add = (name, desc, imgsrc) => {
  return Product.create({name, desc, imgsrc})
};

const getImage = id => {
  return  Product.find({
            raw:true,
            where : {id}
          })
          .then( image => image.imgsrc)
          .catch(e => "no data")
};

const getPage = (page = 1)  => {
  const limit = 6;
  const offset = limit*page ;

  return Product.findAll({limit, offset, raw: true})
};

module.exports = { add, getImage, getPage }
