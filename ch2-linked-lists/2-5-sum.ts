#!/usr/bin/env ts-node-script
import {LinkedList, Node} from "../libList";

type NumList = LinkedList<number>;
type NumNode = Node<number>;
const numList = (...data: number[]) => new LinkedList<number>(...data);

// partitions list around value k
const sumList = (list1: NumList, list2: NumList): NumList => {
  const sum = new LinkedList<number>();

  let n1 = list1.head;
  let n2 = list2.head;
  let sPos = sum.head;
  let carryOver = 0;

  do {
    let digitSum = carryOver;

    if (n1) {
      digitSum += n1.data;
      n1 = n1.next;
    }

    if (n2) {
      digitSum += n2.data;
      n2 = n2.next;
    }

    let digit = digitSum % 10;
    carryOver = Math.floor(digitSum / 10);

    if (!sPos) {
      sum.head = {data: digit};
      sPos = sum.head;
    } else {
      sPos.next = {data: digit};
      sPos = sPos.next;
    }

  } while (n1 || n2 || carryOver)

  return sum
};

const test = (list1: NumList, list2: NumList) => {
  const sum = sumList(list1, list2);
  console.log({
    list1: list1.toString(),
    list2: list2.toString(),
    sum: sum.toString(),
  });
};

test(numList(1),numList(4));
test(numList(6),numList(9));
test(numList(7,1,6),numList(5,9,2));
test(numList(7,1,6),numList(5,9,3));