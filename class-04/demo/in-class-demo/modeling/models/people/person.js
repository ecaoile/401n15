'use strict';

let uuid = require('uuid').v4;
let Validator = require('@jet-city-software/validator');
let validator = new Validator();

const Model = require('../../model.js');

const schema = {
  fields: {
    id: { type: 'string', required: true },
    name: { type: 'string', required: true },
    age: { type: 'number', required: true },
  }
}

class Person extends Model {

  constructor(data) {
    super(schema, data);
  }
}

module.exports = Person;