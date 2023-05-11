/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) return 0

    const minD = (treeNode) => {
      if (treeNode.left === null && treeNode.right === null) return 1;

      if (treeNode.left === null) {
        return (1 + minD(treeNode.right));
      } 
      if (treeNode.right === null) {
        return (1 + minD(treeNode.left));
      } 
      return (Math.min(minD(treeNode.left), minD(treeNode.right)) + 1);
    }

    return minD(this.root);


  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) return 0

    const maxD = (treeNode) => {
      if (!treeNode.left && !treeNode.right) return 1;
      if (!treeNode.left) {
        return (1 + maxD(treeNode.right));
      } 
      if (!treeNode.right) {
        return (1 + maxD(treeNode.left));
      } 
      
      return (Math.max(maxD(treeNode.left), maxD(treeNode.right)) + 1);
      
    }

    return maxD(this.root);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let tot = 0;

    const sum = (treeNode) => {
      if (!treeNode) return 0;
      const left = sum(treeNode.left);
      const right = sum(treeNode.right);
      tot = Math.max(treeNode.val + left + right, tot);
      return Math.max(right + treeNode.val, left + treeNode.val, 0);
    }
    sum(this.root);
    return tot;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (!this.root) return null;

    // using a queue for breadth first search
    const queue = [this.root];
    let next = null;

    while(queue.length) {
      const node = queue.shift();

      if (node.val > lowerBound && (next === null || next > node.val)) {
        next = node.val;
      }
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    return next

  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    if (node1 === this.root || node2 === this.root) return false;

    const findCousins = (currNode, target, level = 0, node = {parent: null, level: 0}) => {
      if (node.parent) return node;

      if (currNode.left === target || currNode.right === target) {
        node.level = level + 1;
        node.parent = currNode;
      }

      if (currNode.right) {
        findCousins(currNode.right, target, level + 1, node);
      } 
      if (currNode.left) {
        findCousins(currNode.left, target, level + 1, node);
      }
  
      return node;
    }

    const n1 = findCousins(this.root, node1);
    const n2 = findCousins(this.root, node2);

    return n1 && n2 && (n1.level === n2.level) && (n1.parent !== n2.parent);
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {
    const res = [];

    const serial = treeNode => {
      if (treeNode) {
        res.push(treeNode.val);
        serial(treeNode.right);
        serial(treeNode.left);
      } else {
        res.push("#")
      }
    }

    serial(tree.root);
    return res.join(" ");

  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(serializedTree) {  
    if (!serializedTree) return null;

    const res = serializedTree.split(" ");

    const deserial = () => {
      if (res.length) {
        const item = res.shift();

        if (item === "#") return null;

        const newNode = new BinaryTreeNode(+item);
        newNode.right = deserial();
        newNode.left = deserial();

        return newNode;
      }
    }

    return new BinaryTree(deserial());

  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2, currNode = this.root) {
    
    if (currNode === null) return null;

    if (node1 === currNode || node2 === currNode) return currNode;

    const leftSide = this.lowestCommonAncestor(node1, node2, currNode.left);

    const rightSide = this.lowestCommonAncestor(node1, node2, currNode.right);

    if (leftSide && rightSide) {
      return currNode;
    } else if (leftSide || rightSide) {
      return leftSide || rightSide;
    } else if (!leftSide && !rightSide) {
      return null;
    }

  }
}

module.exports = { BinaryTree, BinaryTreeNode };
