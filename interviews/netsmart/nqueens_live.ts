#!/usr/bin/env ts-node-script

const EMPTY = ' ';
const QUEEN = 'Q';
const ATTACKED = 'X';

let n = 4;

const board: string[][] = Array.from({length: n}, 
  () => Array.from({length: n}, () => EMPTY)
); 

const startPos = [0, 0];
let numQueens = 0;

const placeQueen = (rowPos: number, colPos: number) => {
  if (board[rowPos][colPos] === ATTACKED) return;

  // fills row
  board[rowPos].fill(ATTACKED);
  // fills colum
  board.map(row => row[colPos] = ATTACKED);
  // fills diagonal
  for(let j = -n; j < n; j++) {
    const attackRow = rowPos+j;
    const attackCol = colPos+j;
    if (attackRow < 0 || n <= attackRow) continue;
    if (attackCol < 0 || n <= attackCol) continue;

    board[attackRow][attackCol] = ATTACKED;
  }

  board[rowPos][colPos] = QUEEN;
  numQueens++;
};

do {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === EMPTY) placeQueen(i,j);
    }
  }

  if (numQueens !== n) {
    board.map(row => row.fill(EMPTY));
    
  }
} while(numQueens !== n)

console.log(board);
