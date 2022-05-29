class Calculator {
  //constructor is a special method to create and initialize an object from a class
  constructor(prevOperandTxt, currOperandTxt) {
    this.prevOperandTxT = prevOperandTxt;
    this.currOperandTxt = currOperandTxt;
    this.clearOutput();
  }

  //clearing all display function
  clearOutput() {
    this.currOperand = "";
    this.prevOperand = "";
    this.operation = undefined;
  }

  //deleting a single number from output function
  deleteNumber() {
    this.currOperand = this.currOperand.toString().slice(0, -1);
  }

  //appending numbers to output function
  appendNumber(number) {
    //making sure only one '.' is on the operand
    if (number === "." && this.currOperand.includes(".")) return;
    //numbers have to be converted to string so they're appended and not added
    this.currOperand = this.currOperand.toString() + number.toString();
  }

  //choosing operation (+-/*) function
  chooseOperation(operation) {
    //no operation before numbers
    if (this.currOperand === "" && this.prevOperand === "") return;
    //if there's already a prev and curr operand, compute values
    if (this.prevOperand !== "" && this.currOperand !== "") {
      this.compute();
    }
    //so we can change the operation. ex: click '2' -> '+' -> '*' -> '2' it does 2*2 (last operator clicked)
    if (this.operation !== undefined) {
      this.operation = operation;
      return;
    }
    this.operation = operation;
    this.prevOperand = this.currOperand;
    this.currOperand = "";
  }

  //computing values function
  compute() {
    let computation;
    //converting string to number
    const prev = parseFloat(this.prevOperand);
    const curr = parseFloat(this.currOperand);
    //won't compute if there's no prev/curr numbers
    if (isNaN(prev) || isNaN(curr)) return;
    switch (this.operation) {
      case "+":
        computation = prev + curr;
        break;
      case "-":
        computation = prev - curr;
        break;
      case "/":
        //don't divide by 0
        if (curr === 0) {
          alert("Are you INSANE?");
          this.clearOutput();
          return;
        } else {
          computation = prev / curr;
          break;
        }
      case "*":
        computation = prev * curr;
        break;
      default:
        return;
    }
    this.currOperand = computation;
    this.operation = undefined;
    this.prevOperand = "";
  }

  //display update function
  updateOutput() {
    this.currOperandTxt.innerText = this.currOperand;
    if (this.operation !== undefined) {
      this.prevOperandTxT.innerText = `${this.prevOperand} ${this.operation}`;
    } else {
      this.prevOperandTxT.innerText = this.prevOperand;
    }
  }
}

//creating variables
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const clearButton = document.querySelector("[data-clear]");
const deleteButton = document.querySelector("[data-delete]");
const prevOperandTxt = document.querySelector("[data-prev-operand]");
const currOperandTxt = document.querySelector("[data-curr-operand]");

const calculator = new Calculator(prevOperandTxt, currOperandTxt);

//clicking on number buttons
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateOutput();
  });
});

//clicking on operation buttons
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateOutput();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateOutput();
});

clearButton.addEventListener("click", (button) => {
  calculator.clearOutput();
  calculator.updateOutput();
});

deleteButton.addEventListener("click", (button) => {
  calculator.deleteNumber();
  calculator.updateOutput();
});
