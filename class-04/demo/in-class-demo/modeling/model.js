'use strict';

let uuid = require('uuid').v4;
let Validator = require('@jet-city-software/validator');
let validator = new Validator();

class Model {

  constructor(schema, data) {

    this.schema = schema;

    data.id = uuid();

    if (validator.isValid(this.schema, data)) {

      Object.keys(this.schema.fields).forEach(key => {
        if (data[key]) { this[key] = data[key]; }
      })

    }

  }

  delete() {
  }

  update(newVersion) {

    if (validator.isValid(this.schema, newVersion)) {
      Object.keys(this.schema.fields).forEach(key => {
        if (newVersion[key]) { this[key] = newVersion[key]; }
      })
    }

  }

  patch(newVersion) {

    Object.keys(newVersion).forEach(key => {
      if (
        this.schema.fields[key] &&
        validator.isCorrectType(newVersion[key], this.schema.fields[key])) {
        this[key] = newVersion[key];
      }
    })
  }

}

module.exports = Model;