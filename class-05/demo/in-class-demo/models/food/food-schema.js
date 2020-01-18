'use strict';

const mongoose = require('mongoose');

const food = mongoose.Schema({
  name: { type: String, required: true },
  calories: { type: Number, required: true },
  type: { type: String, required: true }
});

// LIFE-CYCLE EVENTS
// food.pre('save', function()  {})
// food.pre('find`', function()  {})
// food.pre('findOne', function()  {})
food.post('save', function () {
  // console.log(this);
});

module.exports = mongoose.model('food', food);