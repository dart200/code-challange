#!/usr/bin/env ts-node-script
import * as _ from 'lodash'

type CharCountMap = {[id: string]: number};
const countChars = (str: string, charMap: CharCountMap) => {
  Array.from(str).map(c => 
    charMap[c] = (_.isUndefined(charMap[c]) ? 1 : charMap[c]+1)
  );
};

const checkStr = (str1: string, str2: string) => {
  const lenDiff = Math.abs(str1.length - str2.length);
  if (lenDiff >= 2) return false;

  const charMap1: CharCountMap = {};
  const charMap2: CharCountMap = {};

  countChars(str1, charMap1);
  countChars(str2, charMap2);

  // reduce over smaller map
  const [reduceOverMap, otherMap] 
    = (str1.length - str2.length > 0) ? [charMap2, charMap1]
    : [charMap1, charMap2];


  const diffChars = _.reduce(reduceOverMap,
    (prev, count, c) => (count === otherMap[c]) ? prev : prev+1
  , lenDiff);
    
  return diffChars <= 1;
};

const test = (str1, str2) => {
  const res = checkStr(str1, str2);
  console.log({str1, str2, res});
}

test('pale', 'pale');
test('pale', 'ple');
test('pales', 'pale');
test('pale', 'bale');
test('pale', 'bake');
test('pale', 'paless');
