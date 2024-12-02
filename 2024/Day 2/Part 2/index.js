const path = require("path");
const fs = require('fs');

const input = fs.readFileSync(path.resolve(__dirname, "../input.txt")).toString().split('\r\n')

module.exports = {
    run: () => {
        let amountSafe = 0;
        
        const isSafe = (levels) => {
            let allIncreasing = true;
            let allDecreasing = true;
            let validDifferences = true;
            
            for (let i = 0; i < levels.length - 1; i++) {
                const diff = levels[i + 1] - levels[i];
                if (diff <= 0) allIncreasing = false;
                if (diff >= 0) allDecreasing = false;
                if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
                    validDifferences = false;
                    break;
                }
            }
            
            return (allIncreasing || allDecreasing) && validDifferences;
        };

        for (const line of input) {
            const levels = line.split(' ').map(Number);
            
            if (isSafe(levels)) {
                amountSafe++;
                continue;
            }
            
            for (let i = 0; i < levels.length; i++) {
                const filteredLevels = [...levels.slice(0, i), ...levels.slice(i + 1)];
                if (isSafe(filteredLevels)) {
                    amountSafe++;
                    break;
                }
            }
        }
        
        return amountSafe;
    }
}