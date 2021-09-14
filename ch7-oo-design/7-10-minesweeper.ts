#!/usr/bin/env ts-node-script

import * as readline from 'readline';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getLine = (): Promise<string> => new Promise(resolve => {
  rl.on('line', line => resolve(line));
});

type Loc = {row: number, col: number};
class Cell{
  game: Minesweeper;
  loc: Loc;
  bomb: boolean = false;
  num: number = 0;
  hidden = true;
  flagged: boolean = false;

  constructor(g:Minesweeper, row:number, col:number) {
    this.game = g;
    this.loc = {row, col};
  };

  onSurroundingCells(func: (row:number, col:number) => any) {
    for (let r = this.loc.row-1; r <= this.loc.row+1; r++)
      for (let c = this.loc.col-1; c <= this.loc.col+1; c++) {
        if (r < 0 || this.game.size <= r) continue;
        if (c < 0 || this.game.size <= c) continue;
        if (r === this.loc.row && c === this.loc.col) continue;
        func(r,c);
      }
  };

  getSymbol() {
    if (this.game.state !== 'play' && this.bomb)
      return '*';
    if (this.flagged)
      return 'F';
    // if (this.hidden)
    //   return '?';
    if (!this.hidden && this.num)
      return String(this.num);
    if (!this.hidden && this.num === 0)
      return ' ';
    
    return '?';
  };
};

type GameState = 'play' | 'fail' | 'win';
class Minesweeper {
  size: number;
  numMines: number;
  board: Cell[][];
  state: GameState;

  constructor(size:number, numMines:number) {
    this.size = size;
    this.numMines = numMines;
    this.board = [[]];
    this.state = 'play';
    this.reset();
  };

  flagCell(row:number, col:number) {
    const cell = this.board[row][col];
    cell.flagged = !cell.flagged;
  };

  clickCell(row:number, col:number) {
    const cell = this.board[row][col];
    if (!cell.hidden) return; //already clicked

    if (cell.bomb)
      this.state = 'fail';
    else  
      cell.hidden = false;

    if (!cell.bomb && !cell.num)
      cell.onSurroundingCells(
        (r,c) => this.clickCell(r,c)
      );
  };

  reset() {
    this.board = Array
      .from({length: this.size})
      .map((_,r) => Array.from({length: this.size}, (_,c) => new Cell(this,r,c)));
    this.state = 'play';

    // generate mines
    for (let numPlaced = 0; numPlaced < this.numMines; ) {
      //even number generation
      const genNum = () => Math.floor(Math.random() * this.size);
      const row = genNum();
      const col = genNum();
      const cell = this.board[row][col];
      if (cell.bomb) continue;
      
      cell.bomb = true;
      cell.onSurroundingCells((r, c) => this.board[r][c].num++);
      numPlaced++;
    };
  };

  printScreen() {
    const str = this.board.map(
      row => row.map(cell => cell.getSymbol()).join('|')
    ).join('\n');

    console.log(str);
  };

  hasWon() {
    let won = true;
    this.board.forEach(
      row => row.forEach(cell => {
        if (cell.hidden && !cell.bomb) won = false;
      }),
    );

    if (won)
      this.state = 'win';
  };

  async run() {
    do {
      this.printScreen();
      console.log('enter move: row, column');
      const line = await getLine();
      const [row,col] = line.split(',').map(s => s.trim());
      this.clickCell(Number(row),Number(col));
      this.hasWon();
    } while (this.state === 'play');

    if (this.state === 'win')
      console.log('success!');
    else
      console.log('fail!');

    this.printScreen();
  };
};

const game = new Minesweeper(10, 10);
void game.run();