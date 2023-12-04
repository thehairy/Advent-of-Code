const path = require("path");
const fs = require('fs');

const input = fs.readFileSync(path.resolve(__dirname, "../input.txt")).toString().split('\r\n').map(i => i.split(''));

module.exports = {
    run: () => {
        return 'todo';
    }
}