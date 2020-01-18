'use strict';

const uuid = require('uuid/v4');
const Validator = require('@jet-city-software/validator');
const validator = new Validator();

class Collection {
  constructor(DataModel) {
    // this.database = {};
    this.DataModel = DataModel
  }

  get(id) {
    /*
      {
        count: 12,
        results: [ {}, {], {}]
      }

      {}
    */

    if (!id) {
      return { results: [this.database] };
    }
    else {
      return this.database[id];
    }
  }

  create(data) {

    let record = new this.DataModel(data);
    this.database[record.id] = record;
    return record

  }

  update(id, record) {

  }

  delete(id) {
    delete this.database[id];
  }
}

module.exports = Collection;