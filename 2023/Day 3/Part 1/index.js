const path = require("path");
const fs = require('fs');

const input = fs.readFileSync(path.resolve(__dirname, "../input.txt")).toString().split('\r\n').map(i => i.split(''));

module.exports = {
    run: () => {
        let sum = 0;
        
        // Loop through each row
        for (let row = 0; row < input.length; row++) {
            let currentNumber = '';
            let isPartNumber = false;
            
            // Loop through each character in the row
            for (let col = 0; col <= input[row].length; col++) {
                // If current char is a digit, add to currentNumber
                if (col < input[row].length && /\d/.test(input[row][col])) {
                    currentNumber += input[row][col];
                    // Check surroundings for symbols
                    for (let dx = -1; dx <= 1; dx++) {
                        for (let dy = -1; dy <= 1; dy++) {
                            const newRow = row + dx;
                            const newCol = col + dy;
                            if (newRow >= 0 && newRow < input.length && 
                                newCol >= 0 && newCol < input[row].length) {
                                const char = input[newRow][newCol];
                                if (char !== '.' && !/\d/.test(char)) {
                                    isPartNumber = true;
                                }
                            }
                        }
                    }
                } else if (currentNumber !== '') {
                    // End of number reached
                    if (isPartNumber) {
                        sum += parseInt(currentNumber);
                    }
                    currentNumber = '';
                    isPartNumber = false;
                }
            }
        }
        
        return sum;
    }
}