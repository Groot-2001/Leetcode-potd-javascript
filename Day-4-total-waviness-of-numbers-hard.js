/**
 * @param {number} num1
 * @param {number} num2
 * @return {number}
 */

var totalWaviness = function (num1, num2) {
  function solve(n) {
    if (n <= 0) return 0;

    const digits = String(n);
    const m = digits.length;

    const memo = new Map();

    function dfs(pos, tight, started, prevPrev, prev, len) {
      if (pos === m) {
        return [1, 0]; // [countNumbers, totalWaviness]
      }

      const key = `${pos}|${tight}|${started}|${prevPrev}|${prev}|${len}`;

      if (!tight && memo.has(key)) {
        return memo.get(key);
      }

      let totalCount = 0;
      let totalWavy = 0;

      const limit = tight ? Number(digits[pos]) : 9;

      for (let d = 0; d <= limit; d++) {
        const nextTight = tight && d === limit;

        // still leading zeros
        if (!started && d === 0) {
          const [cnt, sum] = dfs(
            pos + 1,
            nextTight,
            false,
            -1,
            -1,
            0
          );

          totalCount += cnt;
          totalWavy += sum;
          continue;
        }

        // first significant digit
        if (!started) {
          const [cnt, sum] = dfs(
            pos + 1,
            nextTight,
            true,
            -1,
            d,
            1
          );

          totalCount += cnt;
          totalWavy += sum;
          continue;
        }

        // second digit
        if (len === 1) {
          const [cnt, sum] = dfs(
            pos + 1,
            nextTight,
            true,
            prev,
            d,
            2
          );

          totalCount += cnt;
          totalWavy += sum;
          continue;
        }

        let extra = 0;

        if (
          (prev > prevPrev && prev > d) ||
          (prev < prevPrev && prev < d)
        ) {
          extra = 1;
        }

        const [cnt, sum] = dfs(
          pos + 1,
          nextTight,
          true,
          prev,
          d,
          len + 1
        );

        totalCount += cnt;
        totalWavy += sum + extra * cnt;
      }

      const res = [totalCount, totalWavy];

      if (!tight) {
        memo.set(key, res);
      }

      return res;
    }

    return dfs(0, true, false, -1, -1, 0)[1];
  }

  return solve(num2) - solve(num1 - 1);
};
