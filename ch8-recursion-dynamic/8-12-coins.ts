#!/usr/bin/env ts-node-script

const memoDict: {[key: string]: number} = {};

const getMemoKey = (total: number, coinTypes: number[]) => {
  return String(total) + '-' + String(coinTypes.join('-'));
}

const numCoinPerms = (total: number, coinTypes: number[]) => {
  coinTypes.sort();

  // if only one coin type
  if (coinTypes.length === 1)
    return total % coinTypes[0] === 0 ? 1 : 0

  const key = getMemoKey(total, coinTypes);
  if (memoDict[key])
    return memoDict[key];

  const curCoin = coinTypes[0];
  let permCount = 0;
  for (let curCoinTotal = 0; curCoinTotal <= total; curCoinTotal+=curCoin) {
    if (curCoinTotal === total) {
      permCount++;
    } else {
      const left = total-curCoinTotal;
      permCount += numCoinPerms(left, coinTypes.slice(1));
    }
  }

  memoDict[key] = permCount;
  return permCount;
};

const test12 = (n: number) => {
  const res = numCoinPerms(n, [1, 5, 10, 25]);
  console.log(n, res);
};

test12(1000);
