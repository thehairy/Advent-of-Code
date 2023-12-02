const { table } = require('table');
const { readdirSync } = require('fs');
const { green, red } = require('chalk');

const g = green;
const r = red;

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
        content: `${r('A')}${g('d')}${r('v')}${g('e')}${r('n')}${g('t')} ${r('o')}${g('f')} ${r('C')}${g('o')}${r('d')}${g('e')} ${r('-')} ${g('2')}${r('0')}${g('2')}${r('3')}`,
    },
}

readdirSync('./2023').filter(n => n.includes('Day')).forEach((i, index) => {
    const day = require(`./${i}/index.js`).run();
    if (!process.argv[2] || process.argv[2] !== 'true') {
        day.partOne.result = '|'.repeat(day.partOne.result.toString().length);
        day.partTwo.result = '|'.repeat(day.partTwo.result.toString().length);
    }

    const partOneTook = Number(day.partOne.took).toFixed(2) + 'ms';
    const cPartOneTook = Number(day.partOne.took).toFixed(2) > 10 ? red(partOneTook) : green(partOneTook);
    const partTwoTook = Number(day.partTwo.took).toFixed(2) + 'ms';
    const cPartTwoTook = Number(day.partTwo.took).toFixed(2) > 10 ? red(partTwoTook) : green(partTwoTook);
    const took = Number(day.took).toFixed(2) + 'ms';
    const cTook = Number(day.took).toFixed(2) > 10 ? red(took) : green(took);

    data.push([index % 2 === 0 ? r(i.split(' ')[1]) : g(i.split(' ')[1]), day.desc, day.partOne.result, cPartOneTook, day.partTwo.result, cPartTwoTook, cTook]);
})

console.log(table(data, config));