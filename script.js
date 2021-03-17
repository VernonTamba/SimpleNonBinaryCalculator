//! Changes in html: Removed 0 from main and operation display

// TODO: Get the needed elements
// Equal (div)
const equal = document.querySelector(".eq");
// Header Display
const mainDisplay = document.querySelector(".display-main");
const operationsDisplay = document.querySelector(".display-operations");
const indicateDisplay = document.querySelector(".display-indicate"); // font-color to "white" if the characters in the display operations go beyond the div

// Declare variables needed
let result;

// Get every buttons
const buttons = document.querySelectorAll("button");
// TODO: For each button, give functionalities
buttons.forEach((button) => {
    // Everytime it is clicked
    button.addEventListener("click", () => {
        // The button clicked
        let buttonClicked = button.textContent;
        // If characters in operation display goes beyond the div (more than 30 characters)
        if(operationsDisplayIsMax()){
            indicateDisplay.classList.add("max"); // Max indicator appears
            clear(buttonClicked); // Clear       
        }else{ // Otherwise
            indicateDisplay.classList.remove("max"); // Max indicator disappears
            // Button functionalities
            if(buttonClicked === "ac" || buttonClicked === "ce"){ // If Delete or End
                clear(buttonClicked); // Clear
            }else if(buttonClicked === "."){ // If dot
                if (operationsDisplay.textContent.includes(".")) { // cannot have more than one dot
                        return;
                    } else {
                        operationsDisplay.textContent += buttonClicked; // Append dot
                    }
            }else{ // If numbers or operators
                // Change the symbol of subtraction, multiplication, and division
                // To prevent errors in eval function
                if(buttonClicked === "−"){
                    operationsDisplay.textContent += "-";
                }else if(buttonClicked === "x"){
                    operationsDisplay.textContent += "*";
                }else if(buttonClicked === "%"){
                    operationsDisplay.textContent += "/";
                }else{
                    operationsDisplay.textContent += buttonClicked; // Append numbers and operators
                }
            }
        }
    });
});

// TODO: Equal div (button) functionality
equal.addEventListener("click", () => {
    equalTo(); // Calculate and append result
});

// TODO: Keyboard / Key press support
// Everytime a key is pressed
document.addEventListener("keydown", (event) => {
    // The key pressed
    let keyPressed = event.key;
    // If characters in operation display goes beyond the div (more than 30 characters)
    if(operationsDisplayIsMax()){
        indicateDisplay.classList.add("max"); // Max indicator appears
        clear(keyPressed); // Clear       
    }else{ // Otherwise
        indicateDisplay.classList.remove("max"); // Max indicator disappears
        // Button functionalities
        if(keyPressed === "Delete" || keyPressed === "End"){ 
            clear(keyPressed); // Clear
        }else if(keyPressed === "."){ // If dot
            if (operationsDisplay.textContent.includes(".")) { // cannot have more than one dot
                    return;
                } else {
                    operationsDisplay.textContent += keyPressed; // Append dot
                }
        }else if(validInput(keyPressed)){ // If valid input (any numbers or operators)
            // Change x and % to * and / to prevent errors in evaluating the result
            if(keyPressed === "x"){
                keyPressed = "*";
            }else if(keyPressed === "%"){
                keyPressed = "/";
            }
            operationsDisplay.textContent += keyPressed; // Append numbers and operators
        }else if(keyPressed === "="){ // If equal
            equalTo(); // Calculate and append result
        }else{
            return; // If input not valid, just return nothing
        }
    }
});

// OPERATION FUNCTIONS
// TODO: Equal functionalities
function equalTo(){
    //? I am not sure why I used try catch block
    try{
        result = eval(operationsDisplay.textContent); // evaluate or calculate the input
        mainDisplay.textContent = result; // display result
    }catch(error){
        console.log("Wrong input or operation");
        console.log(error);
    }
}

// TODO: AC and CE functionalities
function clear(input){
    if(input === "ac" || input === "Delete"){ // AC: Clear all
        mainDisplay.textContent ="";
        operationsDisplay.textContent = "";
        indicateDisplay.classList.remove("max"); // max indicator disappears
    }else if(input === "ce" || input === "End"){ // CE: Delete last input/character
        operationsDisplay.textContent = operationsDisplay.textContent.slice(0, -1);
    }
}

// BOOLEAN FUNCTIONS
// TODO: Check the length of the input in operation display
function operationsDisplayIsMax(){
    if(operationsDisplay.textContent.length >= 29){
        return true;
    }else{
        return false;
    }
}

// TODO: Check if the key pressed by the user is VALID or not (FOR KEYBOARD SUPPORT ONLY)
function validInput(input){
    if(input === "0" || input === "1" || input === "2" || input === "3" || input === "4" || input === "5" || input === "6" || input === "7" || input === "8" || input === "9" || input === "+" || input === "-" || input === "x" || input === "*" || input === "/" || input === "%"){
        return true;
    }else{
        return false;
    }
}