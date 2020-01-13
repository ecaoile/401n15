'use strict';

// File System (built in to Node.js);
const fs = require('fs');
const util = require('util');

let readFile = util.promisify(fs.readFile);
let writeFile = util.promisify(fs.writeFile);

// fs.readFile('words.txt', (err, data) => {
//   if (err) { throw err; }
//   let words = data.toString().toUpperCase();
//   let buffer = Buffer.from(words);
//   fs.writeFile('./words.txt', buffer, (err, data) => {
//     if (err) { throw err; }

//     fs.readFile('./words.txt', (err, data) => {
//       if (err) { throw err; }
//       console.log(data.toString());
//     })
//   })
// });

function alterTheFile() {
  return readFile('./words.txt')
    .then(data => {
      let words = data.toString().toUpperCase();
      let buffer = Buffer.from(words);
      return writeFile('./words.txt', buffer)
    })
    .then(() => readFile('./words.txt'))
    .then(newText => {
      return newText.toString();
    })
    .catch(e => console.err(e));
}

async function doItAll() {
  let contents = await alterTheFile();
  console.log(contents);
}

doItAll();

/// Testing a callback
// describe('thing', () => {
//   it('saves', (done) => {
//     fs.readFile('thing', (err, data) => {
//       expect(data.toString()).toEqual('test text');
//       done();
//     })
//   })
// })


// Testing a promise
// describe('thing', () => {
//   it('saves', () => {
//    return promiseyFunctionThing()
//      .then( data => {
//        expect(data).toBeWhatever();
//      })
//   })
// })