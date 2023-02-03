import { operate } from './utilities.js';

let numbers = ['', ''];
let operator = '';
let resultOfOperation = null;

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
            }else if(numbers[0] != ''){
                displayText.innerText = numbers[0];
            } else if(operator == ''){
                displayText.innerText = 0;
            }else {
                displayText.innerText = 0;
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
const operationResult = () =>{
    resultOfOperation =+ operate(numbers[0] === '' ? resultOfOperation : Number(numbers[0]), Number(numbers[1]), operator);
    numbers[0] = resultOfOperation;
    numbers[1] = '';
}
const clearCalculator = () =>{
    numbers[0] = '';
    numbers[1] = '';
    operator = '';
    resultOfOperation = null;
}
function operationHandler() {
    return (symbol) => {
        try {
            switch(symbol) {
                case '+':
                    if(operator) {
                        operationResult()
                        console.log(resultOfOperation);
                        displayOperation(numbers, operator, symbol, resultOfOperation);
                        break;
                    }
                    operator = 'add';
                    displayOperation(numbers, operator, symbol, resultOfOperation);
                    break;
                case '-':
                    if(operator) {
                        operationResult()
                        console.log(resultOfOperation);
                        displayOperation(numbers, operator, symbol, resultOfOperation);
                        break;
                    }
                    operator = 'substract';
                    displayOperation(numbers, operator, symbol, resultOfOperation);
                    break;
                case 'x':
                    if(operator) {
                        operationResult()
                        console.log(resultOfOperation);
                        displayOperation(numbers, operator, symbol, resultOfOperation);
                        break;
                    }
                    operator = 'multiply';
                    displayOperation(numbers, operator, symbol, resultOfOperation);
                    break;
                case '/':
                    if(operator) {
                        operationResult()
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
                    clearCalculator()
                    displayOperation(numbers, operator, symbol, resultOfOperation);
                    break;
                default:
                    if(operator !== '') {
                        numbers[1] += symbol;
                    } else {
                        numbers[0] += symbol;
                    }
                    displayOperation(numbers, operator, symbol, resultOfOperation);
                    break;
            }
        } catch(error) {
            alert(`
                Oops, something went wrong.
                ${error}
            `);
            clearCalculator()
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