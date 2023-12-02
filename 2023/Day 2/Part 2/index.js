const path = require("path");
const fs = require('fs');

const input = fs.readFileSync(path.resolve(__dirname, "../input.txt")).toString().split('\r\n')

module.exports = {
    run: () => {
        const games = input; // For clarity sake
        let sum = 0;

        for (const game of games) {
            const minimum = { red: 0, green: 0, blue: 0 };
            const [id, cGame] = game.split(': ');
            for (const cubes of cGame.split('; ')) {
                for (const cube of cubes.split(', ')) {
                    const [amount, color] = cube.split(' ');
                    if (minimum[color] < +amount) {
                        minimum[color] = +amount;
                    }
                }
            }
            sum += minimum.red * minimum.green * minimum.blue;
        }

        return sum;
    }
}