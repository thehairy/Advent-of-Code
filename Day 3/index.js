module.exports = {
    run: () => {
        const partOne = require('./Part 1/index');
        const partTwo = require('./Part 2/index');
        return { partOne: partOne.run(), partTwo: partTwo.run() }
    }
}