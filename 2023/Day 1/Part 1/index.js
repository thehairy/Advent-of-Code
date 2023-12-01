const path = require("path");
const fs = require('fs');

module.exports = {
    run: () => {
        const input = fs.readFileSync(path.resolve(__dirname, "../input.txt")).toString().split('\r\n');

        let sum = 0;
        for (const line of input) {
            const numbersOfLine = [];
            for (const char of line) {
                if (!isNaN(char)) {
                    numbersOfLine.push(char);
                }
            }
            const lineSum = numbersOfLine[0] + '' + numbersOfLine[numbersOfLine.length - 1];
            sum += +lineSum;
        }

        return sum;
    }
}