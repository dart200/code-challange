#!/usr/bin/env ts-node-script
type Loc = {row: number, col: number};
interface Cell {
  b: Board;
  loc: Loc;
  blocked: boolean;
  invalid: boolean;
};

interface Board {
  size: number
  b: Cell[][];
};

const recurseCell = (cell: Cell) => {
  if (cell.blocked || cell.invalid) return false;

  const dLoc = {row: cell.loc.row+1, col: cell.loc.col};
  const dRes 
    = (dLoc.row < cell.b.size)
    && recurseCell(cell.b[dLoc.row][dLoc.col]);
    
  if (dRes) return true;

  const rLoc = {row: cell.loc.row, col: cell.loc.col+1};
  const rRes
    = (rLoc.col < cell.b.size)
    && recurseCell(cell.b[rLoc.row][rLoc.col]);

  if (rRes) return true;

  cell.invalid = true;
  return false;
};

const findPath = (board: Board) => {
  return recurseCell(board.b[0][0]);
};