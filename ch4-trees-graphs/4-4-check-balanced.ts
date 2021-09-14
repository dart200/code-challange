#!/usr/bin/env ts-node-script
/* eslint-disable no-cond-assign */

//

import {NumNode, NumGraph} from '../libGraph';

const checkBalance = (root: NumNode) => {
  let balanced = true;

  const traverse = (node: NumNode) => {
    const [left, right] = node.children; // assumes binary
    const rightDepth = right ? traverse(right) : 0;
    const leftDepth = left ? traverse(left) : 0;

    if (Math.abs(rightDepth - leftDepth) > 1)
      balanced = false;

    return (rightDepth >= leftDepth) ? rightDepth+1 : leftDepth+1;
  }
  
  traverse(root);
  
  return balanced;
}

const test = (bTree: NumNode) => {
  const res = checkBalance(bTree);
  console.log(res);
};

test({data: 0, children: []});

const g1 = new NumGraph('0 > 1');
test(g1.nodes[0]);

const g2 = new NumGraph(
  '0 > 1', '0 > 2',
  '1 > 3', '1 > 4', '2 > 5', '2 > 6',
);
test(g2.nodes[0]);

const g3 = new NumGraph(
  '0 > 1', '0 > 2',
  '1 > 3', '1 > 4', '2 > 5', '2 > 6',
  '3 > 7',
  '7 > 8'
);
test(g3.nodes[0]);

const g4 = new NumGraph(
  '0 > 1', '1 > 2',
  '2 > 3', '4 > 4', '5 > 5', '6 > 6',
);
test(g4.nodes[0]);