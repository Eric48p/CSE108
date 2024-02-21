import './Calculator.css';
import Button from '@mui/material/Button';
import {alpha, createTheme, TextField, ThemeProvider} from "@mui/material";

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

    const handleClick = (value) => {
        console.log(`The ${value} button was clicked`)
        // console.log(typeof(value))
    }
    return (
        <ThemeProvider theme={theme}>
            <div className="background">
                <div className="calculator-background">
                    <div className="calculator-output">
                        <TextField id="standard-read-only-input" variant="standard" label="" defaultValue={0}
                                   inputProps={{
                                       style: { textAlign: 'right',
                                                fontSize: '100px',
                                                color: 'white',
                                                marginRight: '20px',
                                                paddingBottom: '0px'},
                                       readOnly: true
                                   }}
                                   className="output-field"/>
                    </div>
                    <div className="calculator-buttons">
                        <div className="row">
                            <Button onClick={() => handleClick("clear")} value="clear" variant="contained" color="lightgrey" className="clear-button" style={{fontSize: "30px"}}>C</Button>
                            <Button onClick={() => handleClick("÷")} value="÷" variant="contained" color="orange" className="arithmetic-button" style={{fontSize: "35px"}}>÷</Button>
                        </div>
                        <div className="row">
                            <Button onClick={() => handleClick(7)} value={7} variant="contained" color="grey" className="number-button" style={{fontSize: "30px"}}>7</Button>
                            <Button onClick={() => handleClick(8)} value={8} variant="contained" color="grey" className="number-button" style={{fontSize: "30px"}}>8</Button>
                            <Button onClick={() => handleClick(9)} value={9} variant="contained" color="grey" className="number-button" style={{fontSize: "30px"}}>9</Button>
                            <Button onClick={() => handleClick("x")} value="x" variant="contained" color="orange" className="arithmetic-button" style={{fontSize: "20px"}}>x</Button>

                        </div>
                        <div className="row">
                            <Button onClick={() => handleClick(4)} value={4} variant="contained" color="grey" className="number-button" style={{fontSize: "30px"}}>4</Button>
                            <Button onClick={() => handleClick(5)} value={5} variant="contained" color="grey" className="number-button" style={{fontSize: "30px"}}>5</Button>
                            <Button onClick={() => handleClick(6)} value={6} variant="contained" color="grey" className="number-button" style={{fontSize: "30px"}}>6</Button>
                            <Button onClick={() => handleClick("-")} value="-" variant="contained" color="orange" className="arithmetic-button" style={{fontSize: "35px"}}>-</Button>

                        </div>
                        <div className="row">
                            <Button onClick={() => handleClick(1)} value={1} variant="contained" color="grey" className="number-button" style={{fontSize: "30px"}}>1</Button>
                            <Button onClick={() => handleClick(2)} value={2} variant="contained" color="grey" className="number-button" style={{fontSize: "30px"}}>2</Button>
                            <Button onClick={() => handleClick(3)} value={3} variant="contained" color="grey" className="number-button" style={{fontSize: "30px"}}>3</Button>
                            <Button onClick={() => handleClick("+")} value="+" variant="contained" color="orange" className="arithmetic-button" style={{fontSize: "30px"}}>+</Button>

                        </div>
                        <div className="row">
                            <Button onClick={() => handleClick(0)} value={0} variant="contained" color="grey" className="number-button, zero-button" style={{fontSize: "30px"}}>0</Button>
                            <Button onClick={() => handleClick('.')} value='.' variant="contained" color="grey" className="number-button" style={{fontSize: "30px"}}>.</Button>
                            <Button onClick={() => handleClick("=")} value="=" variant="contained" color="orange" className="equals-button" style={{fontSize: "30px"}}>=</Button>

                        </div>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default Calculator;
