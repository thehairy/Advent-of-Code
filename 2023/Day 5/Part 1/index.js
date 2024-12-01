const path = require("path");
const fs = require('fs');

const input = fs.readFileSync(path.resolve(__dirname, "../input.txt")).toString().split('\r\n');

function parseInput(input) {
    const seeds = input[0].split(': ')[1].split(' ').map(Number);
    const maps = [];
    let currentMap = [];
    
    for (let i = 2; i < input.length; i++) {
        const line = input[i];
        if (line === '') {
            if (currentMap.length > 0) {
                maps.push(currentMap);
                currentMap = [];
            }
            continue;
        }
        if (line.includes('map')) continue;
        
        const [dest, source, range] = line.split(' ').map(Number);
        currentMap.push({ dest, source, range });
    }
    if (currentMap.length > 0) maps.push(currentMap);
    
    return { seeds, maps };
}

function findDestination(source, map) {
    for (const { dest, source: start, range } of map) {
        if (source >= start && source < start + range) {
            return dest + (source - start);
        }
    }
    return source;
}

module.exports = {
    run: () => {
        const { seeds, maps } = parseInput(input);
        
        let lowest = Infinity;
        for (const seed of seeds) {
            let value = seed;
            for (const map of maps) {
                value = findDestination(value, map);
            }
            lowest = Math.min(lowest, value);
        }
        
        return lowest;
    }
}