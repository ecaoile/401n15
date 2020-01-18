'use strict';

const schema = require('./food-schema.js');

class Food {
  constructor() {
  }

  get(id) {
    if (id) { return schema.findOne({ _id: id }); }
    else { return schema.find({}); }
  }

  create(record) {
    let newRecord = new schema(record);
    return newRecord.save();
  }

  update(id, record) {
    return schema.findByIdAndUpdate(id, record, { new: true });
  }

  delete(id) {
    return schema.findByIdAndDelete(id);
  }
}

module.exports = Food;