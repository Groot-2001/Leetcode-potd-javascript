/**
 * problem understanding
The problem gives you two sets of rides:
Land rides
landStartTime[i] = when ride i becomes available
landDuration[i] = how long it takes
Water rides
waterStartTime[j] = when ride j becomes available
waterDuration[j] = how long it takes

The tourist must:
Take exactly one land ride
Take exactly one water ride
Can do them in any order
Land → Water
Water → Land

// Your goal is to find the earliest possible finishing time after completing both rides.

Important Rule
A ride can start:
At its opening time, or
Any time after it opens
If you finish the first ride and the second ride is already open, you can start immediately.
Otherwise, you must wait until it opens.

Example: Input: landStartTime = [2], landDuration = [4], waterStartTime = [6], waterDuration = [3]
         Output: 9



1. Land → Water
start land ride at 2 and finish land ride at land_start_time + land_duration = 2+4 = 6,
since because of the tourist can start the water ride only when both conditions are true:
The land ride has finished.
The water ride is open.
so start water ride at 6 or to maximize max(land_finish,water_start) = max(6,6)=6 and finish water ride at 3 = water_start_time + water_duration = 6+3 = 9;

2. Water → Land
start water ride at 6 and finish water ride at 6+3 = 9,
start land ride at max(9,2)=9 and finish land ride at 9+4 = 13
earliest possible finish time = max(9,13) = 9 
 */
/**
 * @param {number[]} landStartTime
 * @param {number[]} landDuration
 * @param {number[]} waterStartTime
 * @param {number[]} waterDuration
 * @return {number}
 */

 var earliestFinishTime = function(landStartTime, landDuration, waterStartTime, waterDuration) {
    let ans = Infinity;
    for(let i=0; i< landStartTime.length; i++){
        for(let j=0; j<waterStartTime.length; j++){
            // land -> water
            let land_finish = landStartTime[i] + landDuration[i];
            const land_ride_finish = Math.max(land_finish, waterStartTime[j])+waterDuration[j];
            // water -> land
            let water_finish = waterStartTime[j] + waterDuration[j];
            const water_ride_finish = Math.max(water_finish,landStartTime[i])+landDuration[i];
            ans = Math.min(ans, land_ride_finish,water_ride_finish);
        }
    }
    return ans;
};