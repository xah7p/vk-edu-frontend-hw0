'use strict';

/**
 * Вычисляет выражение в польской префиксной записи (без рекурсии).
 * @param {string} expression - строка с выражением
 * @returns {number} Результат вычисления выражения или NaN
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

    let error = false;

    tokens.reduceRight((_, token) => {
        if (error) {
            return null;
        }

        if (!Number.isNaN(Number(token))) {
            stack.push(Number(token));
            return null;
        }

        if (!(token in operators) || stack.length < 2) {
            error = true;
            return null;
        }

        const left = stack.pop();
        const right = stack.pop();
        const result = operators[token](left, right);

        if (Number.isNaN(result)) {
            error = true;
            return null;
        }

        stack.push(result);
        return null;
    }, null);

    return error || stack.length !== 1 ? NaN : stack[0];
};
