/*

Given a tree, you need to select a leaf and remove it, and repeat this process until all the nodes are removed.
Return a removal sequence.

*/

interface Node {
  val: number,
  parent?: Node,
  left?: Node,
  right?: Node,
};

interface Tree {
  root: Node; 
}

const removeLeaves = (
  tree: Tree,
  next: (tree: Tree, node?: Node) => Node,
) => {
  const removedLeaves: Node[] = [];
 
  let node;
  while(True) {
    node = next(tree, node);

    if (!node)
      break;
    
    removedLeaves.push(node);
    
    if (node.parent.left === node)
       node.parent.left = null;
    if (node.parent.right === node)
       node.parent.right = null;
  };
  
  return removedLeaves;
};

const postOrderNext = (tree: Tree, node?: Node) => {
  const findLeaf = (n: Node) => {
    if (node.left) return findLeaf(node.left);
    if (node.right) return findLeaf(node.right);
    return n;
  };
  
  if (!node) {
    if (!tree.root) return undefined;
    findLeaf(tree.root);
  };
  
  if (node.left) {
    const leaf = findLeaf(node.left);
    if (leaf !== node)
      return leaf;
  }

  if (node.right) {
    const leaf = findLeaf(node.right); 
    if (leaf !== node)
      return leaf;
  }

  // handle leaf case
  if (node.parent.left)
    return findLeaf(node.parent.left);
  if (node.parent.right)
    return findLeaf(node.parent.right);

  return node.parent;
};

removeLeaves(tree, postOrderNext);

/*
         1
    2        4
3    

3 2 4 1
3 4 2 1
4 3 2 1
*/
