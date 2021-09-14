#!/usr/bin/env ts-node-script

class Box {
  height: number;
  width: number;
  depth: number;

  constructor(height: number, width: number, depth: number) {
    this.height = height;
    this.width = width;
    this.depth = depth;
  };
}

const getBoxKey = (b: Box) => `${b.height}-${b.width}-${b.depth}`;
const boxLookup: {[k: string]: number} = {};

const stackRecurse = (box: Box, boxes: Box[]): number => {
  const boxKey = getBoxKey(box);
  if (boxLookup[boxKey])
    return boxLookup[boxKey];

  let maxHeight = box.height;
  for (const curBox of boxes) {
    if (box.height <= curBox.height
      || box.width <= curBox.width
      || box.depth <= curBox.depth)
      continue;

    const possibleMax = box.height + stackRecurse(curBox, boxes);
    if (possibleMax > maxHeight)
      maxHeight = possibleMax;
  }

  return maxHeight;
};

const findLargestStack = (boxes: Box[]) => {
  // not important
  boxes.sort((a, b) => b.height-a.height);

  return stackRecurse(boxes[0], boxes);
};

const largest = findLargestStack([
  new Box(20, 20, 20),
  new Box(18, 6, 6),
  new Box(12, 11, 11),
  new Box(10, 10, 10),
  new Box(5, 5, 5,),
]);

console.log({largest});
