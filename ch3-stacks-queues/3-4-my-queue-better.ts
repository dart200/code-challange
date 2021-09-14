#!/usr/bin/env ts-node-script

// 30 mins

import {Stack} from '../libList';

class MyQueue<T> {
  pushStack = new Stack<T>();
  popStack = new Stack<T>();

  private checkAndShift() {
    if (this.popStack.isEmpty()) {
      while (!this.pushStack.isEmpty())
        this.popStack.push(this.pushStack.pop()!);
    }
  }

  isEmpty() {
    return this.pushStack.isEmpty() && this.popStack.isEmpty();
  };
  add(val: T) {
    this.pushStack.push(val);
  };
  remove() {
    this.checkAndShift();
    return this.popStack.pop();
  };
  peek() {
    this.checkAndShift()
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
console.log(q.remove());
console.log(q.remove());
q.print();
