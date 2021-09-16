#!/usr/bin/env ts-node-script

// 60 mins

const binarySearchRotated = (arr: number[], num: number) => {
  let lowPoint = 0;
  let highPoint = arr.length-1;

  do {
    const midPoint = lowPoint+Math.floor((highPoint-lowPoint) / 2);
    console.log({lowPoint, midPoint, highPoint});

    const midNum = arr[midPoint];
    if (midNum === num)
      return midPoint;

    const lowNum = arr[lowPoint];
    if (lowNum === num)
      return lowPoint;

    const highNum = arr[highPoint];
    if (highNum === num)
      return highPoint;
    
    // if there is no array left to search ... return undefined for not found
    if (Math.abs(midPoint-lowPoint) <= 1
      && Math.abs(highPoint-midPoint) <= 1)
      return undefined

    const recurseLeft = () => {
      lowPoint = lowPoint+1;
      highPoint = midPoint-1;
    };
    const recurseRight = () => {
      highPoint = highPoint-1;
      lowPoint = midPoint+1;
    };

    // should be to the left
    if (num < midNum) {
      if (highNum < midNum && num < midNum)
        recurseRight();
      else
        recurseLeft();
    // num > midNum -- should be to the right
    } else {
      if (lowNum > midNum && num > lowNum)
        recurseLeft();
      else // if (highNum < midNum) {
        recurseRight();
    }

  } while(true);
};

const test3 = (arr: number[], num: number) => {
  const res = binarySearchRotated(arr, num);
  console.log({arr, num, res});
};

const testArr1 = [10,12,13,14,15, 16,1,2,3,4, 5,6,7,8,9];
test3(testArr1, 1);

// const testArr2 = [16,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
