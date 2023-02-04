import { operationHandler  } from './main.js';

const SUPPORTED = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '=',
    'Backspace', 'Enter', 'Delete'];

const body = document.getElementsByTagName('body');

function checkSymbol(key) {
    if (key === '*') {
        return 'x';
    } else if (key === 'Enter') {
        return '=';
    } else if (key == 'Backspace') {
        return 'Delete';
    }

    return key;
}

function keyboardHandler(event) {
    if (SUPPORTED.includes(event.key)) {
        const symbol = checkSymbol(event.key);
        operationHandler(symbol);
    }
}

export { keyboardHandler };
