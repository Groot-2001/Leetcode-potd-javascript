// 3751. Total Waviness of Numbers in Range I

// You are given two integers num1 and num2 representing an inclusive range [num1, num2].
// The waviness of a number is defined as the total count of its peaks and valleys:
// A digit is a peak if it is strictly greater than both of its immediate neighbors.
// A digit is a valley if it is strictly less than both of its immediate neighbors.
// The first and last digits of a number cannot be peaks or valleys.
// Any number with fewer than 3 digits has a waviness of 0.
// Return the total sum of waviness for all numbers in the range [num1, num2].

/**
 * Understand Peak and Valley
 * For a digit at position i (not first or last digit):
 * 1] Peak
 * A digit is a peak if:
 * digit[i]>digit[i−1] and digit[i]>digit[i+1]
 * Example:
 * 484
 * 4 8 4
 *   ^
 * 8 > 4 and 8 > 4, so 8 is a peak.
 * 
 * 2] Valley
 * A digit is a valley if:
 * digit[i]<digit[i−1] and digit[i]<digit[i+1]
 * Example:
 * 808
 * 8 0 8
 *   ^
 * 0 < 8 and 0 < 8, so 0 is a valley.
 * understand the Waviness of a Number
 * Waviness = (number of peaks) + (number of valleys)
 */


/**
 * @param {number} num1
 * @param {number} num2
 * @return {number}
 */

 const countWaviness = function (num){
    let waviness = 0;
    const digit = String(num).split('').map(Number);
    for(let i=1; i <digit.length; i++){
        if(digit[i] > digit[i-1] && digit[i]>digit[i+1]){
            waviness++;//peak
        }else if(digit[i]< digit[i-1] && digit[i]<digit[i+1]){
            waviness++; //valley
        }
    }
    return waviness;
}


var totalWaviness = function(num1, num2) {
 let total = 0;
 for(let num = num1 ; num <= num2 ; num++){
    total += countWaviness(num);
 }
 return total;   
};