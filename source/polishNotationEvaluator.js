'use strict';

const polishNotationEvaluator = function (expression) {
    if (typeof expression !== 'string') {
        return NaN;
    }

    const tokens = expression.trim().split(/\s+/).filter(Boolean);
    if (!tokens.length) {
        return NaN;
    }

    const stack = [];
    const operators = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => (b === 0 ? NaN : a / b)
    };

    let error = false;

    for (let i = tokens.length - 1; i >= 0; i--) {
        if (error) break;

        const token = tokens[i];

        if (!Number.isNaN(Number(token))) {
            stack.push(Number(token));
            continue;
        }

        if (!(token in operators) || stack.length < 2) {
            error = true;
            break;
        }

        const left = stack.pop();
        const right = stack.pop();
        const result = operators[token](left, right);

        if (Number.isNaN(result)) {
            error = true;
            break;
        }

        stack.push(result);
    }

    return error || stack.length !== 1 ? NaN : stack[0];
};