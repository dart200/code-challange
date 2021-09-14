#!/usr/bin/env ts-node-script
/* eslint-disable no-cond-assign */

const diffNumBits = (a: number, b: number) => {
  let mask = 1;
  let cnt = 0;

  for (let i = 0; i < 32; i++) {
    if ((a & mask) !== (b & mask))
      cnt++;

    mask <<= 1;
  };

  return cnt;
};

const test = (a: number, b: number) => {
  const res = diffNumBits(a, b);
  console.log({a, b, res});
};

test(1,0);
test(29,15);
