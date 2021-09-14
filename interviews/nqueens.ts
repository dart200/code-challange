#!/usr/bin/env ts-node-script

const EMPTY = ' ';
const QUEEN = 'Q';
const ATTACKED = 'X';

let n = 4;

const board: string[][] = Array.from({length: n}, 
  () => Array.from({length: n}, () => EMPTY)
); 

const mapAll = (iteratee: (row: number, col: number) => any) => {
  board.forEach((row, r) => row.forEach((col, c) => iteratee(r, c)))
};

const resetBoard = () => mapAll((r, c) => board[r][c] = EMPTY);

let numQueens = 0;
const placeQueen = (rowPos: number, colPos: number) => {
  if (board[rowPos][colPos] === ATTACKED) return;

  const attackPos = (r, c) => {
    if (board[r][c] !== EMPTY) return;
    board[r][c] = ATTACKED;
  }

  // fills row/cols
  mapAll((r, c) => {
    if ((r === rowPos || c === colPos))
      attackPos(r,c);
  });

  // fills diagonal
  for(let j = -n; j < n; j++) {
    const atkRow1 = rowPos+j;
    const atkCol1 = colPos+j;
    if (0 <= atkRow1 && atkRow1 < n && 0 <= atkCol1 && atkCol1 < n)
      attackPos(atkRow1, atkCol1);

    const atkRow2 = rowPos-j;
    const atkCol2 = colPos+j;
    if (0 <= atkRow2 && atkRow2 < n && 0 <= atkCol2 && atkCol2 < n)
      attackPos(atkRow2, atkCol2);
  }

  board[rowPos][colPos] = QUEEN;
  numQueens++;
};

const checkStartPos = (rowPos, colPos) => {
  placeQueen(rowPos, colPos);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === EMPTY) placeQueen(i,j);
    }
  }
  
  if (numQueens === n)
    return true;
  else
    return false;
};

// only need to check first row
for (let startCol = 0; startCol < n ; startCol++) {
  const startRow = 0;
  const solution = checkStartPos(startRow, startCol);

  console.log({startCol, startRow, solution, board})

  numQueens = 0;
  resetBoard();
}