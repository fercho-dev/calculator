import { operate } from './utilities.js';
import { keyboardHandler  } from './keyboard-support.js';

let numbers = [0, 0];
let operator = '';
let resultOfOperation = 0;
let firstInputValue = [];
let secondInputValue = [];
let symbol;
let displayText;

function displayOperation(numbers, operator, symbol, resultOfOperation) {
    displayText = document.getElementById('text-display');
    if(
        symbol === '+' || symbol === '-' ||
        symbol === 'x' || symbol === '/' ||
        symbol === '=' || symbol === 'C' ||
        symbol === 'Delete'
    ) {
        displayText.classList.add('processing');
        setTimeout(() => {
            if(resultOfOperation) {
                displayText.innerText = resultOfOperation;
            }else if(symbol === 'C') {
                displayText.innerText = '0';
            }else if(symbol === 'Delete') {
                backSpaceClear()
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
    }else{
        displayText.innerText = 0;
    }
};
const closeUp = () =>{
    if(numbers[0] != '' && operator == ""){
        (firstInputValue != "") ? firstInputValue = firstInputValue.join('') :  firstInputValue = 0;
        numbers[0] = firstInputValue;
        displayOperation(numbers, operator,symbol, resultOfOperation);
    }
    if(numbers[1] != '' && operator != ""){
        (secondInputValue != "") ? secondInputValue = secondInputValue.join('') : secondInputValue = 0;
        numbers[1] = secondInputValue;
        (symbol == '') ? displayOperation(numbers, operator, symbol, resultOfOperation) : displayText.innerText = numbers[1];
    }
}
const backSpaceClear = () =>{
    getInputValue()
    let inputLength; 
    if(numbers[0] != '' && operator == ""){
        inputLength = firstInputValue.length;
        firstInputValue = firstInputValue.splice(0, (inputLength - 1))
    }
    else if(numbers[1] != '' && operator != ""){
        inputLength = secondInputValue.length;
        secondInputValue = secondInputValue.splice(0, (inputLength - 1))
    }else{
        return false
    }
    closeUp()
}
const getInputValue = () =>{
    (numbers[0] != '' && operator == "") ? firstInputValue = numbers[0].split('') : firstInputValue;
    (numbers[1] != '' && operator != "") ? secondInputValue = numbers[1].split('') : secondInputValue;

function backSpaceClear() {
        console.log(firstInputValue)
        let inputLength = firstInputValue.length;
        let lastInput = firstInputValue[inputLength - 1]
        console.log(`the last input is: ${lastInput} and the index is ${lastInput.indexOf(lastInput)}`)
        console.log(firstInputValue)
    }

function getInputValue() {
    (numbers[0] != '') ? firstInputValue = numbers[0].split('') : firstInputValue == 0;
    (numbers[1] != '') ? secondInputValue = numbers[1].split('') : secondInputValue == 0;
}

function operationResult() {
    resultOfOperation =+ operate(numbers[0] === '' ? resultOfOperation : Number(numbers[0]), Number(numbers[1]), operator);
    numbers[0] = resultOfOperation;
    numbers[1] = '';
}

function numberOperation(operator, symbol, numbers, resultOfOperation) {
    if(operator !== '') {
        numbers[1] = numbers[1] === 0 ? symbol : numbers[1] + symbol;
    } else {
        numbers[0] = numbers[0] === 0 ? symbol : numbers[0] + symbol;
    }

    displayOperation(numbers, operator, symbol, resultOfOperation);
}

function clearCalculator() {
    numbers.splice(0, 2, 0, 0);
    operator = '';
    resultOfOperation = 0;

    displayOperation(numbers, operator, 'C', resultOfOperation);
}

function basicOperation(symbol, operatorName) {
    if (operator) {
        operationResult();
        operator = operatorName;
    } else {
        if (numbers[0] == 0 && resultOfOperation !== 0) {
            numbers[0] = resultOfOperation;
        }

        operator = operatorName;
        resultOfOperation = 0;
    }

    displayOperation(numbers, operator, symbol, resultOfOperation);

    if (symbol === '=') {
        numbers.splice(0, 2, 0, 0);
        numbers[0] = 0;
    }
}

function errorHandler(error) {
    alert(`
            Oops, something went wrong.
            ${error}
        `);
        clearCalculator();
        displayOperation(numbers, operator, 'C', resultOfOperation);
}

function operationHandler(symbol) {    
    try {
        switch(symbol) {
            case '+':
                basicOperation('+', 'add');
                break;
            case '-':
                basicOperation('-', 'subtract');
                break;
            case 'x':
                basicOperation('x', 'multiply');
                break;
            case '/':
                basicOperation('/', 'divide');
                break;
            case '=':
                basicOperation('=', '');
                break;
            case 'C':
                clearCalculator();
                break;
            case 'Delete':
                displayOperation(numbers, operator, symbol, resultOfOperation);
                break;
            default:
                numberOperation(operator, symbol, numbers, resultOfOperation)
                break;
        }
    } catch(error) {
        errorHandler(error);
    }
};

const buttons = document.querySelectorAll('.calc-button');
buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        operationHandler(e.target.innerText);
    });
});

window.onload = function() {

    document.onkeyup = keyboardHandler;
}

export { operationHandler };
