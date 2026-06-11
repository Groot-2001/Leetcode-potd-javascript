// 3558. Number of Ways to Assign Edge Weights I
// There is an undirected tree with n nodes labeled from 1 to n, rooted at node 1. The tree is represented by a 2D integer array edges of length n - 1, where edges[i] = [ui, vi] indicates that there is an edge between nodes ui and vi.
// Initially, all edges have a weight of 0. You must assign each edge a weight of either 1 or 2.
// The cost of a path between any two nodes u and v is the total weight of all edges in the path connecting them.
// Select any one node x at the maximum depth. Return the number of ways to assign edge weights in the path from node 1 to x such that its total cost is odd.
// Since the answer may be large, return it modulo 109 + 7.
// Note: Ignore all edges not in the path from node 1 to x.

// Example 1:
// Input: edges = [[1,2]]
// Output: 1
// Explanation:
// The path from Node 1 to Node 2 consists of one edge (1 → 2).
// Assigning weight 1 makes the cost odd, while 2 makes it even. Thus, the number of valid assignments is 1.
// Example 2:

// Constraints:

// 2 <= n <= 105
// edges.length == n - 1
// edges[i] == [ui, vi]
// 1 <= ui, vi <= n
// edges represents a valid tree.

/**
 * @param {number[][]} edges
 * @return {number}
 */

 function powMod(a, b, mod) {
    let res = 1n;

    while (b > 0n) {
        if (b & 1n) res = (res * a) % mod;
        a = (a * a) % mod;
        b >>= 1n;
    }

    return res;
}
var assignEdgeWeights = function(edges) {
const MOD = 1000000007n;
    const n = edges.length + 1;

    const g = Array.from({ length: n + 1 }, () => []);

    for (const [u, v] of edges) {
        g[u].push(v);
        g[v].push(u);
    }

    let depth = 0;
    const q = [1];
    const vis = new Array(n + 1).fill(false);
    vis[1] = true;

    for (let head = 0; head < q.length; ) {
        const size = q.length - head;

        for (let i = 0; i < size; i++) {
            const node = q[head++];

            for (const nei of g[node]) {
                if (!vis[nei]) {
                    vis[nei] = true;
                    q.push(nei);
                }
            }
        }

        depth++;
    }

    return Number(powMod(2n, BigInt(depth - 2), MOD));
};