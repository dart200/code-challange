interface MyNode {
  data: number;
  left?: MyNode;
  right?: MyNode;
  alive?: boolean;
};

const calcMaxPath = (root: MyNode) => {
  let max: number|undefined = undefined;
  
  const checkAndSetMax = (num: number) => {
      if (typeof max === 'undefined')
          max = num;
      else if (num > max)
          max = num; 
  };
  
  const traverse = (node: MyNode): number => {
      const leftMax = node.left ? traverse(node.left) : undefined;
      const rightMax = node.right ? traverse(node.right) : undefined;
      
      if (!node.alive && node.right && node.left) {
          const throughPath = (leftMax || 0) + (rightMax || 0) + node.data;
          checkAndSetMax(throughPath);  
      } else if (node.alive) {
          if (node.left) {
              const leftPath = node.data + (leftMax||0);
              checkAndSetMax(leftPath);
          } 
          if (node.right) {
              const rightPath = node.data + (rightMax||0);
              checkAndSetMax(rightPath);
          }
      }
      
      if (node.alive)
          return node.data;
          
      if (typeof leftMax === 'undefined')
          return (rightMax || 0) + node.data;
      if (typeof rightMax === 'undefined')
          return (leftMax || 0) + node.data;
  
      return (leftMax > rightMax) ? leftMax + node.data : rightMax + node.data;
  };
  traverse(root);
  
  return max;
};

const tree1: MyNode = {
  data: 5,
  alive: true,
  left: {
      data: 12,
      left: {
          data: 25,
          alive: true,
      },
  },
  right: {
      data: 0,
      left: {data: 14},
      right: {data: 15},
  },
};

console.log(calcMaxPath(tree1));

//          *5
//        /    \  
//      12      0 
//     /       /  \
//   *25      *14 *15
// 47 = 25 + 2 + 5 + 15

//          5*
//        /    \  
//      *2       0 
//     /  \     / \
//   3    *4  15*
// answer: 100 + 2 = 102


