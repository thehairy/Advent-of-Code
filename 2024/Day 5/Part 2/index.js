const path = require("path");
const fs = require('fs');

const input = fs.readFileSync(path.resolve(__dirname, "../input.txt")).toString().split('\r\n');

module.exports = {
    run: () => {
        const splitIndex = input.findIndex(line => line === '');
        const rules = input.slice(0, splitIndex)
            .map(rule => {
                const [before, after] = rule.split('|');
                return { before: parseInt(before), after: parseInt(after) };
            });
        const updates = input.slice(splitIndex + 1)
            .map(update => update.split(',').map(Number));

        function isValidOrder(pages) {
            for (const rule of rules) {
                const beforeIndex = pages.indexOf(rule.before);
                const afterIndex = pages.indexOf(rule.after);
                if (beforeIndex !== -1 && afterIndex !== -1) {
                    if (beforeIndex > afterIndex) return false;
                }
            }
            return true;
        }

        function comparePages(a, b) {
            for (const rule of rules) {
                if (rule.before === a && rule.after === b) return -1;
                if (rule.before === b && rule.after === a) return 1;
            }
            return 0;
        }

        const invalidUpdates = updates.filter(update => !isValidOrder(update));
        const sortedInvalidUpdates = invalidUpdates.map(update => {
            return [...update].sort((a, b) => {
                return comparePages(a, b);
            });
        });

        return sortedInvalidUpdates.reduce((sum, update) => {
            const middleIndex = Math.floor(update.length / 2);
            return sum + update[middleIndex];
        }, 0);
    }
};