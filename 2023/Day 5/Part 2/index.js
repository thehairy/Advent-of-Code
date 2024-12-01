const path = require("path");
const fs = require('fs');

const input = fs.readFileSync(path.resolve(__dirname, "../input.txt")).toString().split('\r\n');

function parseInput(input) {
    const seedRanges = [];
    const seedInfo = input[0].split(': ')[1].split(' ').map(Number);
    for (let i = 0; i < seedInfo.length; i += 2) {
        seedRanges.push({ start: seedInfo[i], length: seedInfo[i + 1] });
    }

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
    
    return { seedRanges, maps };
}

function processRange(inputRange, map) {
    const results = [];
    const rangesToProcess = [inputRange];

    while (rangesToProcess.length > 0) {
        const current = rangesToProcess.pop();
        let matched = false;

        for (const { dest, source, range } of map) {
            const overlapStart = Math.max(current.start, source);
            const overlapEnd = Math.min(current.start + current.length, source + range);

            if (overlapStart < overlapEnd) {
                // Add the mapped range
                results.push({
                    start: dest + (overlapStart - source),
                    length: overlapEnd - overlapStart
                });

                // Add the left unmapped part if exists
                if (current.start < overlapStart) {
                    rangesToProcess.push({
                        start: current.start,
                        length: overlapStart - current.start
                    });
                }

                // Add the right unmapped part if exists
                if (current.start + current.length > overlapEnd) {
                    rangesToProcess.push({
                        start: overlapEnd,
                        length: current.start + current.length - overlapEnd
                    });
                }

                matched = true;
                break;
            }
        }

        if (!matched) {
            results.push(current);
        }
    }

    return results;
}

module.exports = {
    run: () => {
        const { seedRanges, maps } = parseInput(input);
        
        let currentRanges = seedRanges;
        for (const map of maps) {
            const nextRanges = [];
            for (const range of currentRanges) {
                const processed = processRange(range, map);
                nextRanges.push(...processed);
            }
            currentRanges = nextRanges;
        }
        
        return Math.min(...currentRanges.map(r => r.start));
    }
}