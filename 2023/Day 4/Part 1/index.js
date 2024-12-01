const path = require("path");
const fs = require('fs');

const input = fs.readFileSync(path.resolve(__dirname, "../input.txt")).toString().split('\r\n');

function parseHailstone(line) {
    const [pos, vel] = line.split(' @ ');
    const [px, py, pz] = pos.split(', ').map(Number);
    const [vx, vy, vz] = vel.split(', ').map(Number);
    return { px, py, vx, vy };
}

function findIntersection(h1, h2) {
    const m1 = h1.vy / h1.vx;
    const m2 = h2.vy / h2.vx;
    
    if (m1 === m2) return null;
    
    const b1 = h1.py - m1 * h1.px;
    const b2 = h2.py - m2 * h2.px;
    
    const x = (b2 - b1) / (m1 - m2);
    const y = m1 * x + b1;
    
    const futureForH1 = Math.sign(x - h1.px) === Math.sign(h1.vx);
    const futureForH2 = Math.sign(x - h2.px) === Math.sign(h2.vx);
    
    if (!futureForH1 || !futureForH2) return null;
    
    return { x, y };
}

module.exports = {
    run: () => {
        const hailstones = input.map(parseHailstone);
        const MIN = 200000000000000;
        const MAX = 400000000000000;
        let intersections = 0;
        
        for (let i = 0; i < hailstones.length; i++) {
            for (let j = i + 1; j < hailstones.length; j++) {
                const intersection = findIntersection(hailstones[i], hailstones[j]);
                if (intersection && 
                    intersection.x >= MIN && intersection.x <= MAX &&
                    intersection.y >= MIN && intersection.y <= MAX) {
                    intersections++;
                }
            }
        }
        
        return intersections;
    }
}