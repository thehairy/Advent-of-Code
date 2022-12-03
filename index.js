const { table } = require('table');
const dayOne = require('./Day 1/index').run();
const dayTwo = require('./Day 2/index').run();
const dayThree = require('./Day 3/index').run();

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

data.push(['1', 'Calorie Counting', dayOne.partOne, dayOne.partTwo, Number(dayOne.took).toFixed(2) + 'ms']);
data.push(['2', 'Rock Paper Scissors', dayTwo.partOne, dayTwo.partTwo, Number(dayTwo.took).toFixed(2) + 'ms']);
data.push(['3', 'Rucksack Reorganization', dayThree.partOne, dayThree.partTwo, Number(dayThree.took).toFixed(2) + 'ms']);


console.log(table(data, config));