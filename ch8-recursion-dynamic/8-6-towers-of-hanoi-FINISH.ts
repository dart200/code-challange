#!/usr/bin/env ts-node-script

interface Disk {
  size: number;
};

class TowersHanoi {
  stacks: Disk[][] = [[], [], []];

  constructor(n: number) {
    this.stacks[0] = Array.from({length: n}, (_, i) => ({size: i+1}))
  };

  solve() {
    
  };
};