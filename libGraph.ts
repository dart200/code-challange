import * as _ from 'lodash';

export type Node<T> = {
  data: T,
  children?: Node<T>[],
  parent?: Node<T>, // only valid for binary trees
  visited?: boolean,
};

export type Tree<T> = {
  root: Node<T>,
}

export class Graph<T> {
  nodes: Node<T>[] = [];

  resetVisited() {
    this.nodes.map(n => n.visited = false);
  };
};

export function graphDFS<T> (root: Node<T>, iter?: (node: Node<T>) => any) {
  if (iter) iter(root);

  root.visited = true;
  root.children?.map(
    node => !node.visited && graphDFS(node, iter)
  );
};

export function graphBFS<T> (root: Node<T>, iter?: (node: Node<T>) => any) {
  const q: Node<T>[] = [root];

  let node: Node<T> | undefined;
  while (node = q.shift()) {
    if (iter)
      iter(node);
    if (node.children)
      q.push(...node.children.filter(n => !n.visited && (n.visited = true)));
  }
};

export type NumNode = Node<number>;
export class NumGraph extends Graph<number> {
  root: NumNode;

  constructor(...edges: string[]) {
    if (!edges.length) throw new Error('No edges?');

    super();

    const edgeError = (edge: string, msg?: string) => {
      throw new Error(edge + ' invalid ' + (msg ? (': '+msg) : ''));
    }

    let rootNum: string;
    const edgeMap: {[id: string]: string[]} = {};
    edges.map(edge => {
      const eSplit = edge.split(' ');
      if (eSplit.length !== 3) edgeError(edge);

      const [nodeNum, op, childNum] = eSplit;
      if (isNaN(Number(nodeNum)))
        edgeError(edge, nodeNum+' is not a number');
      if (op !== '>')
        edgeError(edge, op+' is an invalid op');
      if (isNaN(Number(childNum)))
        edgeError(edge, childNum+' is not a number');

      edgeMap[nodeNum] ??= [];
      edgeMap[nodeNum].push(edge);

      if (typeof rootNum === 'undefined')
        rootNum = nodeNum;
    });

    let rootNode: NumNode;
    const nodeMap: {[id: string]: NumNode} = {};
    _.map(edgeMap, (edges, nodeNum) => {
      const node = nodeMap[nodeNum] ??= {
        data: Number(nodeNum),
        children: [],
      };

      if (nodeNum === rootNum)
        rootNode = node;

      edges.map(edge => {
        const eSplit = edge.split(' ');
        const [ , , childNum] = eSplit;

        const child = nodeMap[childNum] ??= {
          data: Number(childNum),
          children: [],
        };

        child.parent = node;
        node.children ??= [];
        node.children.push(child);
      });
    });

    this.nodes = _.map(nodeMap, n => n);
    this.root = rootNode!;

    console.log(rootNum!);
  };
};

export const rootGraph = (...edges: string[]) => {
  return (new NumGraph(...edges)).root;
};
