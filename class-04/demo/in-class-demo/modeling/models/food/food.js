'use strict';

const Collection = require('../../collection.js');
const FoodItem = require('./food-item.js');

class Food extends Collection {
  constructor() {
    super(FoodItem)
  }
}

module.exports = Food;