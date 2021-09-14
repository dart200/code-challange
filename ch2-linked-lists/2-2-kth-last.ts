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

const kthToLast = (list: NumList, k: number) => {
  if (!list.head)
    return undefined;

  let len = 0;
  mapList(list, () => len++);

  if (k > len)
    return undefined;

  const indexOfK = len - k;
  let i = 0
  let searchNode: NumNode;
  mapList(list, node => {
    if (i === indexOfK)
      searchNode = node;
    i++;
  });

  return searchNode!;
}

const test = (list: NumList, k: number) => {
  const res = kthToLast(list, k)
  console.log({list: list.toString(), k, res: res?.data});
};

test(new LinkedList<number>(1,2,3,4,5), 2);
test(new LinkedList<number>(1,2,3,4,5), 3);
test(new LinkedList<number>(1,2,3,4,5), 5);