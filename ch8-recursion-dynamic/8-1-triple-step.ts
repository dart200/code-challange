#!/usr/bin/env ts-node-script

const lookupDict = {};

const countWays = (n: number) => {
  if (!n) return 0;

  for (let i = 0; i <= n; i++) {
    if (i === 1) lookupDict[i] = 1;
    else if (i === 2) lookupDict[i] = 2;
    else if (i === 3) lookupDict[i] = 4;
    else {
      lookupDict[i] = lookupDict[i-1] + lookupDict[i-2] + lookupDict[i-3]
    }

    if (i === n)
      return lookupDict[i];
  }
}

const test = (n: number) => {
  console.log(n, countWays(n));
};

test(1);
test(2);
test(3);
test(4);
test(10);
test(50);