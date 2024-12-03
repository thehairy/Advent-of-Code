const path = require("path");
const fs = require('fs');

const input = fs.readFileSync(path.resolve(__dirname, "../input.txt")).toString()

module.exports = {
    run: () => {
        const matches = Array.from(input.matchAll(/mul\((\d+),(\d+)\)/g));
        return matches.reduce((acc, match) => {
            return acc + +match[1] * +match[2];
        }, 0);
    }
}