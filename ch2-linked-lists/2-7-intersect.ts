#!/usr/bin/env ts-node-script
/* eslint-disable no-cond-assign */

// 30 mins

import * as _ from 'lodash';
import {LinkedList, Node} from "../libList";

type NumList = LinkedList<number>;
type NumNode = Node<number>;
const numList = (...data: number[]) => new LinkedList<number>(...data);

const mapList = (list: NumList, iter: (node: NumNode) => any) => {
  if (!list.head) return;

  let n: NumNode | undefined = list.head;
  do {
    if (n) iter(n);
    n = n?.next;
  } while (n);
}

// partitions list around value k
const intersection = (list1: NumList, list2: NumList): boolean | NumNode => {
  const objectMap = new WeakMap();

  mapList(list1, n => objectMap.set(n, true))

  let found: boolean | NumNode = false;
  mapList(list2,
    n => objectMap.get(n) && !found && (found = n)
  );

  return found;
};

const test = (list1: NumList, list2: NumList, exp: boolean | NumNode) => {
  const res = intersection(list1, list2);
  console.log({
    list1: list1.toString(),
    list2: list2.toString(),
    res,
    pass: exp === res,
  });
};

// build intersection:
const l1 = numList(1,2,3,4,5,6,7,8,9,10);
const l2 = numList(5,3,1);

const intersectNode = l1.head!.next!.next!.next!.next!.next!.next;
l2.head!.next!.next!.next = intersectNode;

test(l1, l2, intersectNode!);
test(numList(1,2,3,4,5,6,7,8,9,10), numList(5,3,1), false);
