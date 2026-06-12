// 3559. Number of Ways to Assign Edge Weights II
// There is an undirected tree with n nodes labeled from 1 to n, rooted at node 1. The tree is represented by a 2D integer array edges of length n - 1, where edges[i] = [ui, vi] indicates that there is an edge between nodes ui and vi.
// Initially, all edges have a weight of 0. You must assign each edge a weight of either 1 or 2.
// The cost of a path between any two nodes u and v is the total weight of all edges in the path connecting them.
// You are given a 2D integer array queries. For each queries[i] = [ui, vi], determine the number of ways to assign weights to edges in the path such that the cost of the path between ui and vi is odd.
// Return an array answer, where answer[i] is the number of valid assignments for queries[i].
// Since the answer may be large, apply modulo 109 + 7 to each answer[i].
// Note: For each query, disregard all edges not in the path between node ui and vi.

// Example 1:
// Input: edges = [[1,2]], queries = [[1,1],[1,2]]
// Output: [0,1]
// Explanation:
// Query [1,1]: The path from Node 1 to itself consists of no edges, so the cost is 0. Thus, the number of valid assignments is 0.
// Query [1,2]: The path from Node 1 to Node 2 consists of one edge (1 → 2). Assigning weight 1 makes the cost odd, while 2 makes it even. Thus, the number of valid assignments is 1.
// Example 2:

// Constraints:
// 2 <= n <= 105
// edges.length == n - 1
// edges[i] == [ui, vi]
// 1 <= queries.length <= 105
// queries[i] == [ui, vi]
// 1 <= ui, vi <= n
// edges represents a valid tree.

/**
 * @param {number[][]} edges
 * @param {number[][]} queries
 * @return {number[]}
 */
 var assignEdgeWeights = function(edges, queries) {
    const MOD = 1000000007n;
    const n = edges.length + 1;

    const graph = Array.from({ length: n + 1 }, () => []);

    for (const [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u);
    }

    const LOG = 18; // enough for n <= 1e5

    const depth = new Array(n + 1).fill(0);
    const parent = Array.from(
        { length: LOG },
        () => new Array(n + 1).fill(0)
    );

    // BFS from root = 1
    const queue = [1];
    const visited = new Array(n + 1).fill(false);
    visited[1] = true;

    let head = 0;

    while (head < queue.length) {
        const node = queue[head++];

        for (const nei of graph[node]) {
            if (!visited[nei]) {
                visited[nei] = true;
                depth[nei] = depth[node] + 1;
                parent[0][nei] = node;
                queue.push(nei);
            }
        }
    }

    // Binary Lifting
    for (let k = 1; k < LOG; k++) {
        for (let v = 1; v <= n; v++) {
            parent[k][v] = parent[k - 1][parent[k - 1][v]];
        }
    }

    function lca(u, v) {
        if (depth[u] < depth[v]) {
            [u, v] = [v, u];
        }

        let diff = depth[u] - depth[v];

        for (let k = 0; k < LOG; k++) {
            if ((diff >> k) & 1) {
                u = parent[k][u];
            }
        }

        if (u === v) return u;

        for (let k = LOG - 1; k >= 0; k--) {
            if (parent[k][u] !== parent[k][v]) {
                u = parent[k][u];
                v = parent[k][v];
            }
        }

        return parent[0][u];
    }

    // Precompute powers of 2 up to n-1 edges
    const pow2 = new Array(n);
    pow2[0] = 1n;

    for (let i = 1; i < n; i++) {
        pow2[i] = (pow2[i - 1] * 2n) % MOD;
    }

    const answer = [];

    for (const [u, v] of queries) {
        const w = lca(u, v);

        const len =
            depth[u] +
            depth[v] -
            2 * depth[w];

        if (len === 0) {
            answer.push(0);
        } else {
            answer.push(Number(pow2[len - 1]));
        }
    }

    return answer;
};