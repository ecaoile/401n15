'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let SECRET = 'mydoghasfleas!';

const Users = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: 'guest', enum: ['admin', 'editor', 'producer', 'guest'] }
});

const acl = {
  guest: ['read'],
  producer: ['read', 'create'],
  editor: ['read', 'update'],
  admin: ['read', 'delete']
};

Users.pre('save', async function () {
  // this is the user instance
  this.password = await bcrypt.hash(this.password, 5);
});

// let john = new User()
// if(john.can('delete')) { }
Users.methods.can = function (task) {
  // return boolean
  // this.role ... "admin"
  return acl[this.role].includes(task);
}


// anything.methods.whatever === instance method
// let user = new Users();
// user.generateToken()
Users.methods.generateToken = function () {
  let tokenObject = {
    username: this.username,
    permisssions: acl[this.role]
  };
  return jwt.sign(tokenObject, SECRET);
};

// anything.statics.whatever === static or class method
// Users.authenticateBasic()
Users.statics.authenticateBasic = async function (username, password) {
  let query = { username: username }; // {username}
  let user = await this.findOne(query);
  if (user) {
    let isValid = await bcrypt.compare(password, user.password);
    if (isValid) { return user; }
    else { throw "Invalid User"; }
  }
  else {
    throw "Invalid User";
  }
}

Users.statics.authenticateWithToken = async function (token) {
  try {
    let tokenObject = jwt.verify(token, SECRET);
    console.log(tokenObject);
    let user = await this.findOne({ username: tokenObject.username })
    return user;
  } catch (e) {
    throw e.message;
  }
}

module.exports = mongoose.model('users', Users);

// let user = new Users();
// user.save() // instance methods

// Users.authenticate(user,pass)
  // look up the username
  // validate the password
  // return an instance

// class Thing {
//   constructor() {
//     this.name = "something";
//   }

//   print() {
//     console.log(this.name);
//   }

//   static show() {
//     console.log("hi");
//   }

// }

// let thing = new Thing();

// thing.print(); // something
// thing.show(); // error
// Thing.show(); // hi