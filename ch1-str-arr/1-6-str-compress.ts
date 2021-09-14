#!/usr/bin/env ts-node-script
import * as _ from 'lodash'

const strCompress = (str: string) => {
  const arr = Array.from(str);
  const resArr: string[] = [];
  
  const lastItr = arr.reduce((prev, c, i) => {
    if (!prev.c || prev.c === c)
      return {cnt: prev.cnt+1, c};

    resArr.push(prev.c, String(prev.cnt));
    return {cnt:1, c};
  }, {cnt: 0, c: ''});

  resArr.push(lastItr.c, String(lastItr.cnt));

  const resStr = resArr.join('');

  return resStr.length < str.length ? resStr : str;
}

const expect = (str, expected) => {
  const res = strCompress(str);
  const pass = res === expected;
  console.log({str, res, pass});
}

expect('a', 'a');
expect('abb', 'abb');
expect('abbccc', 'abbccc');
expect('abbcccc', 'a1b2c4');
expect('aabcccccaaa', 'a2b1c5a3');