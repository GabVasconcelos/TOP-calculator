const buttons = document.querySelectorAll(".buttons button")
const functions = document.querySelectorAll(".functions button")
const result = document.querySelector(".result")
const equal = document.querySelector(".equal")

let numbers = {
    first: "",
    second: "",
    operation: "",
    current: "first",
    reset: false
}

const operations = {
    "+": (one, two) => one + two,
    "-": (one, two) => one - two,
    "*": (one, two) => one * two,
    "/": (one, two) => {
        if(one == 0 || two == 0) {
            clearInput()
            updateTextBox("😡")
            return
        }
        return one / two
    },
}

function calculate() {
    if (numbers.first == "" || numbers.second == "" || numbers.operation == "") {
        return
    }
    let result = operations[numbers.operation](Number(numbers.first), Number(numbers.second))
    if (!result) {
        console.log("returning")
        return
    }
    updateTextBox(result)
    numbers.first = String(result)
    numbers.reset = true
    numbers.current = "second"
}

function clearInput() {
    numbers.first = ""
    numbers.second = ""
    numbers.operation = ""
    numbers.current = "first"
    updateTextBox()
}

function updateTextBox(text) {
    result.textContent = text || `${numbers.first} ${numbers.operation} ${numbers.second}`
}

function appendString(number) {
    numbers[numbers.current] = (numbers.reset && number != numbers[numbers.current]) && String(number) || String(String(numbers[numbers.current] + number))
    numbers.reset = false
    updateTextBox()
}

function setOperation(operation) {
    if (numbers.first == "") {
        return
    }
    if (numbers.reset) {
        numbers.second = ""
        numbers.reset = false
    } else if (numbers.second) {
        calculate()
    }
    numbers.operation = operation
    numbers.current = "second"
    updateTextBox()
}

function processButtonPress(button, type) {
    let f = type == "number" && appendString || setOperation
    f(button.value)
}

buttons.forEach(button => {
    button.addEventListener("click", event => {
        processButtonPress(event.target, "number")
    })
})

functions.forEach(button => {
    button.addEventListener("click", event => {
        if (event.target.value == "C") {
            clearInput() 
            return
        } else if (event.target.value == ".") {
            if (numbers[numbers.current].indexOf(".") != -1) {
                console.warn("PONTO AÍ")
                return
            }
            numbers[numbers.current] += "."
            updateTextBox()
            return
        }
        processButtonPress(event.target, "function")
    })
})

equal.addEventListener("click", calculate)