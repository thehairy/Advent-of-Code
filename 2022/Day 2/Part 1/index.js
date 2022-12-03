const scores = {
    A: 1,
    B: 2,
    C: 3,
    X: 1,
    Y: 2,
    Z: 3
}

module.exports = {
    run: () => {
        const fs = require('fs');
        const input = fs.readFileSync('./2022/Day 2/input.txt').toString().split('\n');

        let overallScore = 0;
        for (let i of input) {
            let [ elf, me ] = i.split(' ');
            overallScore += calculateRoundScore(elf, me);
        }

        return overallScore;
    }
}

function calculateRoundScore(u1, u2) {
    let score = 0;
    score += scores[u2];

    if ((u1 === 'A' && u2 === 'Y') || (u1 === 'B' && u2 === 'Z') || (u1 === 'C' && u2 === 'X')) {
        // Win
        score += 6;
    } else if ((u1 === 'A' && u2 === 'X') || (u1 === 'B' && u2 === 'Y') || (u1 === 'C' && u2 === 'Z')) {
        // Draw
        score += 3;
    } else {
        // Lose
    }
    return score;
}