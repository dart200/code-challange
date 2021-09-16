#!/usr/bin/env ts-node-script

// 25 mins

class Listy {
  arr: number[];
  constructor(arr) {this.arr = arr};
  elementAt(i) {return this.arr[i] ? this.arr[i] : -1};
};

const searchListy = (l: Listy, search: number) => {
  let i = 1;
  let highPoint: number
  let lowPoint: number;

  // exponential increase in amount searched
  do {
    const num = l.elementAt(i);
    if (num === search)
      return i;

    if (num < 0 || search < num) { // passed end of array, or search number
      highPoint = i;
      lowPoint = i/2;
      break;
    } 
    
    i *= 2;
  } while(true);

  // normal binary search on rest
  do {
    i = Math.floor((highPoint - lowPoint)/2) + lowPoint;
    const num = l.elementAt(i);

    if (num === search) // found
      return i;
    if (highPoint-lowPoint <= 1) // not found
      return undefined;

    if (num < 0 || search < num) { // recurse left
      highPoint = i;
    } else { // recurse right
      lowPoint = i;
    }
  } while (true);
};

const test4 = (arr: number[], search: number) => {
  const res = searchListy(new Listy(arr), search);
  console.log(arr, res);
};

test4([1,3,5,7,9,10], 5);
test4([1,3,5,7,9,10], 10);
test4([1,3,5,7,9,10], 17);
test4([1,3,5,7,9,10], 0);