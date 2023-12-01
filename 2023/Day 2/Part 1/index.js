const path = require("path");
const fs = require('fs');

module.exports = {
    run: () => {
        const input = fs.readFileSync(path.resolve(__dirname, "../input.txt")).toString().split('\n');
        return 'not done';
    }
}