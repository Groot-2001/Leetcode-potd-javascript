// 3614. Process String with Special Operations II

// You are given a string s consisting of lowercase English letters and the special characters: '*', '#', and '%'.
// You are also given an integer k.
// Build a new string result by processing s according to the following rules from left to right:
// If the letter is a lowercase English letter append it to result.
// A '*' removes the last character from result, if it exists.
// A '#' duplicates the current result and appends it to itself.
// A '%' reverses the current result.
// Return the kth character of the final string result. If k is out of the bounds of result, return '.'.


// Example 1:
// Input: s = "a#b%*", k = 1
// Output: "a"
// Explanation:

// i	s[i]	Operation	Current result
// 0	'a'	Append 'a'	"a"
// 1	'#'	Duplicate result	"aa"
// 2	'b'	Append 'b'	"aab"
// 3	'%'	Reverse result	"baa"
// 4	'*'	Remove the last character	"ba"
// The final result is "ba". The character at index k = 1 is 'a'.

// Constraints:

// 1 <= s.length <= 105
// s consists of only lowercase English letters and special characters '*', '#', and '%'.
// 0 <= k <= 1015
// The length of result after processing s will not exceed 1015.

/**
 * @param {string} s
 * @param {number} k
 * @return {character}
 */
 var processStr = function(s, k) {
    const n = s.length;
   const len = new Array(n + 1).fill(0);

   for (let i = 0; i < n; i++) {
       const ch = s[i];

       if (ch >= 'a' && ch <= 'z') {
           len[i + 1] = len[i] + 1;
       } else if (ch === '*') {
           len[i + 1] = Math.max(0, len[i] - 1);
       } else if (ch === '#') {
           len[i + 1] = len[i] * 2;
       } else { 
           len[i + 1] = len[i];
       }
   }

   if (k >= len[n]) return '.';

   for (let i = n - 1; i >= 0; i--) {
       const ch = s[i];
       const before = len[i];

       if (ch >= 'a' && ch <= 'z') {
           if (k === before) {
               return ch;
           }
       } else if (ch === '#') {
           if (before > 0) {
               k %= before;
           }
       } else if (ch === '%') {
           if (before > 0) {
               k = before - 1 - k;
           }
       }
   }

   return '.';
};