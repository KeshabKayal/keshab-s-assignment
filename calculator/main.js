document.addEventListener("DOMContentLoaded", function () {
    let display1 = document.querySelector(".display-1");
    let display2 = document.querySelector(".display-2");
    let tempResult = document.querySelector(".temp-result");
    let buttons = document.querySelectorAll(".button");
    let clearAll = document.querySelector(".all-clear");
    let clearLast = document.querySelector(".last-entity-clear");
    let equal = document.querySelector(".equal");

    let num1 = "";
    let num2 = "";
    let result = null;
    let lastOperator = "";
    let haveDot = false;

    buttons.forEach(function (button) {
        button.addEventListener("click", function (e) {
            let btnValue = e.target.innerText;

            if (!isNaN(btnValue) || btnValue === ".") {
                if (btnValue === "." && haveDot) {
                    return;
                }
                if (btnValue === ".") {
                    haveDot = true;
                }
                num2 += btnValue;
                display2.innerText = num2;
            } else if (btnValue === "C") {
                resetCalculator();
            } else if (btnValue === "CE") {
                num2 = "";
                display2.innerText = "0";
            } else if (btnValue === "=") {
                if (!num2 || !num1) {
                    return;
                }
                calculate();
                display1.innerText = "";
                display2.innerText = result;
                num1 = result;
                num2 = "";
            } else {
                if (!num2 && ["sin", "cos", "tan", "e^x", "logx"].indexOf(btnValue) === -1) {
                    return;
                }
                haveDot = false;
                if (num1) {
                    calculate();
                } else {
                    result = parseFloat(num2);
                }
                clearVariables(btnValue);
                display1.innerText = num1 + " " + lastOperator;
                display2.innerText = "0";
            }
        });
    });

    function clearVariables(operator) {
        num1 = result;
        lastOperator = operator;
        num2 = "";
    }

    function calculate() {
        if (num2 === "") {
            result = "Error";
        } else {
            if (lastOperator === "+") {
                result = parseFloat(num1) + parseFloat(num2);
            } else if (lastOperator === "-") {
                result = parseFloat(num1) - parseFloat(num2);
            } else if (lastOperator === "X" || lastOperator === "*") {
                result = parseFloat(num1) * parseFloat(num2);
            } else if (lastOperator === "/") {
                result = parseFloat(num2) !== 0 ? parseFloat(num1) / parseFloat(num2) : "Error";
            } else if (lastOperator === "%") {
                result = parseFloat(num1) % parseFloat(num2);
            } else if (lastOperator === "sin") {
                result = !isNaN(parseFloat(num2)) ? Math.sin(parseFloat(num2) * (Math.PI / 180)) : "Error";
            } else if (lastOperator === "cos") {
                result = !isNaN(parseFloat(num2)) ? Math.cos(parseFloat(num2) * (Math.PI / 180)) : "Error";
            } else if (lastOperator === "tan") {
                result = !isNaN(parseFloat(num2)) ? Math.tan(parseFloat(num2) * (Math.PI / 180)) : "Error";
            } else if (lastOperator === "e^x") {
                result = !isNaN(parseFloat(num2)) ? Math.exp(parseFloat(num2)) : "Error";
            } else if (lastOperator === "logx") {
                result = parseFloat(num2) > 0 ? Math.log10(parseFloat(num2)) : "Error";
            } else {
                result = num2;
            }
        }
        tempResult.innerText = result;
    }

    function resetCalculator() {
        num1 = "";
        num2 = "";
        result = null;
        lastOperator = "";
        haveDot = false;
        display1.innerText = "0";
        display2.innerText = "0";
        tempResult.innerText = "";
    }
});
