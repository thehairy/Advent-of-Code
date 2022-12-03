const fs = require('fs');
module.exports = {
    run: () => {
        const input = fs.readFileSync('./2021/Day 1/input.txt').toString().split('\n');
        let sum = 0;
        let last = 0;
        for (let i of input) {
            if (last) {
                if (last < +i) sum++;
            }
            last = i;
        }
        return sum;
    }
}