#!/usr/bin/env ts-node-script

const multiply = (n: number, m: number) => {
  let res = 0;
  let nShift = n;
  let mask = 1;

  for (let i = 0; i < 32; i++) {
    if (mask & m) res += nShift;

    mask <<= 1;
    nShift <<= 1;
  };

  return res;
};

const test = (n: number, m: number) => {
  const res = multiply(n,m);
  console.log(n ,'*', m, '=', res);
};

test(7, 2);
test(256, 2);
test(1775, 21);
