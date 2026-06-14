// 2130. Maximum Twin Sum of a Linked List

// In a linked list of size n, where n is even, the ith node (0-indexed) of the linked list is known as the twin of the (n-1-i)th node, if 0 <= i <= (n / 2) - 1.
// For example, if n = 4, then node 0 is the twin of node 3, and node 1 is the twin of node 2. These are the only nodes with twins for n = 4.
// The twin sum is defined as the sum of a node and its twin.
// Given the head of a linked list with even length, return the maximum twin sum of the linked list.

// Example 1:
// Input: head = [5,4,2,1]
// Output: 6
// Explanation:
// Nodes 0 and 1 are the twins of nodes 3 and 2, respectively. All have twin sum = 6.
// There are no other nodes with twins in the linked list.
// Thus, the maximum twin sum of the linked list is 6. 
// Example 2:


// Constraints:
// The number of nodes in the list is an even integer in the range [2, 105].
// 1 <= Node.val <= 105


/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode} head
 * @return {number}
 */
 var pairSum = function(head) {
    let slow = head;
    let fast = head;

    // Find middle
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    // Reverse second half
    let prev = null;
    let curr = slow;

    while (curr) {
        let nextNode = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextNode;
    }

    // Calculate maximum twin sum
    let maxSum = 0;
    let first = head;
    let second = prev;

    while (second) {
        maxSum = Math.max(maxSum, first.val + second.val);
        first = first.next;
        second = second.next;
    }

    return maxSum;
};