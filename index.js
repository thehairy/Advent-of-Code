const { table } = require('table');
const dayOne = require('./Day 1/index').run();
const dayTwo = require('./Day 2/index').run();

const data = [
    ['Day', 'Description', 'Part 1', 'Part 2']
];

const config = {
    columnDefault: {
        width: 17,
    },
    columns: [
        { alignment: 'center' },
        { alignment: 'center' },
        { alignment: 'center' },
        { alignment: 'center' }
    ],
    header: {
        alignment: 'center',
        content: 'Advent of Code - 2022',
    },
}

data.push(['1', 'Calculate elves\nwith the most\ncalories', dayOne.partOne, dayOne.partTwo]);
data.push(['2', 'Calculate winning score in RPS', dayTwo.partOne, dayTwo.partTwo]);


console.log(table(data, config));