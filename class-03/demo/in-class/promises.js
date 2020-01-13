'use strict';

// Signature for an async method
// Returns a promise (an instance of Promise)
// resolve is a function that happens on happy
// reject is a function that happens when sad

function checkForWords(words) {
  return new Promise((resolve, reject) => {
    let delay = Math.ceil(Math.random() * 250);
    setTimeout(() => {
      if (!!words) { resolve(`OK: ${words} (${delay})`); }
      else { reject('Bad'); }
    }, delay)
  });
}

let operations = [];
for (let i = 1; i <= 10; i++) {
  operations.push(checkForWords(i));
}

Promise.all(operations)
  .then(allTheThings => {
    console.log(allTheThings);
  })

// console.log(operations);

// checkForWords(1)
//   .then(data => { console.log(data); return checkForWords(2) })
//   .then(data => { console.log(data); return checkForWords(3) })
//   .then(data => { console.log(data); return checkForWords(4) })
//   .then(data => { console.log(data); return checkForWords(5) })
//   .then(data => { console.log(data); return checkForWords(6) })
//   .then(data => { console.log(data); return checkForWords(7) })
//   .then(data => { console.log(data); return checkForWords(8) })