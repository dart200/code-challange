#!/usr/bin/env ts-node-script
/* eslint-disable no-cond-assign */

// 55 mins with testing

import {Stack} from '../libList';

function sortStack(minStack: Stack<number>){
  if (minStack.isEmpty()) return;

  const tmpStack = new Stack<number>();
  let curVal: number | undefined;

  // find total size
  let size = 0;
  while (curVal = minStack.pop()) {
    tmpStack.push(curVal);
    size++;
  }

  for (let numSorted = 0; numSorted < size; numSorted++){    
    // reset from tmpStack -> minStack if this is an iteration
    while (curVal = tmpStack.pop()) {
      minStack.push(curVal);
    }

    // push from minStack -> tmpStack, up until the point of already being sorted,
    // searching for the maxVal to push to the minStack;
    let maxVal: number | undefined;
    for(let numSearched = 0; numSearched < (size - numSorted); numSearched++) {
      curVal = minStack.pop();

      if (typeof curVal === 'undefined')
        throw new Error('Undefined CurVal?')

      if (typeof maxVal === 'undefined') {
        maxVal = curVal
      } else if (curVal > maxVal) {
        tmpStack.push(maxVal);
        maxVal = curVal
      } else {
        tmpStack.push(curVal);
      }
    };

    // push found maxVal to minStack, make it topSortedVal
    minStack.push(maxVal!);
  }
};

const s0 = new Stack<number>();
s0.push(1);
console.log(s0.toString());
sortStack(s0);
console.log(s0.toString());

const s1 = new Stack<number>();
s1.push(1);
s1.push(3);
s1.push(1);
s1.push(4);
s1.push(2);
s1.push(3);
console.log(s1.toString());

sortStack(s1);
console.log(s1.toString());
