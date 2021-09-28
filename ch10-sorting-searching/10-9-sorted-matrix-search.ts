#!/usr/bin/env ts-node-script

// 40 mins

const matrixSearch = (matrix:number[][], search:number): [number, number]|undefined => {
  const numRows = matrix.length;
  const numCols = matrix[0].length;

  let low = 0;
  let high = numRows-1;

  let row: number;

  while(true) {
    row = low + Math.floor((high-low)/2);

    const  midStart = matrix[row][0];
    const midEnd = matrix[row][numCols-1];

    if (midStart === search)
      return [row, 0];
    if (midEnd === search)
      return [row, 0];

    // last row to search
    if (low === high) {
      if (search < midStart || midEnd < search)
        return undefined;
      else
        break;
    }

    if (search < midStart)
      high = row-1;
    else if (search > midEnd)
      low = row+1;
    else 
      break;
  };

  low = 0;
  high = numCols-1;

  while (true) {
    const col = low + Math.floor((high-low)/2);
    const mid = matrix[row][col];

    if (mid === search)
      return [row,col];

    if (low === high)
      return undefined;

    if (search < mid)
      high = col-1;
    else
      low = col+1;
  };
};

const m = [
  [3, 4, 7, 6, 9],
  [10, 11, 15, 17, 19],
  [21, 23, 24, 25, 26],
  [34, 35, 37, 38, 39],
];
console.log(matrixSearch(m, 1));