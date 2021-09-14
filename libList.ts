export type Node<T> = {
  data: T,
  next?: Node<T>,
};

export class LinkedList<T> {
  head?: Node<T>;

  constructor(...initData: T[]) {
    if (!initData.length) return;

    this.head = {data: initData.shift()!}
    let prevNode = this.head;
    initData.map(data => {
      const node = {data};
      prevNode.next = node;
      prevNode = node;
    });
  };

  map(iteratee: (data: T, index: number) => any) {
    if (!this.head) return;

    let i = 0;
    for (let node = this.head; true; node = node.next) {
      iteratee(node.data, i);
      i++;
      if (!node.next) break;
    };
  };

  push(data: T) {
    if (!this.head) {
      this.head = {data};
      return;
    }

    let node = this.head;
    while (node.next) {
      node = node.next;
    }

    node.next = {data};
  };

  toString(): string {
    const arr: T[] = [];
    this.map(data => arr.push(data));
    return arr.join(' -> ');
  };

  getAt(index: number) {

  }
};

export class Stack<T> {
  // not a real stack, but good enough for a practice problem interface
  private arr: T[] = [];

  push(val: T) {this.arr.push(val)};
  pop() {return this.arr.pop()};
  peek() {return this.arr[this.arr.length-1]};
  isEmpty() {return !this.arr.length};

  toString() {return this.arr.toString()}
};

export type NumList = LinkedList<number>;
export type NumStack = Stack<number>;
