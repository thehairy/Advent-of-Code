const { table } = require('table');
const dayOne = require('./Day 1/index').run();
const dayTwo = require('./Day 2/index').run();
const dayThree = require('./Day 3/index').run();

const data = [
    ['Day', 'Description', 'Part 1', 'Part 2']
];

const config = {
    columnDefault: {
        width: 15,
    },
    columns: [
        { alignment: 'center' },
        { alignment: 'center', width: 23 },
        { alignment: 'center' },
        { alignment: 'center' }
    ],
    header: {
        alignment: 'center',
        content: 'Advent of Code - 2022',
    },
}

data.push(['1', 'Calorie Counting', dayOne.partOne, dayOne.partTwo]);
data.push(['2', 'Rock Paper Scissors', dayTwo.partOne, dayTwo.partTwo]);
data.push(['3', 'Rucksack Reorganization', dayThree.partOne, dayThree.partTwo]);


console.log(table(data, config));