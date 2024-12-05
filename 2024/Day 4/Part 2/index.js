const path = require("path");
const fs = require('fs');

const inputData = fs.readFileSync(path.resolve(__dirname, "../input.txt")).toString();

module.exports = {
    run: () => {
        const grid = inputData.split("\n").map(line => line.split(""));
        
        const width = grid[0].length;
        let patternCount = 0;
        
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < width; col++) {
                if (grid[row][col] !== 'A') continue;
                
                const topLeftToBottomRight = [
                    grid[row - 1]?.[col - 1], 
                    grid[row + 1]?.[col + 1]
                ].join('A');
                
                const topRightToBottomLeft = [
                    grid[row - 1]?.[col + 1], 
                    grid[row + 1]?.[col - 1]
                ].join('A');
                
                const isValidPattern = 
                    (topLeftToBottomRight === 'MAS' || topLeftToBottomRight === 'SAM') && 
                    (topRightToBottomLeft === 'MAS' || topRightToBottomLeft === 'SAM');
                
                if (isValidPattern) patternCount++;
            }
        }
        
        return patternCount;
    }
};