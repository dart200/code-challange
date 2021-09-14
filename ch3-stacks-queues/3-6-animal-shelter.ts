#!/usr/bin/env ts-node-script
/* eslint-disable no-cond-assign */

// 25 mins no testing

import {Node} from '../libList';

class Queue<T> {
  head: Node<T> | undefined;
  tail: Node<T> | undefined;

  add (data: T) {
    const node: Node<T> = {data};
    if (!this.tail) {
      this.head = this.tail = node;
    } else {
      this.tail.next = node;
    }
  };

  remove() {
    const node = this.head;

    const next = this.head?.next;
    this.head = next;
    if (!next) this.tail = undefined;

    return node;
  };
};

type AnimalType = 'cat' | 'dog'
interface Animal {
  type: AnimalType;
  inAt: number;
  name: string;
};

class AnimalShelter {
  private dogQueue = new Queue<Animal>();
  private catQueue = new Queue<Animal>();

  enqueue(type: AnimalType, name: string) {
    const data = {type, name, inAt: Date.now()}
    if (type === 'dog') {
      this.dogQueue.add(data);
    } else {
      this.catQueue.add(data);
    }
  };

  dequeue(type?: AnimalType) {
    if (type === 'dog') {
      return this.dogQueue.remove();
    } else if (type === 'cat') {
      return this.catQueue.remove();
    } else {
      if (!this.dogQueue.head)
        return this.catQueue.remove();
      if (!this.catQueue.head)
        return this.dogQueue.remove();

      if (this.dogQueue.head.data.inAt > this.catQueue.head.data.inAt)
        return this.dogQueue.remove();
      else
        return this.catQueue.remove();
    }
  };
}


