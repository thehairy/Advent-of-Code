const path = require("path");
const fs = require('fs');

const input = fs.readFileSync(path.resolve(__dirname, "../input.txt")).toString();

module.exports = {
    run: () => {
        const grid = input.split('\n').map(line => line.trim());
        let count = 0;
        
        const directions = [
            [0, 1], [1, 1], [1, 0], [1, -1], 
            [0, -1], [-1, -1], [-1, 0], [-1, 1]
        ];
        
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[0].length; col++) {
                for (const [dx, dy] of directions) {
                    let word = '';
                    for (let step = 0; step < 4; step++) {
                        const newRow = row + dx * step;
                        const newCol = col + dy * step;
                        
                        if (newRow >= 0 && newRow < grid.length && 
                            newCol >= 0 && newCol < grid[0].length) {
                            word += grid[newRow][newCol];
                        }
                    }
                    if (word === 'XMAS') {
                        count++;
                    }
                }
            }
        }
        
        return count;
    }
}