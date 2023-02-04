import { operate } from './utilities.js';

function displayOperation(numbers, operator, symbol, resultOfOperation) {
    const displayText = document.getElementById('text-display');
    if(
        symbol === '+' || symbol === '-' ||
        symbol === 'x' || symbol === '/' ||
        symbol === '=' || symbol === 'C'
    ) {
        displayText.classList.add('processing');
        setTimeout(() => {
            if(resultOfOperation) {
                displayText.innerText = resultOfOperation;
            } else if(symbol === 'C') {
                displayText.innerText = '0';
            } else {
                displayText.innerText = numbers[0];
            }
            displayText.classList.remove('processing');
        }, 100)
    } else if(!operator) {
        displayText.innerText = numbers[0];
    } else if(operator) {
        displayText.innerText = numbers[1];
    } else if(resultOfOperation) {
        displayText.innerText = resultOfOperation;
    }
};

function numberOperation(operator, symbol, numbers, resultOfOperation) {
    if(operator !== '') {
        numbers[1] = numbers[1] === 0 ? symbol : numbers[1] + symbol;
    } else {
        numbers[0] = numbers[0] === 0 ? symbol : numbers[0] + symbol;
    }

    displayOperation(numbers, operator, symbol, resultOfOperation);
}

function clearOperation(numbers, operator, resultOfOperation) {
    numbers.splice(0, 2, 0, 0);
    operator = '';
    resultOfOperation = 0;

    displayOperation(numbers, operator, 'C', resultOfOperation);
}

function operationHandler() {
    const numbers = [0, 0];
    let operator = '';
    let resultOfOperation = 0;

    return (symbol) => {
        try {
            switch(symbol) {
                case '+':
                    if(operator) {
                        resultOfOperation =+ operate(numbers[0] === '' ? resultOfOperation : Number(numbers[0]), Number(numbers[1]), operator);
                        numbers[0] = resultOfOperation;
                        numbers[1] = '';
                        operator = 'add';
                        console.log(resultOfOperation);
                        displayOperation(numbers, operator, symbol, resultOfOperation);
                        break;
                    }
                    operator = 'add';
                    displayOperation(numbers, operator, symbol, resultOfOperation);
                    break;
                case '-':
                    if(operator) {
                        resultOfOperation =+ operate(numbers[0] === '' ? resultOfOperation : Number(numbers[0]), Number(numbers[1]), operator);
                        numbers[0] = resultOfOperation;
                        numbers[1] = '';
                        operator = 'subtract';
                        console.log(resultOfOperation);
                        displayOperation(numbers, operator, symbol, resultOfOperation);
                        break;
                    }
                    operator = 'subtract';
                    displayOperation(numbers, operator, symbol, resultOfOperation);
                    break;
                case 'x':
                    if(operator) {
                        resultOfOperation =+ operate(numbers[0] === '' ? resultOfOperation : Number(numbers[0]), Number(numbers[1]), operator);
                        numbers[0] = resultOfOperation;
                        numbers[1] = '';
                        operator = 'multiply';
                        console.log(resultOfOperation);
                        displayOperation(numbers, operator, symbol, resultOfOperation);
                        break;
                    }
                    operator = 'multiply';
                    displayOperation(numbers, operator, symbol, resultOfOperation);
                    break;
                case '/':
                    if(operator) {
                        resultOfOperation =+ operate(numbers[0] === '' ? resultOfOperation : Number(numbers[0]), Number(numbers[1]), operator);
                        numbers[0] = resultOfOperation;
                        numbers[1] = '';
                        operator = 'divide';
                        console.log(resultOfOperation);
                        displayOperation(numbers, operator, symbol, resultOfOperation);
                        break;
                    }
                    operator = 'divide';
                    displayOperation(numbers, operator, symbol, resultOfOperation);
                    break;
                case '=':
                    resultOfOperation =+ operate(numbers[0] === '' ? resultOfOperation : Number(numbers[0]), Number(numbers[1]), operator);
                    numbers[0] = '';
                    numbers[1] = '';
                    operator = '';
                    console.log(resultOfOperation);
                    displayOperation(numbers, operator, symbol, resultOfOperation);
                    break;
                case 'C':
                    clearOperation(numbers, operator, resultOfOperation);
                    break;
                default:
                    numberOperation(operator, symbol, numbers, resultOfOperation)
                    break;
            }
        } catch(error) {
            alert(`
                Ups, something went wrong.
                ${error}
            `);
            numbers[0] = '';
            numbers[1] = '';
            operator = '';
            resultOfOperation = null;
            displayOperation(numbers, operator, 'C', resultOfOperation);
        }
    }
};

const operation = operationHandler();

const buttons = document.querySelectorAll('.calc-button');
buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        operation(e.target.innerText);
    });
});