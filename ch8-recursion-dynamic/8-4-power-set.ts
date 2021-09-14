#!/usr/bin/env ts-node-script

const calcPowerSet = (set: number[]) => {
  const pSet: number[][] = [];

  for(const elm of set) {
    const newSets = pSet.map(s => s.concat([elm]));
    pSet.push(...newSets, [elm]);
  };

  return pSet;
};

const test = (set: number[]) => {
  const dict: {[id: string]: number[][]} = {};
  const pSet = calcPowerSet(set);

  for (const s of pSet) {
    const len = s.length;
    dict[len] ??= [];
    dict[len].push(s);
  };

  Object.keys(dict).sort().forEach(k => {
    console.log(dict[k]);
  });
}

test([1,2,3,4,5,6]);
