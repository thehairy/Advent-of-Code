const path = require("path");
const fs = require('fs');

const i = fs.readFileSync(path.resolve(__dirname, "../input.txt")).toString().split('\r\n')

module.exports = {
    run: () => {
        return 'todo';
    }
}