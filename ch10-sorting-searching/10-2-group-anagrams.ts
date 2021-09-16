#!/usr/bin/env ts-node-script

// 25 mins

const anagramKeys: {[id: string]: string} = {};

const genAnagramKey = (s: string) => {
  return s.split('').sort().join('');
};

const groupAnagrams = (arr: string[]) => {
  arr.sort((a, b) => {
    const keyA = (anagramKeys[a] ??= genAnagramKey(a));
    const keyB = (anagramKeys[b] ??= genAnagramKey(b));

    return keyA.localeCompare(keyB);
  })
};

const test2 = (arr: string[]) => {
  console.log(arr);
  groupAnagrams(arr);
  console.log(arr);
};

test2([
  'what', 'at', 'ben', 'a', 'neb', 'athw', 'aathw', 'ta', 'ebn',
]);