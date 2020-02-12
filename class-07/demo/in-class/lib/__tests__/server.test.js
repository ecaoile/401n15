'use strict';

const supergoose = require('@code-fellows/supergoose');

const server = require('../server.js');

const agent = supergoose(server.apiServer);

describe('API Routes are properly wired', () => {

  beforeEach(() => {
    // Delete the database
  })

  it('can post a record', () => {

    let item = { name: 'Carrots', calories: 10 };

    return agent.post('/api/v1/food')
      .send(item)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBeDefined();
        expect(response.body.name).toEqual(item.name);
        expect(response.body.calories).toEqual(item.calories);
      })
      .catch(error => {
        console.log(error);
        expect(error).not.toBeDefined();
      });

  });

  it('can get all records', () => {

    return agent.get('/api/v1/food')
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.count).toBeTruthy();
      })
      .catch(error => expect(error).not.toBeDefined())

  });

  it('can get one record', () => {

    return agent.get('/api/v1/food/55')
      .then(response => {
        expect(response.statusCode).toBe(200);
      })
      .catch(error => expect(error).not.toBeDefined())

  });

  it('can update a record', () => {

    return agent.put('/api/v1/food/55')
      .then(response => {
        expect(response.statusCode).toBe(200);
      })
      .catch(error => expect(error).not.toBeDefined())

  });

  it('can delete a record', () => {

    return agent.delete('/api/v1/food/55')
      .then(response => {
        expect(response.statusCode).toBe(200);
      })
      .catch(error => expect(error).not.toBeDefined())

  })
})