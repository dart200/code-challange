#!/usr/bin/env ts-node-script
import * as fs from 'fs';

// 37 mins

const missingInt = (filepath: string) => {
  const stats = fs.statSync(filepath);
  const numInts = stats.size/4;

  const fd = fs.openSync(filepath, 'r');
  
  const intBuf = new Int32Array(3);
  let lowPnt = 0;
  let highPnt = numInts-1;
  let lowNum: number, midNum:number, highNum: number;
  do {
    const midPnt = lowPnt = Math.floor((highPnt-lowPnt)/2);

    fs.readSync(fd, intBuf, 0, 4, lowPnt);
    fs.readSync(fd, intBuf, 1, 4, midPnt);
    fs.readSync(fd, intBuf, 2, 4, highPnt);
    [lowNum, midNum, highNum] = intBuf;

    if (highPnt - lowPnt <= 1)
     break;

    const diffLow = midNum - lowNum;
    const diffHigh = highNum - midNum;

    const recurseLow = () => highPnt = midPnt;
    const recurseHigh = () => lowPnt = midPnt;

    if (diffLow > diffHigh)
      recurseLow();
    else 
      recurseHigh();
  } while (true);

  return lowNum+1;
};

