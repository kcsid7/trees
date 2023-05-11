/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    if (!this.root) return 0;

    let tot = this.root.val;

    const sum = (treeNode) => {
      for (let c of treeNode.children) {
        tot += c.val;
        if (c.children.length > 0) {
          sum(c);
        }
      }
    }
    sum(this.root);

    return tot;
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    if (!this.root) return 0;
    let count;
    if (this.root.val % 2 === 0) {
      count = 1;
    } else {
      count = 0
    }

    const countNumber = (treeNode) => {
      for (let c of treeNode.children) {
        if (c.val % 2 === 0) count++;
        if (c.children.length > 0) countNumber(c)
      }
    }

    countNumber(this.root);

    return count;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    if (!this.root) return 0;
    let count;
    if (this.root.val > lowerBound) {
      count = 1;
    } else {
      count = 0;
    }

    const countNumber = (treeNode) => {
      for (let c of treeNode.children) {
        if (c.val > lowerBound) count++;
        if (c.children.length > 0) countNumber(c)
      }
    }

    countNumber(this.root);
    return count;

  }

}

module.exports = { Tree, TreeNode };
