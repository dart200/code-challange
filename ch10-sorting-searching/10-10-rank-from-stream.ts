#!/usr/bin/env ts-node-script
const trackDict = {};

const track = (num: number) => {
  if (!trackDict[num])
    trackDict[num] = 1;
  else
    trackDict[num]++;
};

const getRankOfNumber = (num: number) => {
  let cnt = 0;
  for (const n of Object.keys(trackDict).sort()) {
    if (Number(n) < num) {
      cnt += trackDict[n];
    }  else {
      return cnt;
    }
  }
};