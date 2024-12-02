const path = require("path");
const fs = require('fs');
const { execSync } = require("child_process");

const input = fs.readFileSync(path.resolve(__dirname, "../input.txt")).toString().split('\r\n')

module.exports = {
    run: () => {
        let amountSafe = 0;
        for (const line of input) {
            const levels = line.split(' ').map(Number);
            
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
            
            if ((allIncreasing || allDecreasing) && validDifferences) {
                amountSafe++;
            }
        }
        return amountSafe;
    }
}