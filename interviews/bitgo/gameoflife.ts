/* game-of-life.js
 *
 * This is an implementation of Conway's Game of Life.
 * Rules:
 *   1. Any live cell with two or three live neighbours survives.
 *   2. Any dead cell with three live neighbours becomes a live cell.
 *   3. Any other cell dies.
 */

const board = [
  0, 0, 0, 0, 0,
  0, 0, 1, 0, 0,
  0, 0, 1, 0, 0,
  0, 0, 1, 0, 0,
  0, 0, 0, 0, 0,
]

const nextBoard = [
  0, 0, 0, 0, 0,
  0, 0, 0, 0, 0,
  0, 1, 1, 1, 0,
  0, 0, 0, 0, 0,
  0, 0, 0, 0, 0,
]

// Print out the current state of the board, using spaces (' ') for dead cells and asteriks ('*') for live cells.
const printBoard = (b, rowLen) => {
  for(let i = 0; i < b.length; i+=rowLen) {
    const slice = b.slice(i, i+rowLen);
    console.log(slice.map(cell => cell ? '*' : ' ').join(' '));
  }
};

const evaluateRules = (b, rowLen) => {    
  const checkCell = (checkI, curI) => (
       checkI < 0 
    || checkI >= b.length 
    || Math.abs(checkI%rowLen - curI%rowLen) > 1
  ) ? 0 : b[checkI];
  
  const relavtive = [0-rowLen-1, 0-rowLen, 0-rowLen+1, -1, 1,rowLen-1, rowLen, rowLen+1];
  
  return b.map((cell, i) => {
    const count = relavtive.reduce(
      (acc, relativeIdx) => acc + checkCell(i+relativeIdx, i)
    , 0);
    
    if (cell && (count === 2 || count === 3))
      return 1;
    else if (!cell && (count === 3))
      return 1;
    else
      return 0;
  });
}

const testBoard = [
  0, 1, 1, 1, 0,
  1, 0, 0, 0, 1,
  1, 0, 0, 0, 1,
  1, 0, 0, 0, 1,
  0, 1, 1, 1, 0,
]

printBoard(testBoard, 5)
printBoard(evaluateRules(testBoard, 5), 5)
