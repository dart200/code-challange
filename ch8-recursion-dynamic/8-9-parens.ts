#!/usr/bin/env ts-node-script

type ParenSet = {[id:string]: true};
const permDict: {[id:number]: ParenSet} = {}

const recurseParen = (n:number): ParenSet => {
  if (n === 1)
    return {'()': true};
  if (permDict[n])
    return permDict[n];

  const permSet: ParenSet = {};
  const res = recurseParen(n-1);
  Object.keys(res).forEach(k => {
    permSet['()'+k] = true;
    permSet[k+'()'] = true;
    permSet['('+k+')'] = true;
  });

  return permSet;
};

const parenPermutation = (n:number) => {
  return Object.keys(recurseParen(n));
};

const test9 = (n:number) => { 
  const perms = parenPermutation(n);
  console.log({n, perms});
};

test9(1);
test9(2);
test9(3);
test9(4);

