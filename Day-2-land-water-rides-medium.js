// The Easy version works with O(n × m) because n,m ≤ 100.
// 100 * 100 = 10k
// For Part II:
// n,m ≤ 50,000
// So:
// 50,000 * 50,000 = 2.5 billion
// which is far too slow.

/**
 * @param {number[]} landStartTime
 * @param {number[]} landDuration
 * @param {number[]} waterStartTime
 * @param {number[]} waterDuration
 * @return {number}
 */
 var earliestFinishTime = function (
    landStartTime,
    landDuration,
    waterStartTime,
    waterDuration
) {
    function findMinimumRide(startTime, Duration){
        let minDurationArray = [];
        for(let i=0; i < startTime.length; i++){
            minDurationArray.push(startTime[i]+Duration[i]);
        }
        const minValue = Math.min(...minDurationArray);
        return minValue;
    }

    const waterEarliestRide = findMinimumRide(waterStartTime, waterDuration);
    const landEarliestRide = findMinimumRide(landStartTime, landDuration);

    let ans = Infinity;

    for(let i=0; i<landStartTime.length; i++){
        ans = Math.min(ans, Math.max(waterEarliestRide , landStartTime[i]) + landDuration[i]);
    }

    for(let j=0; j<waterStartTime.length; j++){
        ans = Math.min(ans, Math.max(landEarliestRide, waterStartTime[j]) + waterDuration[j]);
    }

    return ans;

};