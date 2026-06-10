/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

 class SegmentTree {
    constructor(n) {
        this.n = n;
        this.maxValues = new Array(4 * n).fill(0);
        this.minValues = new Array(4 * n).fill(0);
    }

    insert(idx, val) {
        this._insert(1, 0, this.n - 1, idx, val);
    }

    _insert(node, lo, hi, idx, val) {
        if (lo === hi) {
            this.maxValues[node] = val;
            this.minValues[node] = val;
            return;
        }

        const mid = Math.floor((lo + hi) / 2);

        if (idx <= mid) {
            this._insert(node * 2, lo, mid, idx, val);
        } else {
            this._insert(node * 2 + 1, mid + 1, hi, idx, val);
        }

        this.maxValues[node] = Math.max(
            this.maxValues[node * 2],
            this.maxValues[node * 2 + 1]
        );

        this.minValues[node] = Math.min(
            this.minValues[node * 2],
            this.minValues[node * 2 + 1]
        );
    }

    query(l, r) {
        return this._query(1, 0, this.n - 1, l, r);
    }

    _query(node, lo, hi, l, r) {
        if (r < lo || l > hi) {
            return [Infinity, -Infinity];
        }

        if (l <= lo && hi <= r) {
            return [
                this.minValues[node],
                this.maxValues[node]
            ];
        }

        const mid = Math.floor((lo + hi) / 2);

        const left = this._query(node * 2, lo, mid, l, r);
        const right = this._query(node * 2 + 1, mid + 1, hi, l, r);

        return [
            Math.min(left[0], right[0]),
            Math.max(left[1], right[1])
        ];
    }
}

class MaxHeapV {
    constructor() {
        this.heap = [];
    }

    size() {
        return this.heap.length;
    }

    push(val) {
        this.heap.push(val);
        this._bubbleUp(this.heap.length - 1);
    }

    pop() {
        if (this.heap.length === 1) return this.heap.pop();

        const top = this.heap[0];
        this.heap[0] = this.heap.pop();
        this._bubbleDown(0);

        return top;
    }

    _bubbleUp(idx) {
        while (idx > 0) {
            const parent = Math.floor((idx - 1) / 2);

            if (this.heap[parent][0] >= this.heap[idx][0]) break;

            [this.heap[parent], this.heap[idx]] =
                [this.heap[idx], this.heap[parent]];

            idx = parent;
        }
    }

    _bubbleDown(idx) {
        const n = this.heap.length;

        while (true) {
            let largest = idx;
            const left = idx * 2 + 1;
            const right = idx * 2 + 2;

            if (
                left < n &&
                this.heap[left][0] > this.heap[largest][0]
            ) {
                largest = left;
            }

            if (
                right < n &&
                this.heap[right][0] > this.heap[largest][0]
            ) {
                largest = right;
            }

            if (largest === idx) break;

            [this.heap[idx], this.heap[largest]] =
                [this.heap[largest], this.heap[idx]];

            idx = largest;
        }
    }
}


var maxTotalValue = function(nums, k) {
    const n = nums.length;

    const st = new SegmentTree(n);

    for (let i = 0; i < n; i++) {
        st.insert(i, nums[i]);
    }

    const pq = new MaxHeapV();

    const first = st.query(0, n - 1);

    pq.push([
        first[1] - first[0],
        0,
        n - 1
    ]);

    const visited = new Set();

    const encode = (l, r) => l * n + r;

    visited.add(encode(0, n - 1));

    let ans = 0;

    while (k > 0 && pq.size() > 0) {
        const cur = pq.pop();

        const value = cur[0];
        const l = cur[1];
        const r = cur[2];

        ans += value;
        k--;

        if (l + 1 <= r) {
            const key = encode(l + 1, r);

            if (!visited.has(key)) {
                visited.add(key);

                const q = st.query(l + 1, r);

                pq.push([
                    q[1] - q[0],
                    l + 1,
                    r
                ]);
            }
        }

        if (l <= r - 1) {
            const key = encode(l, r - 1);

            if (!visited.has(key)) {
                visited.add(key);

                const q = st.query(l, r - 1);

                pq.push([
                    q[1] - q[0],
                    l,
                    r - 1
                ]);
            }
        }
    }

    return ans;
};