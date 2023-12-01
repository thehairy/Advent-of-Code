const { performance } = require('perf_hooks');
module.exports = {
    run: () => {
        const startTime = performance.now()
        const partOne = require('./Part 1/index').run();
        const partTwo = require('./Part 2/index').run();
        const endTime = performance.now()
        return { desc: 'Does it look like fucking day 2 to you?', partOne: partOne, partTwo: partTwo, took: endTime - startTime }
    }
}