const { table } = require('table');
const { readdirSync, readFileSync } = require('fs');
const dayOne = require('./Day 1/index').run();
const dayTwo = require('./Day 2/index').run();
const dayThree = require('./Day 3/index').run();
const dayFour = require('./Day 4/index').run();

const data = [
    ['Day', 'Description', 'Part 1', 'Part 2', 'Took']
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
        { alignment: 'center' }
    ],
    header: {
        alignment: 'center',
        content: 'Advent of Code - 2022',
    },
}

readdirSync('./2022').filter(n => n.includes('Day')).forEach(i => {
    const day = require(`./${i}/index.js`).run();
    data.push([i.split(' ')[1], day.desc, day.partOne, day.partTwo, Number(day.took).toFixed(2) + 'ms']);
})

console.log(table(data, config));