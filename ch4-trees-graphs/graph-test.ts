#!/usr/bin/env ts-node-script
/* eslint-disable no-cond-assign */

import {NumNode, NumGraph, graphDFS, graphBFS} from '../libGraph';

const graph = new NumGraph(
  '0 > 1', '0 > 4', '0 > 5',
  '1 > 3', '1 > 4',
  '2 > 1',
  '3 > 2', '3 > 4',
);

const root = graph.nodes[0];

console.log('DFS:');
graphDFS(root, (node => console.log(node.data)));

graph.resetVisited();
console.log('BFS');
graphBFS(root, (node => console.log(node.data)));
