let currentNum = "";
let previousNum = "";
let operator = "";

const currentDisplayNumber = document.querySelector("currentNumber");
const previousDisplayNumber = document.querySelector("previousNumber");

const equal = document.querySelector(".equal");
equal.addEventListener("click", () => {
    if(currentNum != "" && previousNum != ""){
        calculate();
    }
});

const decimal = document.querySelector(".decimal");
decimal.addEventListener("click", () => {
    addDecimal();
});


const clear = document.querySelector(".clear");
clear.addEventListener("click", clearCalculator);

const numberButtons = document.querySelector(".number");

const operators = document.querySelector(".operator");

numberButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      handleNumber(e.target.textContent);
    });
});

function handleNumber (number) {
    if(previousNum !== "" && currentNum !== "" && operator === "") {
        previousNum = "";
        currentDisplayNumber.textContent= currentNum;
    }
    if(currentNum.length <= 11) {
        currentNum += number;
        currentDisplayNumber.textContent = currentNum;
    };    
};

operators.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      handleNumber(e.target.textContent);
    });
});

function handleOperator (op) {    
    if(previousNum === "") {
        previousNum = currentNum;
        operatorCheck(op);
    } else if(currentNum === "") {
        operatorCheck(op);
    } else {
        calculate();
        operator = op;
        currentDisplayNumber = "0";
        previousDisplayNumber.textContent = previousNum + " " + operator;
    }
};

function operatorCheck(text){
    previousDisplayNumber.textContent = previousNum + "" + operator;
    currentDisplayNumber.textContent = "0";
    currentNum = "";
};

function calculate() {
    previousNum = Number(previousNum);
    currentNum = Number(currentNum);

    if(operator === "+") {
        previousNum += currentNum;
    } else if(operator === "-") {
        previousNum -= currentNum;
    } else if(operator === "*") {
        previousNum *= currentNum;   
    } else if(operator === "/") {
        if(currentNum <= 0 ) {
            previousNum = "Error";
            displayResult();            
            return;
        }
        previousNum /= currentNum;
    }
    previousNum = roundNumber(previousNum);
    previousNum = previousNum.toString();
    displayResult();
};

function roundNumber (num) {
    return Math.round(num * 100000) / 100000;
};

function displayResult(){
    if (previousNum.length <= 11) {
        currentDisplayNumber.textContent = previousNum;
    }else {
        currentDisplayNumber.textContent.previousNum.slice(0,11) + "...";
    }
    previousDisplayNumber.textContent = "";
    operator = "";
    currentNum = "";
};

function clearCalculator(){
    currentNum = "";
    previousNum = "";
    operator = "";
    currentDisplayNumber = "0";
    previousDisplayNumber = "";
};

function addDecimal(){
    if(!currentNum.includes(".")){
        currentDisplayNumber += ".";
        currentDisplayNumber.textContent = currentNum;
    }
};