const path = require("path");
const fs = require('fs');

module.exports = {
    run: () => {
        const i = fs.readFileSync(path.resolve(__dirname, "../input.txt")).toString().split('\r\n');

        const o = {
            'zero': '0', 'one': '1', 'two': '2', 'three': '3', 'four': '4', 
            'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9'
        };

        let s = 0;
        for (const l of i) {
            const nol = [];
            for (const c of l.replace(/(one|two|three|four|five|six|seven|eight|nine)/gi, m => o[m])) {
                if (!isNaN(c)) {
                    nol.push(c);
                }
            }
            const ls = nol[0] + nol[nol.length - 1];
            s += +ls;
        }

        return s;
    }
}