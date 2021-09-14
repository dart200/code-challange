#!/usr/bin/env ts-node-script
/* eslint-disable no-cond-assign */

function dec2bin(dec) {
  return (dec >>> 0).toString(2);
}

const pairwiseSwap = (a: number) => {
  const oddMask = 0xAAAAAAAA;
  const evnMask = 0x55555555;
  
  const odds = a & oddMask;
  const evns = a & evnMask;

  return (odds >> 1) | (evns << 1);
};

const test = (a: number, ) => {
  const res = pairwiseSwap(a);
  console.log({a: dec2bin(a), res: dec2bin(res)});
};

test(1);
test(2);
test(1775);
console.log(pairwiseSwap(pairwiseSwap(1775)));