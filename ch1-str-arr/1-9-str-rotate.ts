#!/usr/bin/env ts-node-script
import * as _ from 'lodash'

const isRotation = (str1: string, str2: string) => {
  if (str1.length !== str2.length) return false;

  const searchStr = `${str2}${str2}`;
  return !!searchStr.match(str1);
}

const expect = (str1: string, str2: string, exp: boolean) => {
  const res = isRotation(str1, str2);
  const pass = _.isEqual(res, exp);
  console.log({str1, str2, res, pass});
};

expect('a','a', true);
expect('omgwhat','whatomg', true);
expect('omgwhat','what0mg', false);
expect('waterbottle','erbottlewat', true);
