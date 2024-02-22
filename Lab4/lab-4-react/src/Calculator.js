import './Calculator.css';
import Button from '@mui/material/Button';
import {alpha, createTheme, TextField, ThemeProvider} from "@mui/material";
import {useState} from "react";

const orangeBase = "#ff9f0a"
const orangeMain = alpha(orangeBase, 0.9)
const lightgreyBase = "#a5a5a5"
const lightgreyMain = alpha(lightgreyBase, 0.9)
const greyBase = "#333333"
const greyMain = alpha(greyBase, 0.9)

const theme = createTheme({
    palette: {
        orange: {
            main: orangeMain,
            light: alpha(orangeBase, 0.8),
            dark: alpha(orangeBase, 1.0),
            contrastText: "#FFFFFF",
        },
        lightgrey: {
            main: lightgreyMain,
            light: alpha(lightgreyBase, 0.8),
            dark: alpha(lightgreyBase, 1.0),
            contrastText: "#FFFFFF",
        },
        grey: {
            main: greyMain,
            light: alpha(greyBase, 0.8),
            dark: alpha(greyBase, 1.0),
            contrastText: "#FFFFFF",
        },
    },
})

function Calculator() {

    const [output, setOutput] = useState("0"); // State to hold the calculator output
    const [firstNum, setFirstNum] = useState(0)
    const [num2, setNum2] = useState(0)
    const [currentOperation, setCurrentOperation] = useState("")
    const [equalsCounter, setEqualsCounter] = useState(0)
    const [arithmeticCounter, setArithmeticCounter] = useState(0)


    // Function to handle number button clicks
    const handleNumber = (value) => {
        if (output === "0" && !isNaN(Number(value))) {
            setOutput(value); // Replace "0" with the clicked value if the output is currently "0" and the clicked value is a number
        } else {
            setOutput(output + value); // Concatenate the clicked value to the output
        }
    };

    const handleArithmetic = (value) => { // Function for if an arithmetic button is clicked
        if (equalsCounter === 0 && arithmeticCounter > 0){ // If you don't hit equals and keep clicking arithmetic options (Ex. 3+3+ will output 6)
            const secondNum = parseFloat(output)
            setNum2(secondNum)
            setCurrentOperation(value)
            calculation(firstNum, secondNum)

        } else if (arithmeticCounter > 0){ // If you click equals and select another arithmetic option after (Ex. 100\10=10 ==> \5=2)
            setEqualsCounter(0)
            let count = arithmeticCounter + 1
            console.log("Test")
            setArithmeticCounter(count)
            setFirstNum(parseFloat(output))
            setOutput("0")
            setCurrentOperation(value)
        } else{ // Default case that stores the first number and increments the arithmetic counter by 1
            setFirstNum(parseFloat(output))
            setOutput("0")
            setCurrentOperation(value)
            let count = arithmeticCounter + 1
            // console.log(count)
            setArithmeticCounter(count)
        }
    }


    // Function to handle equals button click
    const handleEquals = () => {
        if (equalsCounter > 0){ // If you click equals for the second time without clearing (Ex. 5+10=15 ==> =25 ==> =35)
            const num1 = parseFloat(output)
            setFirstNum(num1)
            calculation(num1, num2)

        } else{ // Default case that declares the 2nd number and increments the equals counter by 1. The calculation function is called
            const secondNum = parseFloat(output)
            setNum2(secondNum)
            let count = equalsCounter + 1
            setEqualsCounter(count)
            calculation(firstNum, secondNum)
        }
    };

    const calculation = (firstNum, secondNum) => { // Function that handles all the math
        // console.log("FN =", firstNum)
        // console.log("SN =", secondNum)
        let result

        if (currentOperation === "+"){
            result = firstNum + secondNum
            setOutput(result)
        } else if (currentOperation === "-"){
            result = firstNum - secondNum
            setOutput(result)
        } else if (currentOperation === "*"){
            result = firstNum * secondNum
            if (result.toString().includes(".")) { // Check if result is a floating-point number
                let decimalPart = result.toString().split(".")[1];
                if (decimalPart.length > 4) { // Check if the decimal part has more than 4 digits
                    result = parseFloat(result.toFixed(4)); // Limit to 4 decimal places
                }
            }
            setOutput(result); // Set the output
        } else {
            if (secondNum === 0){
                setOutput("Error")
            } else{
                result = firstNum / secondNum
                if (result.toString().includes(".")) { // Check if result is a floating-point number
                    let decimalPart = result.toString().split(".")[1];
                    if (decimalPart.length > 4) { // Check if the decimal part has more than 4 digits
                        result = parseFloat(result.toFixed(4)); // Limit to 4 decimal places
                    }
                }
                setOutput(result); // Set the output
            }
        }
    }



    // Function to reset the calculator
    const resetCalculator = () => {
        setOutput("0"); // Clear the output
        setFirstNum(0) // Clear 1st number
        setNum2(0) // Clear 2nd number
        setCurrentOperation("") // Clear arithmetic operation
        setEqualsCounter(0) // Clear equals counter
        setArithmeticCounter(0) // Clear arithmetic counter

    };

    return (
        <ThemeProvider theme={theme}>
            <div className="background">
                <div className="calculator-background">
                    <div className="calculator-output">
                        <TextField id="standard-read-only-input" variant="standard" value={output}
                                   inputProps={{
                                       style: { textAlign: 'right',
                                                fontSize: '100px',
                                                color: 'white',
                                                marginRight: '20px',
                                                paddingBottom: '0px'},
                                   }}
                                   className="output-field"/>
                    </div>
                    <div className="calculator-buttons">
                        <div className="row">
                            <Button onClick={resetCalculator} value="clear" variant="contained" color="lightgrey" className="clear-button" style={{fontSize: "30px"}}>C</Button>
                            <Button onClick={() => handleArithmetic("/")} value="/" variant="contained" color="orange" className="arithmetic-button" style={{fontSize: "35px"}}>÷</Button>
                        </div>
                        <div className="row">
                            <Button onClick={() => handleNumber("7")} value={"7"} variant="contained" color="grey" className="number-button" style={{fontSize: "30px"}}>7</Button>
                            <Button onClick={() => handleNumber("8")} value={"8"} variant="contained" color="grey" className="number-button" style={{fontSize: "30px"}}>8</Button>
                            <Button onClick={() => handleNumber("9")} value={"9"} variant="contained" color="grey" className="number-button" style={{fontSize: "30px"}}>9</Button>
                            <Button onClick={() => handleArithmetic("*")} value="*" variant="contained" color="orange" className="arithmetic-button" style={{fontSize: "20px"}}>x</Button>

                        </div>
                        <div className="row">
                            <Button onClick={() => handleNumber("4")} value={"4"} variant="contained" color="grey" className="number-button" style={{fontSize: "30px"}}>4</Button>
                            <Button onClick={() => handleNumber("5")} value={"5"} variant="contained" color="grey" className="number-button" style={{fontSize: "30px"}}>5</Button>
                            <Button onClick={() => handleNumber("6")} value={"6"} variant="contained" color="grey" className="number-button" style={{fontSize: "30px"}}>6</Button>
                            <Button onClick={() => handleArithmetic("-")} value="-" variant="contained" color="orange" className="arithmetic-button" style={{fontSize: "35px"}}>-</Button>

                        </div>
                        <div className="row">
                            <Button onClick={() => handleNumber("1")} value={"1"} variant="contained" color="grey" className="number-button" style={{fontSize: "30px"}}>1</Button>
                            <Button onClick={() => handleNumber("2")} value={"2"} variant="contained" color="grey" className="number-button" style={{fontSize: "30px"}}>2</Button>
                            <Button onClick={() => handleNumber("3")} value={"3"} variant="contained" color="grey" className="number-button" style={{fontSize: "30px"}}>3</Button>
                            <Button onClick={() => handleArithmetic("+")} value="+" variant="contained" color="orange" className="arithmetic-button" style={{fontSize: "30px"}}>+</Button>

                        </div>
                        <div className="row">
                            <Button onClick={() => handleNumber("0")} value={"0"} variant="contained" color="grey" className="number-button, zero-button" style={{fontSize: "30px"}}>0</Button>
                            <Button onClick={() => handleNumber('.')} value='.' variant="contained" color="grey" className="number-button" style={{fontSize: "30px"}}>.</Button>
                            <Button onClick={handleEquals} variant="contained" color="orange" className="equals-button" style={{fontSize: "30px"}}>=</Button>

                        </div>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default Calculator;
