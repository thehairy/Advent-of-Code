module.exports = {
    run: () => {
        const fs = require('fs');
        const input = fs.readFileSync('./Day 1/input.txt').toString().split('\n');

        let calories = [];
        let temp = 0;
        for (let i of input) {
            temp += +i;
            if (!i) calories.push(temp), temp = 0;
        }

        return Math.max(...calories);
    }
}