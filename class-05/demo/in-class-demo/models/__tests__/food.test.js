'use strict';

require('@code-fellows/supergoose');

const Food = require('../food/food');
const food = new Food();

describe('Food Model', () => {
  it('can create() a record', () => {
    let obj = { name: 'Corn', calories: 70, type: 'VEGETABLE' };
    return food.create(obj)
      .then(record => {
        Object.keys(obj).forEach(key => {
          expect(record[key]).toEqual(obj[key])
        });
      })
  });
  it('can get() records', () => {
    let obj = { name: 'Corn', calories: 70, type: 'VEGETABLE' };
    return food.create(obj)
      .then(() => food.get())
      .then(data => {
        expect(data.length >= 1).toBeTruthy();
      })
      .catch(console.error);
  })
})