#!/usr/bin/env ts-node-script
/* eslint-disable no-cond-assign */

function dec2bin(dec) {
  return (dec >>> 0).toString(2);
}

const countBits = (num: number) => {
  let shift = num;
  let count = 0;

  for (let i = 0; i < 32; i++) {
    const bit = shift & 1;
    count += bit;
    shift >>= 1;
  };

  return count;
}

const findNextBrute = (num: number, dir: 'inc'|'dec') => {
  const numBitCnt = countBits(num);
  let iter = num;

  do {
    if (iter <= 0) throw Error(`no next number found for num: ${num} dir: ${dir}`);

    if (dir === 'inc')
      iter += 1;
    else
      iter -= 1;

    const bitCnt = countBits(iter);
    if (bitCnt === numBitCnt)
      return iter;
  } while(true);
}

const getBit = (n: number) => (1 << n);
const clearBit = (n: number) => ~(1 << n);

const swapBits = (num: number, i: number, j: number) => {
  const high = (i > j) ? i : j;
  const low = (i < j) ? i : j;

  const diff = (high - low);
  const highBit = (num & getBit(high));
  const lowBit = (num & getBit(low));

  console.log(dec2bin(highBit), dec2bin(lowBit))

  return (num & clearBit(i) & clearBit(j)) | (highBit >> diff) | (lowBit << diff);
};

const findNextBits = (num: number, dir: 'inc'|'dec') => {
  let mask = 1;

  let swapA: number|undefined;
  let swapB: number|undefined;

  for (let i = 0; i < 32; i++) {
    const bit = num & mask;
    if (typeof swapA === 'undefined') {
      if (dir === 'dec' && !bit)
        swapA = i;
      if (dir === 'inc' && !bit) {
        if (i === 0) continue;
        swapA = i;
        swapB = i-1;
      }
    } else if (typeof swapB === 'undefined') {
      if (dir === 'dec' && bit)
        swapB = i;
    }

    if (swapA && swapB)
      break;

    mask <<= 1;
  };

  console.log({swapA, swapB});

  if (typeof swapA === 'undefined' || typeof swapB === 'undefined')
    throw Error('unable to find next');

  return swapBits(num, swapA, swapB)
};

const test = (num: number) => {
  const up = findNextBits(num, 'inc');
  const down = findNextBits(num, 'dec');
  console.log(up, num, down);
};

test(1775);
// test(42);