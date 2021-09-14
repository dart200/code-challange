#!/usr/bin/env ts-node-script

import {Stack} from '../libList';

// 40 mins

class SizedStack<T> extends Stack<T> {
  size: number = 0;

  push(val: T) {
    this.size++;
    return super.push(val);
  };
  pop() {
    if (this.isEmpty()) return undefined;
    this.size--;
    return super.pop();
  };
  isEmpty() {
    return this.size === 0;
  };
}

class SetOfStacks<T> {
  stacks: SizedStack<T>[] = [];

  lastIndex() {return this.stacks.length-1}
  lastStack() {return this.stacks[this.lastIndex()]}
  limit: number;

  constructor(limit: number) {
    this.limit = limit;
  };

  isEmpty() {
    if (!this.stacks.length) 
      return true;
    else
      return this.stacks[0].isEmpty();
  }
  peek() {
    return this.lastStack().peek();
  };
  push(val: T) {
    const lastStk = this.lastStack();

    if (!lastStk || lastStk.size === this.limit) {
      const newStk: SizedStack<T> = new SizedStack();
      this.stacks.push(newStk);
      newStk.push(val);
    } else {
      lastStk.push(val);
    }
  };
  pop() {
    let ret = this.lastStack().pop();
    if (typeof ret === 'undefined') {
      this.stacks.pop();
      if (!this.stacks.length)
        return undefined;
      else
        return this.lastStack().pop();
    }

    return ret;
  };

  printSizes() {
    console.log(this.stacks.map(s => s.size).join(', '));
  };
};

const stacks = new SetOfStacks<number>(3);
const pushPrint = () => {
  const val = Math.floor(Math.random()*10);
  stacks.push(val);
  stacks.printSizes();
}

const popPrint = () => {
  stacks.pop();
  stacks.printSizes();
}

const n = 10;
for (let i = 0; i < n; i++)
  pushPrint();

const n2 = 11;
for (let i = 0; i < n2; i++)
  popPrint();
