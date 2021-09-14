#!/usr/bin/env ts-node-script
import * as _ from 'lodash'

const str = 'omg what a challenge';

// to easy:
// console.log(str.replace(/ /g, '%20'));
const res: string[] = [];

Array.from(str).forEach(c => {
  if (c === ' ')
    res.push('%', '2', '0');
  else
    res.push(c);
});

console.log(res.join(''));
