module.exports = {
    run: () => {
        const fs = require('fs');
        const input = fs.readFileSync('./Day 1/input.txt').toString().split('\n');

        let calories = [];
        let temp = 0;
        for (let i of input) {
            if (i) {
                temp += +i;
            } else {
                calories.push(temp);
                temp = 0;
            }
        }
        calories.push(temp);
        calories.sort((a, b) => a - b);
        calories = calories.reverse();
        return calories[0] + calories[1] + calories[2];
    }
}