//Q1
function sumOfDigit(num) {
    if (typeof num !== 'string' && typeof num !== 'number') {
        throw new Error("Input must be a string or a number");
    }
    return num.toString().split("")
        .reduce((sum, digit) => sum + parseInt(digit), 0);
}

console.log(sumOfDigit(738)); 
console.log(sumOfDigit('738')); 

//////////////////////////////////////////////////////////////////////////////////////////////////
// Q2
function countVowel(str) {
    const vowels = ["a", "e", "i", "o", "u"];
    let vowelCount = {};

    for (let letter of str.toLowerCase()) {
        if (vowels.includes(letter)) {
            if (vowelCount[letter]) {
                vowelCount[letter]++;
            } else {
                vowelCount[letter] = 1;
            }
        }
    }

    return vowelCount;
}

console.log(countVowel("258"));  
console.log(countVowel("aeio")); 


/////////////////////////////////////////////////////////////////////////////////
//Q3


function countString(str, letter) {
   
    const charArray = str.split('');

    const counts = charArray.map(char => (char === letter ? 1 : 0));

    return counts.reduce((total, current) => total + current, 0);
}

const result = countString('aya osama', 'a');

console.log(result);
/////////////////////////////////////////////////////////
var startDate = new Date("1999-10-11").getTime();
var endDate = new Date("2025-6-11").getTime();
var Duration = Math.round((endDate - startDate ) / (24 * 60 * 60 * 1000 *365));
console.log('====================================');
console.log(Duration);
console.log('====================================');
  
