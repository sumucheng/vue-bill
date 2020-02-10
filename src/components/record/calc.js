import Big from "big.js";

function isNumber(item) {
    return /[0-9]+/.test(item);
}

function operate(numberOne, numberTwo, operation) {
    const one = Big(numberOne || "0");
    const two = Big(numberTwo || "0");
    if (operation === "+") {
        return (one.plus(two)).toString();
    }
    if (operation === "-") {
        return (one.minus(two)).toString();
    }
    throw Error(`Unknown operation '${operation}'`);
}

export default function calculate(obj, buttonName) {
    if (isNumber(buttonName)) {
        if (buttonName === "0" && obj.next === "0") {
            return {};
        }
        if (obj.operation) {
            if (obj.next) {
                return (obj.next.length < 9 && (obj.next.indexOf('.') === -1 || obj.next.length - obj.next.indexOf('.') < 3)) ?
                    { next: obj.next + buttonName } : { next: obj.next };
            }
            return { next: buttonName };
        }
        if (obj.next && obj.next) {
            if (obj.next.length < 9 && (obj.next.indexOf('.') === -1 || obj.next.length - obj.next.indexOf('.') < 3)) {
                const next = obj.next === "0" ? buttonName : obj.next + buttonName;
                return {
                    next,
                    total: null
                };
            }
            else return {
                next: obj.next,
                total: null
            }

        }
        return {
            next: buttonName,
            total: null
        };
    }

    if (buttonName === ".") {

        if (obj.next) {
            if (obj.next.includes(".")) {
                return {};
            }
            return { next: obj.next + "." };
        }
        return { next: "0." };
    }
    if (buttonName === "=") {
        if (obj.next && obj.operation) {
            return {
                total: operate(obj.total, obj.next, obj.operation),
                next: null,
                operation: null
            };
        } else {
            return {};
        }
    }
    if (buttonName === "delete") {

        if (obj.next) {
            return { next: obj.next.substr(0, obj.next.length - 1) };
        }
        else if (obj.total) {
            return { total: obj.total.substr(0, obj.total.length - 1) }
        }
    }

    if (obj.operation === '+' || obj.operation === '-') {
        return {
            total: operate(obj.total, obj.next, obj.operation),
            next: null,
            operation: buttonName
        };
    }

    if (!obj.next) {
        return { operation: buttonName };
    }

    return {
        total: obj.next,
        next: null,
        operation: buttonName
    };
}
