'use strict';

require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Food = require('./models/food/food.js')
const food = new Food();

let carrot = {
  name: "Carrot",
  calories: 50,
  type: "FRUIT"
};

// let newCarrot = await food.create(carrot);

food.create(carrot)
  .then(() => food.get())
  .then(data => console.log(data))
  .catch(console.error);
