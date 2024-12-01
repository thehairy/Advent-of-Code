const { performance } = require('perf_hooks');
module.exports = {
    run: () => {
        const startTime = performance.now()
        const partOne = require('./Part 1/index').run();
        const midTime = performance.now()
        const partTwo = require('./Part 2/index').run();
        const endTime = performance.now()
        return { desc: 'If You Give A Seed A Fertilizer', partOne: { result: partOne, took: midTime-startTime }, partTwo: { result: partTwo, took: endTime-midTime }, took: endTime - startTime }
    }
}