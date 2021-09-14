#!/usr/bin/env ts-node-script
/* eslint-disable no-cond-assign */

// 30 mins

import {LinkedList, Node} from "../libList";

type NumList = LinkedList<number>;
type NumNode = Node<number>;
const numList = (...data: number[]) => new LinkedList<number>(...data);

// partitions list around value k
const isPalindrome = (list: NumList): boolean => {
  if (!list.head) return false;

  // forward iterator over list
  let n: NumNode | undefined = list.head;

  // used to build a single linked list in reverse,
  // the "next" node of the node we are adding in reverse
  let r: NumNode | undefined;
  
  do {
    r = {
      data: n.data,
      ...r && {next: r},
    }
  } while (n = n.next!);

  // reset forward iterator over list
  // reversed list iterator r stays where it is at 
  n = list.head;

  do {
    if (!r || !n)
      throw new Error ('Reversed list not the same length!?')
    if (n?.data !== r?.data)
      return false
    
    r = r?.next;
    n = n?.next;
  } while (r || n)
  
  return true;
};

const test = (list: NumList, exp: boolean) => {
  const res = isPalindrome(list);
  console.log({
    list: list.toString(),
    res,
    pass: exp === res,
  });
};

test(numList(1), true);
test(numList(1,2), false);
test(numList(1,2,1), true);
test(numList(1,2), false);
test(numList(1,2,2,1), true);
test(numList(1,2,2,1,3), false);
test(numList(3,1,2,2,1,3), true);
test(numList(4,3,1,2,2,1,3), false);
