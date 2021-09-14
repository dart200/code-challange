#!/usr/bin/env ts-node-script
import {LinkedList, Node} from "../libList";

type NumList = LinkedList<number>;
type NumNode = Node<number>;

const mapList = (list: NumList, iteratee: (node: NumNode) => any) => {
  if (!list.head) return;

  let curNode: NumNode | undefined = list.head;
  do {
    iteratee(curNode);
  // eslint-disable-next-line no-cond-assign
  } while (curNode = curNode.next);
};

const deleteMidNode = (node: NumNode) => {
  if (!node.next) return undefined;

  node.data = node.next.data;
  node.next = node.next.next;

  return true;
}

const test = (list: NumList, delIndex: number) => {
  const pre = list.toString();

  // find mid node for test;
  let midNode;
  let i = 0;
  mapList(list, node => {
      if (i === delIndex) midNode = node;
      i++;
  });

  deleteMidNode(midNode);

  console.log({pre, delIndex, post: list.toString()});
};

test(new LinkedList<number>(1,2,3,4,5), 1);
test(new LinkedList<number>(1,2,3,4,5), 3);
