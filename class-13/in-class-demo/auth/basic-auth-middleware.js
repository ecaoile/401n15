'use strict';

const base64 = require('base-64');
const Users = require('./users.js');

module.exports = (req, res, next) => {

  if (!req.headers.authorization) {
    next('Invalid Login');
    return;
  }

  // Header:  Basic Y2F0aHk6Z3JleQ==
  let basic = req.headers.authorization.split(' ').pop();
  let [username, password] = base64.decode(basic).split(':');

  Users.authenticateBasic(username, password)
    .then(user => {
      req.token = user.generateToken();
      next();
    })
    .catch(err => {
      next('Invalid Login');
    })

}
