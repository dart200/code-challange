#!/usr/bin/env ts-node-script
import * as _ from 'lodash'

type Matrix = string[][];
type MatrixPos = {row: number, col: number}


const zeroMatrix = (matrix: Matrix) => {
  const zeroMap: {[id: string]: true} = {};

  matrix.map((row, r) =>
    row.map((val, c) => {
      if (val === '0') {
        zeroMap[`row-${r}`] = true;
        zeroMap[`col-${c}`] = true;
      }
    })
  );

  _.map(zeroMap, (val, key) => {
    const [dir, num] = key.split('-');
    if (dir === 'row')
      matrix[num].fill('0');
    else
      matrix.map(row => row[num] = '0');
  });
};

const expect = (matrix: Matrix, exp: Matrix) => {
  const mtx = _.cloneDeep(matrix);
  zeroMatrix(matrix);
  const res = matrix;
  const pass = _.isEqual(res, exp);
  console.log({mtx, res, pass});
};

expect([
  ['0', '1'],
  ['2', '3'],
], [
  ['0', '0'],
  ['0', '3'],
]);

expect([
  ['1', '2' ,'3'],
  ['4', '0', '6'],
  ['7', '8', '9'],
], [
  ['1', '0' ,'3'],
  ['0', '0', '0'],
  ['7', '0', '9'],
]);

expect([
  ['A', 'B' ,'C', 'D'],
  ['E', '0', 'G', 'H'],
  ['I', 'J', 'K', 'L'],
  ['M', 'N', 'O', '0'],
], [
  ['A', '0' ,'C', '0'],
  ['0', '0', '0', '0'],
  ['I', '0', 'K', '0'],
  ['0', '0', '0', '0'],
]);