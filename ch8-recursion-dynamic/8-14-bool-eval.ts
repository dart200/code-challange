#!/usr/bin/env ts-node-script

const lookDict: {[id: string]: number} = {};

const countEvals = (str: string, desiredRes: boolean) => {

  const recurse = (s: string, res: 1|0): number => {    
    if (s.length <= 3)
      return eval(s) === res ? 1 : 0;
  
    let cnt = 0;
    for (let i = 1; i < s.length; i += 2) {
      const prevStr = s.slice(0, i); // previous slice
      const op = s.charAt(i);     // current operation
      const nextStr = s.slice(i+1);  // next slice

      // if (nextStr.length === 1)
      //   continue;

      const prevIs = (expected: 0|1) => recurse(prevStr, expected); 
      const nextIs = (expected: 0|1) => recurse(nextStr, expected);
    
  
      // 'xor' handling:
      if (op === '^') {
        if (res === 0)
          cnt += (prevIs(0) * nextIs(0))
              +  (prevIs(1) * nextIs(1));
        else
          cnt += (prevIs(1) * nextIs(0))
              +  (prevIs(0) * nextIs(1));
      
      // 'or' handling:
      } else if (op === '|') {
        if (res === 0) {
          cnt += prevIs(0) * nextIs(0);
        } else if (res === 1) {
          cnt += (prevIs(1) * (nextIs(0)+nextIs(1)))
              +  (prevIs(0) * nextIs(1));
        }

      // 'and' handling
      } else if (op === '&') {
        if (res === 0) {
          cnt += (prevIs(0) * (nextIs(0) + nextIs(1)));
              +  (prevIs(1) * nextIs(0));
        } else if (res === 1) {
          cnt += prevIs(1) * prevIs(1);
        }

      } else {
        throw Error('Invalid OP: '+op);
      }

    }

    return cnt;
  };

  return recurse(
    str.trim().replace(/[a-zA-Z2-9]+/g, ''),
    desiredRes ? 1 : 0
  );
}

const test14 = (str: string, desiredRes: boolean) => {
  const res = countEvals(str, desiredRes);
  console.log(str, res);
}

// test14('1^0', true);
// test14('1^0|0', true);
// test14('0|0|1', true);
test14('1^0|0|1', false);

// test14('0&0&0&1', true);
// test14('0&0&1', false);
// test14('0&0&0&1', false);

test14('0&0&0&1^1|0', true);
