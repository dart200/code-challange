#!/usr/bin/env ts-node-script

// 30 mins

import {Stack} from '../libList';

class MyQueue<T> {
  pushStack = new Stack<T>();
  popStack = new Stack<T>();

  private moveDataTo(dest: 'push' | 'pop') {
    const [fromStack, toStack] 
      = (dest === 'push') ? [this.popStack, this.pushStack]
      : [this.pushStack, this.popStack];

    if (fromStack.isEmpty())
      return;

    let val: T | undefined;
    // eslint-disable-next-line no-cond-assign
    while (val = fromStack.pop()) {
      toStack.push(val);
    }
  }

  isEmpty() {
    return this.pushStack.isEmpty() && this.popStack.isEmpty();
  };
  add(val: T) {
    this.moveDataTo('push');
    this.pushStack.push(val);
  };
  remove() {
    this.moveDataTo('pop');
    return this.popStack.pop();
  };
  peek() {
    this.moveDataTo('pop');
    return this.popStack.peek();
  };

  print() {
    console.log({
      push: this.pushStack.toString(),
      pop: this.popStack.toString(),
    });
  };
};

const q = new MyQueue<number>();
q.add(1);
q.print();

console.log(q.peek());
q.print();

q.add(2);
q.print();

q.add(3);
q.print();

console.log(q.remove());
console.log(q.remove());
q.print();

q.add(4);
q.print();
