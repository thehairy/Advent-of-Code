const { table } = require('table');
const { readdirSync } = require('fs');

const data = [
    ['Day', 'Description', 'Part 1', 'P1 - Took', 'Part 2', 'P2 - Took', 'Took']
];

const config = {
    columnDefault: {
        width: 15,
    },
    columns: [
        { alignment: 'center' },
        { alignment: 'center', width: 23 },
        { alignment: 'center' },
        { alignment: 'center' },
        { alignment: 'center' },
        { alignment: 'center' },
        { alignment: 'center' }
    ],
    header: {
        alignment: 'center',
        content: 'Advent of Code - 2023',
    },
}

readdirSync('./2023').filter(n => n.includes('Day')).forEach(i => {
    const day = require(`./${i}/index.js`).run();
    if (!process.argv[2] || process.argv[2] !== 'true') {
        day.partOne.result = '|'.repeat(day.partOne.result.toString().length);
        day.partTwo.result = '|'.repeat(day.partTwo.result.toString().length);
    }
    data.push([i.split(' ')[1], day.desc, day.partOne.result, Number(day.partOne.took).toFixed(2) + 'ms', day.partTwo.result, Number(day.partTwo.took).toFixed(2) + 'ms', Number(day.took).toFixed(2) + 'ms']);
})

console.log(table(data, config));