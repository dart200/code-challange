// Say I have a bunch of coins in my pocket, which we can represent as an array like so:

// Input:
// [1,5,5,5]
// Output:
// [0,1,5,6,10,11]

// What are the unique sums of money that I might get if I just randomly grab some coins from my pocket

// k coins => 1, 2, ..., 2^k

const findSums = (coins: number[]) => {
  const sums = {0: true};
  
  const findSubsets = (set: number[], len: number) => {
    if (len === 1) return set.map(c => [c]);
    
    const subsets = [];
 
    set.forEach((c,i) => {
      const subsubsets = findSubsets(set.slice(0,i).concat(set.slice(i+1)), len-1);
      subsubsets.forEach(s => subsets.push([c, ...s]));
    });
    
    return subsets;
  };
  
  for (let n = 1; n <= coins.length; n++) {
    const subsets = findSubsets(coins, n);
    subsets.forEach(s => {
       const sum = s.reduce((acc, c) => acc+c, 0);
       sums[sum] = true;
    });
  }
  
  return Object.keys(sums);
};

[1];
[[1]];