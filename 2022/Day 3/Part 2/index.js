const fs = require('fs')
module.exports = {
    run: () => {
        const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        const input = fs.readFileSync('./2022/Day 3/input.txt').toString().split('\n');
        let sum = 0;
        let chunkSize = 3;
        for (let i = 0; i , i < input.length; i += chunkSize) {
            const group = input.slice(i, i + chunkSize);
            for (let l of group[0]) {
                if (group[1].includes(l) && group[2].includes(l)) {
                    sum += alphabet.indexOf(l) + 1;
                    break;
                }
            }
        }
        return sum;
    }
}