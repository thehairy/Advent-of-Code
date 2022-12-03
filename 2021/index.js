const { table } = require('table');
const dayOne = require('./Day 1/index').run();

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
        content: 'Advent of Code - 2021',
    },
}

data.push(['1', 'Sonar Sweep', dayOne.partOne, dayOne.partTwo, Number(dayOne.took).toFixed(2) + 'ms']);


console.log(table(data, config));