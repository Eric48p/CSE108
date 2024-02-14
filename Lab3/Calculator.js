document.addEventListener("DOMContentLoaded", function() {
  // Get the output box element
  const outputBox = document.querySelector(".output-box");

  // Get all the number buttons
  const numberButtons = document.querySelectorAll(".button-number, .button-number-zero");

  // Get all the arithmetic operation buttons
  const arithmeticButtons = document.querySelectorAll(".button-arithmetic");

  // Get the clear button
  const clearButton = document.querySelector(".button-clear");

  // Get the equals button
  const equalsButton = document.querySelector(".button-equals");

  // Variable to store the first number
  let firstNum = null;

  // Variable to store the selected arithmetic operation
  let selectedOperation = null;

  // Function to reset the calculator
  function resetCalculator() {
    firstNum = null;
    selectedOperation = null;
    outputBox.textContent = "0";
  }

  // Add click event listener to each number button
  numberButtons.forEach(function(button) {
    button.addEventListener("click", function() {
      // Get the text content of the clicked button
      const number = this.textContent;

      // If the current content of the output box is "0", replace it with the clicked number
      if (outputBox.textContent === "0") {
        outputBox.textContent = number;
      } else {
        // Otherwise, append the clicked number to the existing content of the output box
        outputBox.textContent += number;
      }
    });
  });

  // Add click event listener to arithmetic operation buttons
  arithmeticButtons.forEach(function(button) {
    button.addEventListener("click", function() {
      // Get the text content of the clicked button (arithmetic operation)
      const operation = this.textContent;

      // Store the current content of the output box as the first operand
      firstNum = parseFloat(outputBox.textContent);
      console.log("First number = ", firstNum)
      // console.log(typeof(firstNum))

      // Store the selected arithmetic operation
      selectedOperation = operation;
      console.log("Selected operation: ", selectedOperation)

      // Reset the output box content to "0" for entering the second number
      outputBox.textContent = "0";
    });
  });

  // Add click event listener to the equals button
  equalsButton.addEventListener("click", function() {
    console.log("The equals button was pressed")
    // If there is a first operand, a selected operation, and the output box is not "0"
    if (firstNum !== null && selectedOperation !== null && outputBox.textContent !== "0") {
      // Get the second number
      const secondNum = parseFloat(outputBox.textContent);
      console.log("Second number = ", secondNum)
      // console.log(typeof(secondNum))

      // Perform the arithmetic operation based on the selected operation
      let result;
      // console.log("Test", selectedOperation)
      switch (selectedOperation) {
        case "+":
          result = firstNum + secondNum;
          console.log("Result = ", result)
          break;
        case "-":
          result = firstNum - secondNum;
          console.log("Result = ", result)
          break;
        case "x":
          result = firstNum * secondNum;
          console.log("Result = ", result)
          break;
        case "÷":
          result = firstNum / secondNum;
          console.log("Result = ", result)
          break;
        default:
          result = null;
      }

      // Update the output box with the result
      outputBox.textContent = result;
    }
  });

  // Add click event listener to the clear button
  clearButton.addEventListener("click", resetCalculator);

});
