#!/usr/bin/env ts-node-script

interface Card {
  suit: 'heart' | 'diamond' | 'club' | 'spade'
  number: 'A' | 'K' | 'Q' | 'J' | '10' | '9'
};

abstract class Deck {
  cards: Card[];
  curCard: number = 0;

  constructor() { 
    this.cards = [] // initialized cards here
    this.shuffle();
  };

  shuffle() {};

  getNext(num: number): Card | Card[] {};
  getNumLeft() {};
};

class BackJack extends Deck {
  players: Card[][];
  curPlayer = 0;

  constructor(playesr: number) {
    super();
    this.players = [];
  } // 

  // reset game, redeal out to new players
  reset() {};

  hitPlayer(num) {};
  splitPlayer(num) {};
  checkPlayer(num) {};
}
