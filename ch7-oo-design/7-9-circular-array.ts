class CircularArray<T> implements Iterable<T> {
  arr: T[];
  size: number;
  headIndex: number;

  constructor(size: number) {
    this.size = 0;
    this.arr = Array.from({length: size});
    this.headIndex = 0;
  }

  private index(i: number) {
    return (this.headIndex + i) % this.arr.length
  }

  get(i: number): T|undefined {
    if (i >= this.arr.length)
      throw new Error('Out of bounds');

    return this.arr[this.index(i)]
  };

  set(i: number, val: T) {
    if (i >= this.arr.length)
      throw new Error('Out of bounds');

    this.arr[this.index(i)] = val;
  };

  rotateLeft() {
    this.headIndex++;
    if (this.headIndex === this.arr.length)
      this.headIndex = 0;
  };

  rotateRight() {
    this.headIndex--;
    if (this.headIndex < 0)
      this.headIndex = this.arr.length-1;
  };

  [Symbol.iterator]() {
    let i = 0;
    return {next: () => ({
      value: this.get(i++)!,
      done: (i === this.size) ? true : false,
    })};
  };
}