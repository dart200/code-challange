#!/usr/bin/env ts-node-script
/* eslint-disable no-cond-assign */

import {LinkedList} from '../libList';
import {NumNode, NumGraph} from '../libGraph';

// 20 mins
// 25 with tests

class NodeList extends LinkedList<NumNode> {};

const buildDepths = (root: NumNode) => {
  const lists: NodeList[] = [];

  const traverse = (node: NumNode, depth: number) => {
    const list = lists[depth] ??= new NodeList();
    list.push(node);
    
    node.children.map(n => traverse(n, depth+1));
  };

  traverse(root, 0);

  return lists;
};

const test = (bTree: NumNode) => {
  const res = buildDepths(bTree);

  res.map(list => {
    const nums: number[] = [];
    list.map(node => nums.push(node.data));
    console.log(nums.join(','));
  });

  console.log('');
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