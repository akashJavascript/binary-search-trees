function TreeNode(value) {
  return { value: value, left: null, right: null };
}

function Tree(arr) {
  let root = buildTree(arr);
  function insert(value) {
    let currIndex = root;
    while (true) {
      if (currIndex.value > value) {
        if (currIndex.left === null) {
          currIndex.left = TreeNode(value);
          break;
        }
        currIndex = currIndex.left;
      }
      if (currIndex.value < value) {
        if (currIndex.right === null) {
          currIndex.right = TreeNode(value);
          break;
        }
        currIndex = currIndex.right;
      } else {
        break;
      }
    }
  }
  function deleteItem(value) {
    let currIndex = root;
    let parent = null;
    while (true) {
      if (currIndex.value > value) {
        if (currIndex.left === null) {
          break;
        }
        parent = currIndex;
        currIndex = currIndex.left;
      }
      if (currIndex.value < value) {
        if (currIndex.right === null) {
          break;
        }
        parent = currIndex;
        currIndex = currIndex.right;
      }
      if (currIndex.value === value) {
        //Checks if it is a leaf node
        if (currIndex.left === null && currIndex.right === null) {
          if (parent.left !== null) {
            parent.left = null;
          }
          if (parent.right !== null) {
            parent.right = null;
          }
          break;
        }
        // Checks if it has one child
        if (
          (currIndex.left === null && currIndex.right !== null) ||
          (currIndex.right === null && currIndex.left === null)
        ) {
          if (currIndex.left === null) {
            parent.right = currIndex.right;
            break;
          }
          if (currIndex.right === null) {
            parent.left = currIndex.left;
            break;
          }
        }
        if (currIndex.left !== null && currIndex.right !== null) {
          // Node has two children
          // Find in-order successor (smallest node in right subtree)
          let successor = currIndex.right;
          let successorParent = currIndex;
          while (successor.left !== null) {
            successorParent = successor;
            successor = successor.left;
            console.log(successor, successorParent);
          }
          // Replace currIndex's value with successor's value
          currIndex.value = successor.value;
          // Delete successor
          if (successorParent.left === successor) {
            successorParent.left = successor.right;
          } else {
            successorParent.right = successor.right;
          }
        }

        break;
      }
    }
  }
  function find(value) {
    let currIndex = root;
    while (true) {
      if (currIndex.value === value) {
        return currIndex;
      }
      if (currIndex.value > value) {
        if (currIndex.left === null) {
          break;
        }
        currIndex = currIndex.left;
      }
      if (currIndex.value < value) {
        if (currIndex.right === null) {
          break;
        }
        currIndex = currIndex.right;
      } else {
        break;
      }
    }
  }
  function levelOrder(callback = null) {
    let isCallback = callback ? true : false;
    let callbackFunction;
    if (isCallback) {
      callbackFunction = callback;
    }
    let queue = [root];
    while (queue.length > 0) {
      // 1. get the node first in the queue and discover it
      let currNode = queue[0];
      console.log(currNode.value);
      typeof callbackFunction == 'function' && callbackFunction(currNode);

      // 2 dete the discovered and enquenne the children
      if (currNode.left !== null) {
        queue.push(currNode.left);
      }
      if (currNode.right !== null) {
        queue.push(currNode.right);
      }
      queue.shift();
    }
  }
  function inOrder(node, callback = null) {
    if (node === null) {
      return;
    }
    inOrder(node.left, callback);
    if (callback) {
      callback(node.value);
    }

    inOrder(node.right, callback);
  }

  function preOrder(node, callback = null) {
    if (node === null) {
      return;
    }
    if (callback) {
      callback(node.value);
    }
    preOrder(node.left, callback);
    preOrder(node.right, callback);
  }
  function postOrder(node, callback = null) {
    if (node === null) {
      return;
    }
    if (callback) {
      callback(node.value);
    }
    postOrder(node.left, callback);
    postOrder(node.right, callback);
  }
  function depth(node, startNode = root) {
    let currIndex = startNode;
    let currDepth = 0;
    while (true) {
      if (currIndex.value > node.value) {
        if (currIndex.left === null) {
          return null;
        }
        currDepth++;
        currIndex = currIndex.left;
      }
      if (currIndex.value < node.value) {
        if (currIndex.right === null) {
          return null;
        }
        currIndex = currIndex.right;
        currDepth++;
      } else {
        break;
      }
    }
    return currDepth;
  }
  function height(node) {
    if (node == null) {
      return -1;
    }

    let queue = [node];
    let height = -1;

    while (queue.length > 0) {
      let levelSize = queue.length;
      for (let i = 0; i < levelSize; i++) {
        let currentNode = queue.shift();
        if (currentNode.left != null) {
          queue.push(currentNode.left);
        }
        if (currentNode.right != null) {
          queue.push(currentNode.right);
        }
      }
      height++;
    }

    return height;
  }
  function isBalanced() {
    let queue = [root.left];
    let lastNodeLeft;
    while (queue.length > 0) {
      let currNode = queue[0];
      lastNodeLeft = currNode;
      if (currNode.left !== null) {
        queue.push(currNode.left);
      }
      if (currNode.right !== null) {
        queue.push(currNode.right);
      }
      queue.shift();
    }
    queue = [root.right];
    let lastNodeRight;
    while (queue.length > 0) {
      let currNode = queue[0];
      lastNodeRight = currNode;
      if (currNode.left !== null) {
        queue.push(currNode.left);
      }
      if (currNode.right !== null) {
        queue.push(currNode.right);
      }
      queue.shift();
    }
    if (
      Math.abs(depth(lastNodeLeft) - depth(lastNodeRight)) > 1 ||
      Math.abs(depth(lastNodeLeft) - depth(lastNodeRight)) < 1
    ) {
      return false;
    } else {
      return true;
    }
  }
  function rebalance() {
    let arr = [];
    inOrder(root, function (value) {
      arr.push(value);
    });
    root = buildTree(arr);
  }

  return {
    root,
    insert,
    deleteItem,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    depth,
    height,
    isBalanced,
    rebalance,
  };
}

function buildTree(arr) {
  arr = filterArr(arr);
  if (arr.length === 0) {
    return null;
  }

  const mid = Math.floor(arr.length / 2);
  const root = TreeNode(arr[mid]);

  root.left = buildTree(arr.slice(0, mid));
  root.right = buildTree(arr.slice(mid + 1));

  return root;
}

function filterArr(arr) {
  arr = arr.sort((a, b) => a - b);
  arr = arr.filter((item, index) => arr.indexOf(item) === index);
  return arr;
}
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

let binaryTree = Tree([10, 5, 15, 3, 7, 12, 20, 45, 6]);
binaryTree.insert(11);
binaryTree.insert(21);
binaryTree.insert(22);
binaryTree.insert(23);
binaryTree.insert(24);
// binaryTree.deleteItem(22);
// binaryTree.deleteItem(15);
// binaryTree.levelOrder(function(currNode){
//   if(currNode.value > 5){
//     console.log('a');
//   }
// });
// console.log(binaryTree.find(20));
// binaryTree.inOrder(binaryTree.root);
// binaryTree.preOrder(binaryTree.root);
// binaryTree.postOrder(binaryTree.root);
// console.log(binaryTree.height(binaryTree.root));
// console.log(binaryTree.depth(binaryTree.root.left.right));
// console.log(binaryTree.height(binaryTree.root.left.right));
// console.log(binaryTree.isBalanced());
binaryTree.rebalance();
prettyPrint(binaryTree.root);
console.dir(binaryTree.root, { depth: null });
