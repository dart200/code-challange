#!/usr/bin/env ts-node-script
import * as _ from 'lodash'

const checkStr = (strIn: string) => {
  const str = strIn.replace(' ', '');
  const charMap: {[id: string]: number} = {};

  Array.from(str).map(c => 
    charMap[c] = (_.isUndefined(charMap[c]) ? 1 : charMap[c]+1)
  );

  const isOdd = !!(str.length % 2);
  let midChar = false;
  let valid = true;

  _.map(charMap, 
    (val, c) => {
      const evenCount = !(val % 2);
      if (evenCount) return;

      if (!midChar)
        midChar = true;
      else
        valid = false;
    });

  return valid;
};

const test = (str) => {
  const res = checkStr(str);
  console.log("'"+str+"'", res);
}


test('hel le');
test('helleo');
test('hell eoh');
test('cat');
test('cate');
test('c');
test('cb');


