const path = require("path");
const fs = require('fs');

const input = fs.readFileSync(path.resolve(__dirname, "../input.txt")).toString().split('\r\n')

module.exports = {
    run: () => {
        const left = [];
        const right = [];
        for (const line of input) {
            const [a, b] = line.split('   ').map(Number);
            left.push(a);
            right.push(b);
        }

        const rightFreq = new Map();
        for (const num of right) {
            rightFreq.set(num, (rightFreq.get(num) || 0) + 1);
        }

        let sum = 0;
        for (const value of left) {
            if (rightFreq.has(value)) {
                sum += value * rightFreq.get(value);
            }
        }

        return sum;
    }
}