const path = require("path");
const fs = require('fs');

const i = fs.readFileSync(path.resolve(__dirname, "../input.txt")).toString().split('\r\n')

module.exports = {
    run: () => {
        const o = {
            'zero': '0', 'one': '1', 'two': '2', 'three': '3', 'four': '4', 
            'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9'
        };

        let s = 0;
        for (const l of i) {
            const n = [...l.matchAll(/(?=(one|two|three|four|five|six|seven|eight|nine|\d))/gi)].map(j => !isNaN(j[1]) ? j[1] : o[j[1]]);
            s += +(n[0] + n[n.length - 1]);
        }

        return s;
    }
}