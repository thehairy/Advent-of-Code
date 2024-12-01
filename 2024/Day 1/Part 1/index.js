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

        left.sort((a, b) => a - b);
        right.sort((a, b) => a - b);

        let sum = 0;
        for (let i = 0; i < left.length; i++) {
            sum += Math.abs(left[i] - right[i]);
        }

        return sum;
    }
}