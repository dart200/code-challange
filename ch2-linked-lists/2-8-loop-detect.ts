#!/usr/bin/env ts-node-script
/* eslint-disable no-cond-assign */

// 15 mins with hash table

import {LinkedList, Node} from "../libList";

type NumList = LinkedList<number>;
type NumNode = Node<number>;
const numList = (...data: number[]) => new LinkedList<number>(...data);

// done with hash table
// technically O(n) time/space
const hasLoop = (list: NumList): boolean | NumNode=> {
  const objMap = new WeakMap();

  let n = list.head;
  while (n) {
    if (objMap.get(n))
      return n;

    objMap.set(n, true);
    n = n.next;
  };

  return false;
};

const detectLoop = (list: NumList): false | NumNode => {
  if (!list?.head?.next) return false;

  let slowN: NumNode = list.head;
  let fastN: NumNode | undefined = list.head;

  do {
    slowN = slowN.next!;
    fastN = fastN?.next?.next;

    if (!fastN)
      return false;
  } while (slowN !== fastN)

  return slowN;
};

// done with iteration
// O(n) time, O(1) space
const findLoopStart = (list: NumList): false | NumNode => {
  let collIter = detectLoop(list);
  if (collIter === false) return false;

  let startIter = list.head;
  while (collIter !== startIter) {
    collIter = collIter.next!;
    startIter = startIter!.next!;
  };
  
  return collIter;
};

const test = (list: NumList, exp: false | NumNode) => {
  const res = findLoopStart(list);
  console.log(res === exp ? 'pass' : 'false', ' - ', res);
};

test(numList(1,3,5,7,9), false);

const loopList = numList(1,3,5,7,6,7,8);
const loopNode = loopList.head!.next!.next!.next!;
loopList.head!.next!.next!.next!.next!.next!.next!.next = loopNode;

test(loopList, loopNode);
