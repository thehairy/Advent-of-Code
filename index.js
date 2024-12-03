const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function generateDay() {
    // Get user input
    const year = await question('Enter year (YYYY): ');
    const day = await question('Enter day number: ');
    const desc = await question('Enter day description: ');
    const input = await question('Enter puzzle input: ');

    // Create directory structure
    const dayPath = path.join(`./${year}`, `Day ${day}`);
    const part1Path = path.join(dayPath, 'Part 1');
    const part2Path = path.join(dayPath, 'Part 2');

    // Create directories
    fs.mkdirSync(dayPath, { recursive: true });
    fs.mkdirSync(part1Path, { recursive: true });
    fs.mkdirSync(part2Path, { recursive: true });

    // Create main day index.js
    const dayIndex = `const { performance } = require('perf_hooks');
module.exports = {
    run: () => {
        const startTime = performance.now()
        const partOne = require('./Part 1/index').run();
        const midTime = performance.now()
        const partTwo = require('./Part 2/index').run();
        const endTime = performance.now()
        return { desc: '${desc}', partOne: { result: partOne, took: midTime-startTime }, partTwo: { result: partTwo, took: endTime-midTime }, took: endTime - startTime }
    }
}`;

    // Create Part 1 and 2 index.js
    const partTemplate = `const path = require("path");
const fs = require('fs');

const input = fs.readFileSync(path.resolve(__dirname, "../input.txt")).toString().split('\\r\\n')

module.exports = {
    run: () => {
        return 'todo';
    }
}`;

    // Write files
    fs.writeFileSync(path.join(dayPath, 'index.js'), dayIndex);
    fs.writeFileSync(path.join(part1Path, 'index.js'), partTemplate);
    fs.writeFileSync(path.join(part2Path, 'index.js'), partTemplate);
    fs.writeFileSync(path.join(dayPath, 'input.txt'), input);

    console.log(`Successfully created Day ${day} for year ${year}!`);
    rl.close();
}

if (process.argv.includes('--generate')) {
    generateDay();
} else {
    const year = process.argv[2];
    require(`./${year}/index`);
}