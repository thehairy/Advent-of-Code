const path = require("path");
const fs = require('fs');

const input = fs.readFileSync(path.resolve(__dirname, "../input.txt")).toString().split('\r\n')

module.exports = {
    run: () => {
        let result = 0;
        for (const card of input) {
            let [cardName, winningNumbers, scratchNumbers] = card.replace(':', '|').split('|');
            winningNumbers = winningNumbers.split(' ').filter(n => n);
            scratchNumbers = scratchNumbers.split(' ').filter(n => n);

            const won = scratchNumbers.filter(i => winningNumbers.includes(i)).length;
            result += won > 0 ? 2 ** (scratchNumbers.filter(i => winningNumbers.includes(i)).length - 1) : 0;
        }
        return result;
    }
}