const path = require("path");
const fs = require('fs');

const input = fs.readFileSync(path.resolve(__dirname, "../input.txt")).toString().split('\r\n')

module.exports = {
    run: () => {
        return input.map(l => {
                const line = l.match(/\d/g);
                return line[0] + line[line.length-1];
            }).reduce((a, c) => +a + +c, 0);
    }
}