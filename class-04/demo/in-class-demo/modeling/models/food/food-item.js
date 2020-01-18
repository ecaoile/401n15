'use strict';

const Model = require('../../model.js');
const schema = {
  fields: {
    id: { type: 'string', required: true },
    name: { type: 'string', required: true },
    calories: { type: 'number', required: true },
  }
}

class FoodItem extends Model {

  constructor(data) {
    super(schema, data);

  }
}

module.exports = FoodItem;