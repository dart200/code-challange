#!/usr/bin/env ts-node-script
/* eslint-disable no-cond-assign */

function dec2bin(dec) {
  return (dec >>> 0).toString(2);
}

const findLongest = (num: number) => {
  let shift = num;
  let longest: number|undefined = undefined;
  let lastRun: number|undefined = undefined;
  let curRun: number|undefined = undefined;
  
  // process 32 bit ints.
  // 32nd time is for processing the last 0 if the rest of the bits are 1
  for(let i = 0; i < 33; i++) {
    const bit = (i<32) ? (shift & 1) : 0;

    // found 1
    if (bit) {
      if (!curRun)
        curRun = 1;
      else
        curRun = curRun + 1;

    // found 0
    } else {
      if (typeof lastRun === 'number') {
        const len = (curRun||0) + (lastRun||0) + 1;
        if (!longest || (len > longest))
          longest = len;
      }

      if (!curRun)
        lastRun = 0;
      else 
        lastRun = curRun;

      curRun = 0;
    }

    shift = shift >> 1;
  }

  return longest;
};

const test = (num: number) => {
  const res = findLongest(num);
  console.log(dec2bin(num), res)
};

test(1775);
test(0);
test(1);
test(-5);