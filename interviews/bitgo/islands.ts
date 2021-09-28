/*

matrix = [[1, 0, 0],
          [1, 0  1],
          [0, 1, 0]]
        
        => 3
        
trying to find the nubmer of islands given a matrix

*/

const findIslands = (matrix: number[][]) => {
  let cnt = 0;
  
  const zeroIsland = (r: number, c: number) => {
    if (!matrix[r][c]) return;
    
    matrix[r][c] = 0;
    
    if (r-1 >= 0)
      zeroIsland(r-1, c);
    if (r+1 < matrix.length)
      zeroIsland(r+1, c);
    if (c-1 >= 0)
      zeroIsland(r, c-1);
    if (c+1 < matrix.length)
      zeroIsland(r, c+1);
  };
  
  matrix.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell)
        cnt++;
      
      zeroIsland(r, c);
    });
  });
  
  return cnt;
};

const matrix = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];


/*

     5
     
   2  4 
   
5  5  5  6

=> [[5], [2, 4], [5, 5, 5, 5]]


   1
   
  2
  
3

*/

interface Node {
  val: number,
  left?: Node,
  right?: Node,
};

const findLevels = (root: Node) => {
  const res: number[][] = [];
  
  const recurse = (node: Node, level: number) => {
    if (!res[level]) res.push([]);
    
    res[level].push(node.val);
    
    if (node.left)
      recurse(node.left, level+1);
    if (node.right)
      recurse(node.right, level+1);
  };
  
  recurse(root, 0);
  
  return res;
};

const tree: any = {
  val: 5,
  left: {
    val: 2,
    left: {val: 5},
    right: {val: 5},
  },
  right: {
    val: 4,
    left: {val: 5},
    right: {val: 6},
  },
};

const tree2: any = {
  val: 5,
  left: {
    val: 2,
    right: {val: 5},
  },
};

console.log(findLevels(tree2));
