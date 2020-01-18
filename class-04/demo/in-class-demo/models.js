'use strict';

let uuid = require('uuid').v4;
let Validator = require('@jet-city-software/validator');
let validator = new Validator();

// let people = new Person()

let schema = {
  fields: {
    id: { type: 'string', required: true },
    name: { type: 'string', required: true },
    age: { type: 'number', required: true },
    retired: { type: 'boolean' },
    children: { type: 'array', valueType: 'string' },
  },
}

class Person {

  constructor(data) {

    data.id = uuid();

    if (validator.isValid(schema, data)) {

      Object.keys(schema.fields).forEach(key => {
        if (data[key]) { this[key] = data[key]; }
      })

      // Business Logic
      this.checkIfRetired();
    }

  }

  checkIfRetired() {
    this.retired = this.age > 45;
  }

  delete() {
  }

  update(newVersion) {

    if (validator.isValid(schema, newVersion)) {
      Object.keys(schema.fields).forEach(key => {
        if (newVersion[key]) { this[key] = newVersion[key]; }
      })
    }

  }

  patch(newVersion) {

    Object.keys(newVersion).forEach(key => {
      // Does schema allow?
      // Is it the right type?
      if (
        schema.fields[key] &&
        validator.isCorrectType(newVersion[key], schema.fields[key])) {
        this[key] = newVersion[key];
      }
    })
  }

}

let obj = {
  name: "john",
  age: 51,
  retired: false,
  children: ['Zach', 'Allie']
};

let john = new Person(obj);

john.update({
  id: john.id,
  name: john.name,
  age: 200,
  children: ['Zach', 'Allie']
});

console.log(john);

john.patch({
  age: 70,
  weight: 200
});

console.log(john);