const path = require("path");
const fs = require('fs');

const input = fs.readFileSync(path.resolve(__dirname, "../input.txt")).toString().split('\r\n').map(i => i.split(''));

module.exports = {
    run: () => {
        // Map to store potential gears: key = "row,col", value = array of adjacent numbers
        const gearMap = new Map();
        
        // Loop through each row
        for (let row = 0; row < input.length; row++) {
            let currentNumber = '';
            let adjacentGears = new Set(); // Store "row,col" of adjacent * symbols
            
            // Loop through each character in the row
            for (let col = 0; col <= input[row].length; col++) {
                // If current char is a digit, add to currentNumber
                if (col < input[row].length && /\d/.test(input[row][col])) {
                    currentNumber += input[row][col];
                    // Check surroundings for * symbols
                    for (let dx = -1; dx <= 1; dx++) {
                        for (let dy = -1; dy <= 1; dy++) {
                            const newRow = row + dx;
                            const newCol = col + dy;
                            if (newRow >= 0 && newRow < input.length && 
                                newCol >= 0 && newCol < input[row].length) {
                                if (input[newRow][newCol] === '*') {
                                    adjacentGears.add(`${newRow},${newCol}`);
                                }
                            }
                        }
                    }
                } else if (currentNumber !== '') {
                    // End of number reached
                    const num = parseInt(currentNumber);
                    // Add this number to all adjacent gear positions
                    adjacentGears.forEach(gear => {
                        if (!gearMap.has(gear)) {
                            gearMap.set(gear, []);
                        }
                        gearMap.get(gear).push(num);
                    });
                    currentNumber = '';
                    adjacentGears = new Set();
                }
            }
        }
        
        // Calculate sum of gear ratios
        let sum = 0;
        for (const [_, numbers] of gearMap) {
            if (numbers.length === 2) {
                sum += numbers[0] * numbers[1];
            }
        }
        
        return sum;
    }
}