#!/usr/bin/env ts-node-script
import * as _ from 'lodash'

const str = 'asdfasdf   blah';

const charMap = {};

Array.from(str).map(c => charMap[c] ? charMap[c]++ : charMap[c]=1);

console.log(charMap);

_.forEach(charMap, (count, c) => {
  if (count > 1) {
    console.log('false');
    process.exit();
  }
})

console.log('true');