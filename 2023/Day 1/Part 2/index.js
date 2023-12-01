const path = require("path");
const fs = require('fs');

function wordToNumber(str) {

    return str
}

module.exports = {
    run: () => {
        const input = fs.readFileSync(path.resolve(__dirname, "../input.txt")).toString().split('\r\n');

        const obj = {
            'zero': '0', 'one': '1', 'two': '2', 'three': '3', 'four': '4', 
            'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9'
        };

        let sum = 0;
        for (const line of input) {
            const numbersOfLine = [];
            for (const char of line.replace(/(one|two|three|four|five|six|seven|eight|nine)/gi, match => obj[match])) {
                if (!isNaN(char)) {
                    numbersOfLine.push(char);
                }
            }
            const lineSum = numbersOfLine[0] + numbersOfLine[numbersOfLine.length - 1];
            sum += +lineSum;
        }

        return sum;
    }
}