/*

            Existing tree                                        
               a(1)                                                
            /       \                                                          
         b(2)       c(3)                                               
        /     \         \                                                         
      d(4)    e(5)      f(6)   
      
           New tree
            a(1)
                \
               c(3)
                   \
                   f(66) 
                   
                   
   New tree
            a(1)
                \
               f(66)
                   \
                   c(3)
                   
                   
    diffs:
    c removed from a
    f added to a
    f adding to c
    c removed from f
    
    New tree
        a(1)
*/

interface TNode {
  name: string;
  count: number;
  children: {[id:string]: TNode};
};

const cntDiff = (prevRoot: TNode, newRoot: TNode) => {
  
  const mapTree = (root: TNode) => {
      const nodeMap: {[id:string]: TNode} = {};
      
      const recurse = (node: TNode) => {
          nodeMap[node.name] = node;
          Object.keys(node.children).forEach(
              key => recurse(node.children[key])
          );
      };
      
      recurse(root);
      return nodeMap;
  };
  
  const prevMap = mapTree(prevRoot);
  const newMap = mapTree(newRoot);
  
  let numDiff = 0;
  
  Object.keys(prevMap).forEach(nodeKey => {
      const prevNode = prevMap[nodeKey];
      const newNode = newMap[nodeKey]; // could be undefined
     
      // if node doesn't exist, count as diff
      if (!newNode) {
         numDiff += 1;
         return;
      };
      
      // if node count is different
      if (prevNode.count !== newNode.count)
          numDiff += 1;
      
      // count child removals from prev node
      Object.keys(prevNode.children).forEach(key => {
          if (newMap[key] && !newNode.children[key]) {
              numDiff++;
          }
      });
      
      //count child additions to new node
      Object.keys(newNode.children).forEach(key => {
          if (prevMap[key] && !prevNode.children[key])
              numDiff++;
      });
  });
  
  // count additions to new tree
  Object.keys(newMap).forEach(nodekey => {
      if (!prevMap[nodekey])
          numDiff++;
  });
  
  return numDiff;
};

const treeA: TNode = {
  name: 'a',
  count: 2,
  children: {
      c: {
          name: 'c',
          count: 3,
          children: {
              f: {name: 'f', count: 66, children: {}}
          },
      },
      g: {
         name: 'g',
         count: 42,
          children: {},
      }
  }
};

const treeB: TNode = {
  name: 'a',
  count: 1,
  children: {
      f: {
          name: 'f',
          count: 66,
          children: {c: {name: 'c', count: 3, children: {}}},
      },
      e: {
          name: 'e',
          count: 3,
          children: {},
      },
  }
};

console.log(cntDiff(treeA, treeB));