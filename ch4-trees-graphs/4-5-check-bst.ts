#!/usr/bin/env ts-node-script
/* eslint-disable no-cond-assign */

//

import {NumNode, NumGraph, rootGraph} from '../libGraph';

const checkBST = (root: NumNode) => {
  let pass = true;
  let curNum: number | undefined;

  const traverse = (node: NumNode) => {
    if (node.children?.length && node.children?.length > 2)
      throw new Error('Not a binary tree');

    const [left, right] = node.children || [];
    if (left)
      traverse(left);
    
    console.log(node.data);

    if (typeof curNum === 'undefined')
      curNum = node.data;
    else if (node.data < curNum)
      pass = false;
    else
      curNum = node.data;

    if (right)
      traverse(right);
  };

  traverse(root);

  return pass;
};

const test = (bTree: NumNode) => {
  const res = checkBST(bTree);
  console.log(res);
};

// test({data: 0, children: []});

// test(rootGraph('1 > 0', '1 > 2'));

// test(rootGraph(
//   '0 > 1', '0 > 2',
//   '1 > 3', '1 > 4',
// ));

// test(rootGraph(
//   '5 > 3', '5 > 7',
//   '3 > 2', '3 > 4', '2 > 1', '1 > 0',
//   '7 > 6', '7 > 8'
// ));

// test(rootGraph(
//   '0 > 1', '1 > 2',
//   '2 > 3', '3 > 4', '4 > 5', '5 > 6',
// ));

test(rootGraph(
  '7 > 3', '7 > 9',
  '3 > 1', '3 > 5', '9 > 8',
  '1 > 0', '1 > 2', '5 > 4', '5 > 6',
));
