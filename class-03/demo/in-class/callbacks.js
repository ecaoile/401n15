'use strict';

let myCallback = (err, data) => {
  if (err) { throw err; }
  console.log('Callback:', data);
}

let useTheCallback = (words, cb) => {
  console.log('Using the callback');

  setTimeout(() => {
    if (words !== "Hello") {
      let error = "You stink";
      cb(error);
    }
    else {
      cb(undefined, words);
    }
  }, 10)

  console.log('Back from the callback');
}

useTheCallback('Hello', myCallback);
// app.get('/foobar', handler);

// let handler = (req, res) => {
//   res.send('Hi there');
// }