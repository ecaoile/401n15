'use strict';

const express = require('express');

const basicAuth = require('./basic-auth-middleware.js'); // Username + Password
const oauth = require('./oauth-middleware.js');          // Remote User / 3rd Party
const auth = require('./token-auth-middleware.js');      // Verify Token and User
const permissions = require('./acl-middleware.js');      // Check role/capabilities
const Users = require('./users.js');

const app = express();

app.use(express.json());

app.use(express.static('./public'));


// echo '{"username":"john", "password":"blue"}' | http post :3000/signup
app.post('/signup', async (req, res) => {

  let user = new Users(req.body);

  user.save(req.body)
    .then(user => {
      let token = user.generateToken();
      res.status(200).send(token);
    })
    .catch(err => {
      res.status(403).send('You cannnot do this');
    })

});

// http post :3000/signin -a john:blue
app.post('/signin', basicAuth, (req, res) => {
  res.status(200).send(req.token);
});

app.get('/oauth', oauth, (req, res) => {
  res.status(200).send(req.token);
});

app.get('/secretstuff', auth, (req, res) => {
  /// Now we have a user ...
  // do things that a user can do.
  res.send(`Welcome back, ${req.user.username}`);
});


app.get('/create', auth, permissions('create'), (req, res) => {
  res.send(`Yes, you created a thing`);
})

app.get('/update', auth, permissions('update'), (req, res) => {
  res.send(`Yes, you can update stuff`);
})

app.get('/read', auth, permissions('read'), (req, res) => {
  res.send(`Yes, you can read stuff`);
})

app.get('/delete', auth, permissions('delete'), (req, res) => {
  res.send(`Yes, you can delete stuff`);
})

/*
  // REACT

  <Auth capability="delete">
    <button>Delete this person</button>
  </Auth>
*/

module.exports = {
  start: (port) => app.listen(port, () => console.log(`Up on ${port}`))
}