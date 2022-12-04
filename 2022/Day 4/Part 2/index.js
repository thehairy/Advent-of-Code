const fs = require('fs')
module.exports = {
    run: () => {
        const input = fs.readFileSync('./2022/Day 4/input.txt').toString().split('\n');
        let sum = 0;
        for (let line of input) {
            const [elfOneA, elfOneB, elfTwoC, elfTwoD] = line.split(',').flatMap(i => i.split('-').map(r => +r));

            if ((elfOneA < elfTwoC && elfOneB < elfTwoC) || (elfOneA > elfTwoD && elfOneB > elfTwoD)) {
                sum++;
            }
        }
        return input.length - sum;
    }
}