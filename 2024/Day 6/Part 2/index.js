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

        const dx = [0, 1, 0, -1];
        const dy = [-1, 0, 1, 0];

        const height = input.length;
        const width = input[0].length;

        const cache = new Map();

        function createsLoop(ox, oy) {
            if (ox === startX && oy === startY) return false;

            const cacheKey = `${ox},${oy}`;
            if (cache.has(cacheKey)) {
                return cache.get(cacheKey);
            }

            const visited = new Set();
            let x = startX;
            let y = startY;
            let dir = 0;

            while (true) {
                const state = `${x},${y},${dir}`;
                if (visited.has(state)) {
                    cache.set(cacheKey, true);
                    return true;
                }
                visited.add(state);

                const nextX = x + dx[dir];
                const nextY = y + dy[dir];

                if (nextY < 0 || nextY >= height || nextX < 0 || nextX >= width) {
                    cache.set(cacheKey, false);
                    return false;
                }

                if (input[nextY][nextX] === '#' || (nextX === ox && nextY === oy)) {
                    dir = (dir + 1) % 4;
                    continue;
                }

                x = nextX;
                y = nextY;
            }
        }

        let loopCount = 0;
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (input[y][x] === '.' && createsLoop(x, y)) {
                    loopCount++;
                }
            }
        }

        return loopCount;
    }
}