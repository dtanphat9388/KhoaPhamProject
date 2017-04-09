const { Product } = require('../index.js');

const add = ({name, imgsrc, desc} = null) => {
  return Product.create({name, imgsrc, desc})
}

const get = page => {
  const limit = 6;
  const offset = limit*page;

  return Product.findAll({limit, offset, raw: true})
}

module.exports = { add, get }
