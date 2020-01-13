'use strict';

function checkForWords(words) {
  return new Promise((resolve, reject) => {
    let delay = Math.ceil(Math.random() * 250);
    setTimeout(() => {
      if (!!words) { resolve(`OK: ${words} (${delay})`); }
      else { reject('Bad'); }
    }, delay)
  });
}

// checkForWords('john')
//   .then( data => {})
//   .catch( e => {} )

async function getTime(text) {
  let data = await (checkForWords(text));
  let moreData = await (checkForWords(data));
  console.log(moreData);
}


getTime('john');