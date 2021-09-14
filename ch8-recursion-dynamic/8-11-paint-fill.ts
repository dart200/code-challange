#!/usr/bin/env ts-node-script

type Color = {};
type Loc = {row: number, col: number};

const paintFill = (screen:Color[][], start: Loc, newColor: Color) => {
  const numRows = screen.length;
  const numCols = screen[0].length;
  const oldColor = screen[start.row][start.col];

  // edge case if we click pixel with same color
  if (oldColor === newColor)
    return;

  const recurseFill = (row: number, col: number) => {
    const recurseColor = screen[row][col];
    if (recurseColor !== oldColor)
      return;

    screen[row][col] = newColor;
    if (row > 0)
      recurseFill(row-1, col);
    if (row < numRows-1)
      recurseFill(row+1, col);
    if (col > 0)
      recurseFill(row, col-1);
    if (col < numCols-1)
      recurseFill(row, col+1);
  }

  recurseFill(start.row, start.col);
};