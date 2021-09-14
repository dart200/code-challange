#!/usr/bin/env ts-node-script
/* eslint-disable no-cond-assign */

import {NumNode, NumGraph} from '../libGraph';

// 35min write
// 45min with testing

const buildTree = (sortedArr: number[]): NumNode | undefined => {
  if (!sortedArr.length) return undefined;

  if (sortedArr.length === 1) {
    return {
      data: sortedArr[0],
      children: [],
    } as any;
  }

  const midPoint = Math.ceil(sortedArr.length/2)-1;
  const left = buildTree(sortedArr.slice(0, midPoint));
  const right = buildTree(sortedArr.slice(midPoint+1));

  return {
    data: sortedArr[midPoint],
    children: [
      ...left ? [left] : [],
      ...right ? [right] : [],
    ],
  } as any
};

const test = (sortedArr: number[]) => {
  const res = buildTree(sortedArr);
  console.log(JSON.stringify(res, null, 2));
};

test([0,1,2,3,4,5,6]);