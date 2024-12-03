const path = require("path");
const fs = require('fs');

const input = fs.readFileSync(path.resolve(__dirname, "../input.txt")).toString()

module.exports = {
    run: () => {
        let enabled = true;
        let result = 0;
        
        const matches = Array.from(input.matchAll(/(?:do\(\)|don't\(\)|mul\((\d+),(\d+)\))/g));
        
        matches.forEach(match => {
            const instruction = match[0];
            if (instruction === 'do()') {
                enabled = true;
            } else if (instruction === "don't()") {
                enabled = false;
            } else if (enabled && match[1] && match[2]) {
                result += +match[1] * +match[2];
            }
        });
        
        return result;
    }
}