type Color = 'black'|'white';
class Token {
  color: Color;

  constructor(init: Color) {this.color = init}

  // flip token color
  flip() {};
};

class Orthello {
  size: number = 8;
  board: (Token | undefined)[][];

  constructor() {
    this.board = Array.from({length: this.size}, () => []);
    // init board state
  };

  // start the game
  startGame() {};

  // checks if a placement is valid for a particular color
  isValidPlace(color: Color, row: number, col: number) {};

  // does a valid move even exist for a placer
  validMoveExists(color: Color) {};

  // player places a token at a row column
  placeToken(row: number, col: number) {};

  // end the game, count tokens, display winner
  gameEnd() {}; // display winner
};