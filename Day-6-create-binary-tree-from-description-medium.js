/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * @param {number[][]} descriptions
 * @return {TreeNode}
 */
var createBinaryTree = function(descriptions) {
    const nodeMap = new Map();
    const childSet = new Set();

    for (const [parentVal, childVal, isLeft] of descriptions) {
        
        if (!nodeMap.has(parentVal)) {
            nodeMap.set(parentVal, new TreeNode(parentVal));
        }

        if (!nodeMap.has(childVal)) {
            nodeMap.set(childVal, new TreeNode(childVal));
        }

        const parent = nodeMap.get(parentVal);
        const child = nodeMap.get(childVal);

        if (isLeft === 1) {
            parent.left = child;
        } else {
            parent.right = child;
        }

        childSet.add(childVal);
    }

    for (const [parentVal] of descriptions) {
        if (!childSet.has(parentVal)) {
            return nodeMap.get(parentVal);
        }
    }
};
