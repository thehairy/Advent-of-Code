const path = require("path");
const fs = require('fs');

const input = fs.readFileSync(path.resolve(__dirname, "../input.txt")).toString().split('\r\n')

module.exports = {
    run: () => {
        const games = input; // For clarity sake
        const possibleGames =  [];
        const config = { red: 12, green: 13, blue: 14 };

        for (const game of games) {
            let impossible = false;
            const [id, cGame] = game.split(': ');
            const gameId = +id.split(' ')[1];
            for (const cubes of cGame.split('; ')) {
                for (const cube of cubes.split(', ')) {
                    const [amount, color] = cube.split(' ');
                    if (config[color] < amount && !impossible) {
                        impossible = true;
                        break;
                    }
                }
            }
            if (!impossible) {
                possibleGames.push(gameId);
            }
        }

        return possibleGames.reduce((a, b) => a + b, 0);
    }
}