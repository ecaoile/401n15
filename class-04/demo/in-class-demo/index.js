'use strict';

let Products = require('./modeling/models/products/products.js');
let products = new Products();
let tv = products.create({ name: 'Television', price: 50 });

console.log(products.get());

// let Food = require('./modeling/models/food/food.js');
// let People = require('./modeling/models/people/people.js');

// let food = new Food();
// let people = new People();

// let carrot = food.create({
//   name: 'Carrot',
//   calories: 50
// });

// let plum = food.create({
//   name: 'Plum',
//   calories: 200
// });

// let brownies = food.create({
//   name: 'Brownies',
//   calories: 476
// });

// console.log(food.get());
// console.log(food.get(carrot.id));
// // food.delete(brownies.id);
// // console.log(food.get());

// const john = people.create({
//   name: "john",
//   age: 50,
// });

// const cathy = people.create({
//   name: "Cathy",
//   age: 49
// })

// console.log('-----');
// console.log(people.get());