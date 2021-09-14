#!/usr/bin/env ts-node-script
import {LinkedList, Node} from "../libList";

const deleteDups = (list: LinkedList<number>) => {
  if (!list.head) return;

  const found = {};

  let node: Node<number> | undefined;
  let prevNode: Node<number> | undefined;
  do {
    node = node ? node.next! : list.head;
    
    // remove node
    if (found[node.data]) {
      if (prevNode)
        prevNode.next = node.next
    } else {
      found[node.data] = true;
      prevNode = node;
    }

  } while (node.next)
}

const test = (list: LinkedList<number>) => {
  const pre = list.toString();
  deleteDups(list);list
  const post = list.toString();
  console.log({pre, post});
};

test(new LinkedList(3, 3, 2, 2, 5, 5));
test(new LinkedList(4, 4, 4, 4, 5, 5));
test(new LinkedList(4, 4, 4, 4, 5, 4, 5, 6, 5, 4, 6));