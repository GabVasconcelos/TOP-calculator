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
    "/": (one, two) => one / two,
}

function calculate() {
    if (numbers.first == "" || numbers.second == "" || numbers.operation == "") {
        return
    }
    let result = operations[numbers.operation](Number(numbers.first), Number(numbers.second))
    updateTextBox(result)
    numbers.first = String(result)
    numbers.reset = true
    numbers.current = "second"
}

function clear() {
    numbers.first = ""
    numbers.second = ""
    numbers.operation = ""
    numbers.current = "first"
    updateTextBox()
}

function updateTextBox(text) {
    result.textContent = text || `${numbers.first} ${numbers.operation} ${numbers.second}`
}

function appendNumber(number) {
    numbers[numbers.current] = numbers.reset && String(number) || Number(String(numbers[numbers.current] + number))
    numbers.reset = false
    updateTextBox()
}

function setOperation(operation) {
    if (numbers.first == "") {
        return
    }
    if (numbers.second) {
        calculate()
        return
    }
    if (numbers.reset) {
        numbers.second = ""
        numbers.reset = false
    }
    numbers.operation = operation
    numbers.current = "second"
    updateTextBox()
}

function processButtonPress(button, type) {
    let f = type == "number" && appendNumber || setOperation
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
            clear() 
            return
        }
        processButtonPress(event.target, "function")
    })
})

equal.addEventListener("click", calculate)