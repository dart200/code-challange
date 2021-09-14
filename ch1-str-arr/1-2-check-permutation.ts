#!/usr/bin/env ts-node-script
import * as _ from 'lodash'

const checkStr = (str1: string, str2: string) => {
  // hashmap
  const charMap = {};

  Array.from(str1).map(c => charMap[c] = (_.isUndefined(charMap[c]) ? 1 : charMap[c]+1));
  Array.from(str2).map(c => charMap[c] = (_.isUndefined(charMap[c]) ? -1 : charMap[c]-1));

  return _(charMap).reduce((prev, val, c) => {
    if (val !== 0) 
      return false
    else
      return prev;
  }, true);
};

const test1 = checkStr('hello', 'olelh');
const test2 = checkStr('hello', 'olel');
const test3 = checkStr('hello', 'olelhe');
const test4 = checkStr('ba', 'ab');

console.log({test1, test2, test3, test4});

