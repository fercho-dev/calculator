function add(a,b) {
    return a + b;
};
function subtract(a,b) {
    return a - b;
};
function multiply(a,b) {
    return (a * b).toFixed(2);
};
function divide(a,b) {
    if(b === 0) {
        throw new Error("Can't divide by zero")
    }
    return (a / b).toFixed(2);
};
function operate(a,b,operator) {
    try {
        switch(operator) {
            case 'add':
                return add(a,b);
            case 'subtract':
                return subtract(a,b);
            case 'multiply':
                return multiply(a,b);
            case 'divide':
                return divide(a,b);
            default:
                throw new Error('No valid operator');
        }
    } catch(error) {
        throw new Error(error);
    }
}

export { operate };