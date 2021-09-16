#!/usr/bin/env ts-node-script

// 45 mins

const sortedMerge = (A: number[], bufLenA: number, B: number[]) => {
  if (bufLenA - B.length < 0)
    throw Error('array A is not long enough');

  const lenA = A.length;
  const lenB = B.length;

  // copy A far back enough to provide space for B
  let a  = B.length + A.length;
  for (let ai = A.length-1; ai >= 0; ai--) {
    a--;
    A[a] = A[ai];
  };

  console.log(A);

  // a should still be point to start of shifted A
  let b = 0;
  for (let i = 0; i < lenA + lenB; i++) {
    const pickA = () => {A[i] = A[a]; a++};
    const pickB = () => {A[i] = B[b]; b++};

    if (a >= lenA + lenB)
      pickB();
    else if (b >= lenB)
      pickA();
    else if (A[a] <= B[b])
      pickA();
    else
      pickB();
  }
};

const test1 = (A: number[], bufLenA: number, B: number[]) => {
  console.log(A, B);
  sortedMerge(A, bufLenA, B);
  console.log(A);
};

test1([0,2,4,6], 10, [1,5]);