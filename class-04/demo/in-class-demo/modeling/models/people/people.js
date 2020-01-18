'use strict';

const Collection = require('../../collection.js');
const Person = require('./person.js');

class People extends Collection {
  constructor() {
    super(Person)
  }
}

module.exports = People;