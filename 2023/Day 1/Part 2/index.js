const path = require("path");
const fs = require('fs');

function extractNumbers(str) {
    // Regex pattern for digits and spelled-out numbers from one to nine
    const pattern = /one|two|three|four|five|six|seven|eight|nine|\d/gi;
    
    // Find all non-overlapping matches
    let matches = str.match(pattern);
    if (!matches) {
        return []; // No matches found
    }

    // Iterate over the string to find overlapping matches
    for (let i = 0; i < str.length; i++) {
        for (let j = i + 1; j <= str.length; j++) {
            let substr = str.substring(i, j);
            let match = substr.match(pattern);
            if (match && match[0] !== substr) {
                matches.push(match[0]);
            }
        }
    }

    // Remove duplicates from the array
    matches = [...new Set(matches)];
    return matches
}

module.exports = {
    run: () => {
        const i = fs.readFileSync(path.resolve(__dirname, "../input.txt")).toString().split('\r\n');
        
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