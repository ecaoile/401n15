'use strict';

const superagent = require('superagent');
const Users = require('./users.js');

const tokenServerURL = 'https://github.com/login/oauth/access_token';
const remoteAPI = 'https://api.github.com/user';
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const API_SERVER = 'http://localhost:3000/oauth';

module.exports = async (req, res, next) => {
  try {

    let code = req.query.code;
    console.log('(1) CODE:', code);

    let remoteToken = await exchangeCodeForToken(code);
    console.log('(2) TOKEN:', remoteToken);

    let remoteUser = await getRemoteUser(remoteToken);
    console.log('(3) REMOTE USER:', remoteUser);

    let [user, token] = await getOurUser(remoteUser.login);
    req.user = user;
    req.token = token;
    console.log('(4) OUR USER:', user);

    next();

  } catch (e) {
    next(`ERROR: ${e.message}`);
  }

  next();
}

async function exchangeCodeForToken(code) {

  let tokenServerResposne = await superagent.post(tokenServerURL)
    .send({
      code: code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: API_SERVER,
      grant_type: 'authorization_code'
    });

  return tokenServerResposne.body.access_token;

}

async function getRemoteUser(token) {

  let userReponse = await superagent.get(remoteAPI)
    .set('user-agent', 'express-app')
    .set('Authorization', `token ${token}`);

  return userReponse.body;
}

async function getOurUser(username) {
  let record = {
    username: username,
    password: 'alsdfkjsdlajdsflkjfslsdjfdsfl'
  }

  // Should: findOne, then token or add
  let user = await Users.findOne({ username })
  if (!user) {
    user = new Users(record);
    await user.save();
  }

  let token = user.generateToken();

  return [user, token];

}