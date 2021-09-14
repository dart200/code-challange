#!/usr/bin/env ts-node-script
/* eslint-disable no-cond-assign */

function dec2bin(dec) {
  return (dec >>> 0).toString(2);
};

const drawLine = (screen: number[], width: number, x1: number, x2: number, y: number) => {
  if (width % 8 !== 0) throw Error('width not divisible by 8');
  
  const rowStart = y * width;
  const bitStart = rowStart + x1;
  const bitEnd = rowStart + x2;

  for (let b = bitStart; b <= bitEnd; b++) {
    const cellNum = Math.floor(b / 8);
    const bitNum = b % 8;

    screen[cellNum] |= (1 << (8-bitNum-1))
  }
};

const test = (x1, x2, y) => {
  const scr = Array.from({length: 12}).map(() => 0);
  drawLine(scr, 8*4, x1, x2, y);


  console.log(scr.map(n => dec2bin(n)));
};

test(4,17,2);