#!/usr/bin/env ts-node-script
/* eslint-disable no-cond-assign */

// 50 mins

import {NumNode, NumGraph} from '../libGraph';

const graphBFS = (root: NumNode, iter: (numNode:NumNode) => any) => {
  const q: NumNode[] = [root];

  let node: NumNode | undefined;
  while (node = q.shift()) {
    if (iter) iter(node);
    q.push(...node.children.filter(
      n => !n.visited && (n.visited = true)
    ));
  };
}
 
const search = (g: NumGraph, node1: NumNode, node2: NumNode) => {
  g.resetVisited();
  
  let found = false;
  graphBFS(node1, n => {
    if (n === node2) found = true;
  });
  if (!found) {
    g.resetVisited();
    graphBFS(node2, n => {
      if (n === node1) found = true;
    });
  }

  return found;
};

const test = (g: NumGraph, num1: number, num2: number, exp: boolean) => {
  const node1 = g.nodes[num1];
  const node2 = g.nodes[num2];
  const res = search(g, node1, node2);
  console.log(res, res === exp ? 'pass' : 'fail');
};

const g1 = new NumGraph('0 > 1');
test(g1, 0, 1, true);
test(g1, 1, 0, true);

const g2 = new NumGraph('0 > 1', '2 > 3');
test(g2, 0, 1, true);
test(g2, 1, 2, false);

const g3 = new NumGraph(
  '0 > 5', '0 > 4', '1 > 0', '2 > 4', '2 > 3', '4 > 3', '4 > 1'
);
test(g3, 0, 2, true);
test(g3, 3, 5, false);
