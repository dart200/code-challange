#!/usr/bin/env ts-node-script
import {LinkedList, Node} from "../libList";

type NumList = LinkedList<number>;
type NumNode = Node<number>;

// partitions list around value k
const partitionList = (list: NumList, k: number) => {
  if (!list.head) return;

  let foundHigher = false;
  let prevNode: NumNode | undefined;
  let curNode: NumNode | undefined = list.head;
  do {
    const nextNode = curNode.next;
  
    if (curNode.data >= k) {
      foundHigher = true;
      prevNode = curNode;
    // if we have already found higher, remove node and prepend to front
    } else if (foundHigher)  {
      prevNode!.next = curNode.next;
      curNode.next = list.head;
      list.head = curNode;
    } else {
      prevNode = curNode;
    }
    
    curNode = nextNode;
  // eslint-disable-next-line no-cond-assign
  } while (curNode);
};

const test = (list: NumList, k: number) => {
  const pre = list.toString();
  partitionList(list, k);
  console.log({pre, k, post: list.toString()});
};

test(new LinkedList<number>(3,5,8,5,10,2,1), 5);
test(new LinkedList<number>(3,5,8,5,10,2,1), 10);
test(new LinkedList<number>(3,5,8,5,10,2,1), 7);
