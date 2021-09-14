#!/usr/bin/env ts-node-script
/* eslint-disable no-cond-assign */

// 20 mins write

import {NumNode, NumGraph, rootGraph} from '../libGraph';

const successor = (node: NumNode) => {
  const [ , right] = node.children || [];
 
  const descend = (n: NumNode): NumNode => {
    const [l, ] = n.children || [];
    return l ? descend(l) : n;
  }
  if (right)
    return descend(right);

  const ascend = (n?: NumNode, last?: NumNode): NumNode | undefined => {
    if (!n) return undefined;

    if (n.data > last!.data)
      return n;

    return ascend(n.parent, last);
  }
  
  return ascend(node, node);
};

const test = (bTree: NumNode) => {
  const res = successor(bTree);
  console.log(res?.data);
};

// test({data: 0, children: []});
// test(rootGraph('1 > 0', '1 > 2'));

const r = rootGraph(
  '7 > 3', '7 > 9',
  '3 > 1', '3 > 5', '9 > 8',
  '1 > 0', '1 > 2', '5 > 4', '5 > 6',
);

const getStart = (node: NumNode): NumNode => 
  node.children?.length ? getStart(node.children[0]) : node;

let s: NumNode | undefined = getStart(r);

while (s) {
  console.log(s?.data);
  s = successor(s);
}
