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
    let item = calculateItem(u1, u2);
    let score = 0;

    // X means you need to Lose
    // Y means you need to Draw
    // Z means you need to Win
    score += scores[item];

    if ((u1 === 'A' && item === 'B') || (u1 === 'B' && item === 'C') || (u1 === 'C' && item === 'A')) {
        // Win
        score += 6;
    } else if (u1 === item) {
        // Draw
        score += 3;
    } else {
        // Lose
    }
    return score;
}

function calculateItem(u1, state) {
    let item = '';
    switch (state) {
        // Lose
        case 'X': {
            if (u1 === 'A') item = 'C';
            if (u1 === 'B') item = 'A';
            if (u1 === 'C') item = 'B';
            break;
        }
        // Draw
        case 'Y': {
            item = u1;
            break;
        }
        // Win
        case 'Z': {
            if (u1 === 'A') item = 'B';
            if (u1 === 'B') item = 'C';
            if (u1 === 'C') item = 'A';
            break;
        }
    }
    return item;
}