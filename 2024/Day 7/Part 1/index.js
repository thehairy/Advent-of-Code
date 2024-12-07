const path = require("path");
const fs = require('fs');

function evaluateExpression(numbers, operators) {
    let result = numbers[0];
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === '+') {
            result += numbers[i + 1];
        } else {
            result *= numbers[i + 1];
        }
    }
    return result;
}

function tryAllOperatorCombinations(testValue, numbers) {
    const operatorCount = numbers.length - 1;
    const combinations = 1 << operatorCount;

    for (let i = 0; i < combinations; i++) {
        const operators = [];
        for (let j = 0; j < operatorCount; j++) {
            operators.push((i & (1 << j)) ? '+' : '*');
        }
        
        if (evaluateExpression(numbers, operators) === testValue) {
            return true;
        }
    }
    return false;
}

module.exports = {
    run: () => {
        const input = fs.readFileSync(path.resolve(__dirname, "../input.txt"))
            .toString()
            .split('\r\n')
            .filter(line => line.trim());

        let sum = 0;
        for (const line of input) {
            const [testValueStr, numbersStr] = line.split(': ');
            const testValue = parseInt(testValueStr);
            const numbers = numbersStr.split(' ').map(Number);

            if (tryAllOperatorCombinations(testValue, numbers)) {
                sum += testValue;
            }
        }

        return sum;
    }
}