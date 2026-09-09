'use strict';

/**
 * Вычисляет выражение в польской записи (префиксной).
 * @param {string} expression - строка с выражением
 * @returns {number} - результат вычислений или NaN
 *
 * @example
 * // returns 7
 * polishNotationEvaluator('+ 3 4');
 */
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

    for (let i = tokens.length - 1; i >= 0; i--) {
        const token = tokens[i];

        if (!Number.isNaN(Number(token))) {
            stack.push(Number(token));
            continue;
        }

        if (!(token in operators) || stack.length < 2) {
            return NaN;
        }

        const left = stack.pop();
        const right = stack.pop();
        const result = operators[token](left, right);

        if (Number.isNaN(result)) {
            return NaN;
        }

        stack.push(result);
    }

    return stack.length === 1 ? stack[0] : NaN;
};