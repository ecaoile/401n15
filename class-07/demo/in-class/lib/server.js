'use strict';

// 3rd Party Depedencies
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// Our Home-Grown Dependencies
const notFoundHandler = require('./middleware/404.js');
const errorHandler = require('./middleware/500.js');

const food = require('./models/food/food-collection.js');

const app = express();

// 3rd Party Global Middleware
app.use(cors());
app.use(morgan('dev'));

// Our Middleware
app.use(express.json());


// Our Route Definitions
app.get('/api/v1/food', getAllFood);
app.get('/api/v1/food/:id', getOneFood);
app.delete('/api/v1/food/:id', deleteFood);
app.put('/api/v1/food/:id', updateFood);
app.post('/api/v1/food', createFood);

// Route Handlers
function getAllFood(req, res) {
  food.get()
    .then(results => {
      let output = {
        count: results.length,
        results
      }
      res.status(200).json(output);
    })
}

function getOneFood(req, res) {
  res.status(200).send('get one');
}

function deleteFood(req, res) {
  res.status(200).send('delete');
}

function updateFood(req, res) {
  res.status(200).send('update');
}

function createFood(req, res, next) {
  let record = req.body;
  food.create(record)
    .then(createdRecord => {
      res.status(200).json(createdRecord);
    })
    .catch(error => next(error));
}


// Unsupported` Routes
app.use('*', notFoundHandler);

// Actual Errors
app.use(errorHandler);

module.exports = {
  apiServer: app,
  start: (port) => {
    app.listen(port, () => {
      console.log('running on', port)
    });
  }
}