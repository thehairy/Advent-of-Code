const fs = require('fs')
module.exports = {
    run: () => {
        const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        const input = fs.readFileSync('./2022/Day 3/input.txt').toString().split('\n');
        let sum = 0;
        for (let i of input) {
            const first = i.slice(0, i.length / 2);
            const second = i.slice(i.length / 2);
            for (let l of first) {
                if (second.includes(l)) {
                    sum += alphabet.indexOf(l) + 1;
                    break;
                }
            }
        }
        return sum;
    }
}