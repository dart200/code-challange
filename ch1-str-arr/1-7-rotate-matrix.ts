#!/usr/bin/env ts-node-script
import * as _ from 'lodash'

type Matrix = string[][];
type MatrixPos = {row: number, col: number}

const rotateSpot = (pos: MatrixPos, matrix: Matrix, recurseDepth: number) => {
  if (recurseDepth >= 4) return; // only 4 spots to recursively rotate;

  const n = matrix.length;
  const tmp = matrix[pos.row][pos.col];

  const newPos: MatrixPos = {
    row: pos.col,
    col: Math.abs(n-1 - pos.row),
  };

  console.log({tmp, pos, newPos});

  rotateSpot(newPos, matrix, recurseDepth+1);

  matrix[newPos.row][newPos.col] = tmp;
};

const rotateMatrix = (matrix: Matrix) => {
  const n = matrix.length;

  const rowStart = 0;
  const rowEnd = Math.floor(n/2);

  console.log({rowStart, rowEnd});

  for (let row = rowStart; row < rowEnd; row++) {
    const colStart = row;
    const colEnd = n-1-row;

    console.log({colStart, colEnd});
    for (let col = colStart; col < colEnd; col++) {
      rotateSpot({row, col}, matrix, 0);
    }
  }
};

const expect = (matrix: Matrix, exp: Matrix) => {
  const mtx = _.cloneDeep(matrix);
  rotateMatrix(matrix);
  const res = matrix;
  const pass = _.isEqual(res, exp);
  console.log({mtx, res, pass});
};

expect([
  ['a', 'b'],
  ['c', 'd'],
], [
  ['c', 'a'],
  ['d', 'b'],
]);

expect([
  ['a', 'b' ,'c'],
  ['1', '2', '3'],
  ['+', '-', '*'],
], [
  ['+', '1' ,'a'],
  ['-', '2', 'b'],
  ['*', '3', 'c'],
]);

expect([
  ['a', 'b' ,'c', 'd'],
  ['1', '2', '3', '4'],
  ['+', '-', '*', '/'],
  ['å', 'ß', '∂', 'ƒ'],
], [
  ['å', '+', '1' ,'a'],
  ['ß', '-', '2', 'b'],
  ['∂', '*', '3', 'c'],
  ['ƒ', '/', '4', 'd'],
]);