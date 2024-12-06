const path = require("path");
const fs = require('fs');

const input = fs.readFileSync(path.resolve(__dirname, "../input.txt")).toString().split('\r\n');

module.exports = {
    run: () => {
        let startX, startY;
        for (let y = 0; y < input.length; y++) {
            const x = input[y].indexOf('^');
            if (x !== -1) {
                startX = x;
                startY = y;
                break;
            }
        }

        const visited = new Set([`${startX},${startY}`]);
        
        const dx = [0, 1, 0, -1];
        const dy = [-1, 0, 1, 0];
        let dir = 0; 
        
        let x = startX;
        let y = startY;

        while (true) {
            const nextX = x + dx[dir];
            const nextY = y + dy[dir];
            
            if (nextY < 0 || nextY >= input.length || 
                nextX < 0 || nextX >= input[0].length) {
                break;
            }
            
            if (input[nextY][nextX] === '#') {
                dir = (dir + 1) % 4;
                continue;
            }
            
            x = nextX;
            y = nextY;
            visited.add(`${x},${y}`);
        }

        return visited.size;
    }
}