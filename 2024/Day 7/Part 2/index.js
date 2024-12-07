const path = require("path");
const fs = require('fs');

function evaluateExpression(numbers, operators) {
    let result = numbers[0];
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === '+') {
            result += numbers[i + 1];
        } else if (operators[i] === '*') {
            result *= numbers[i + 1];
        } else {
            result = parseInt(`${result}${numbers[i + 1]}`);
        }
    }
    return result;
}

function tryAllOperatorCombinations(testValue, numbers) {
    const operatorCount = numbers.length - 1;
    const combinations = Math.pow(3, operatorCount);

    for (let i = 0; i < combinations; i++) {
        const operators = [];
        let temp = i;
        
        for (let j = 0; j < operatorCount; j++) {
            const op = temp % 3;
            operators.push(op === 0 ? '+' : (op === 1 ? '*' : '||'));
            temp = Math.floor(temp / 3);
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