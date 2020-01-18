'use strict';

const Collection = require('../../collection.js');
const Product = require('./product.js');

class Products extends Collection {
  constructor() {
    super(Product);
  }
}

module.exports = Products;
