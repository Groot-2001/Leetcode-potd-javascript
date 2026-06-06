/**
 * @param {number[]} nums
 * @return {number[]}
 */



var leftRightDifference = function(nums) {
    let totalSum = nums.reduce((sum,num)=> sum+num,0);
    
    let left = 0;
    let answer = [];

    for(let i=0; i < nums.length; i++){
        totalSum = totalSum - nums[i]; // right sum
        answer.push(Math.abs(left-totalSum));
        left = left + nums[i]; // left sum
    }
    return answer;
};
