

interface Edge { /* variables required to describe edge */ };
const fitsWith = (e1?: Edge, e2?: Edge): boolean => {};

interface Sides<T> {
  top?: T;
  left?: T;
  bot?: T;
  right?: T;
};

// edge not present if this piece is the side of a puzzle
type Edges = Sides<Edge>;

class PuzzlePiece {
  readonly edges: Edges;
  readonly connects: Sides<PuzzlePiece> = {};

  constructor(edges: Edges) {
    this.edges = edges;
  };

  tryConnect(other: PuzzlePiece) {
    if (fitsWith(this.edges.right, other.edges.left)) {
      this.connects.right = other;
      other.connects.left = this;
      return true;

    } else if (fitsWith(this.edges.left, other.edges.right)) {
      this.connects.left = other;
      other.connects.right = this;
      return true;

    } else if (fitsWith(this.edges.bot, other.edges.top)) {
      this.connects.bot = other;
      other.connects.top = this;
      return true;

    } else if (fitsWith(this.edges.top, other.edges.bot)) {
      this.connects.top = other;
      other.connects.bot = this;
      return true;
    }
    
    return false;
  };
};

class Puzzle {
  pieces: PuzzlePiece[];
  connectedPieces: number = 0;

  constructor(pieces: PuzzlePiece[]) {
    this.pieces = pieces;
  };

  findConnect(piece: PuzzlePiece, dir: keyof Sides<any>) {
    if (!piece.edges[dir])
      throw new Error('Asking for invalid edge?');
    // return if connection already exists
    if (piece.connects[dir])
      return piece.connects[dir]!;

    // loop over all pieces looking for connection
    for (const p of this.pieces) {
      if (p === piece)
        continue;
      if (piece.tryConnect(p))
        this.connectedPieces++;

      // break if we found the correct connection
      if (piece.connects[dir])
        return piece.connects[dir]!;
    }

    return piece.connects[dir]!;
  }

  solve() {
    // start with top-left
    let curPiece = this.pieces.find(p => !p.edges.top && !p.edges.left)!;
    let curDirection: 'left' | 'right' = 'right';
    do {
      if (!curPiece.edges[curDirection]) {
        if (!curPiece.edges['bot']) // done;
          break;

        curPiece = this.findConnect(curPiece, 'bot');

        if (curDirection === 'right')
          curDirection = 'left';
        else
          curDirection = 'right';
      } else {
        curPiece = this.findConnect(curPiece, curDirection);
      }
    // continue while cur Piece is not bottom right
    } while (true);
  };
};
