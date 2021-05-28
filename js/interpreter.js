const output = document.getElementById("output");
const element = document.getElementById("brainfuck-code");

const run = document.getElementById("run-button");
const stop = document.getElementById("stop-button")

if(!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
    element.focus();
    element.setSelectionRange(element.value.length, element.value.length);
}

let execute = false;

const interpret = async () => {
    execute = true;
    init(); // inits visualization on tape

    run.disabled = true;

    const code = element.value.split("");
    const matchingParenthese = findMatchingParenthese(code);

    output.innerHTML = "";

    let tape = {};
    let pointer = 0;

    for (let index = 0; index < code.length && execute; index++) {
        const currentCharacter = code[index];

        if (!["<", ">", "+", "-", ".", ",", "[", "]"].includes(currentCharacter)) {
            continue;
        }

        if (["<", ">"].includes(currentCharacter)) {
            pointer += currentCharacter == "<" ? -1 : 1;
        } else if (["+", "-"].includes(currentCharacter)) {
            tape[`${pointer}`] = existsOnTapeOrElse(pointer, tape, 0) + (currentCharacter === "-" ? -1 : 1);
            checkForWrap(pointer, tape);
        }  else if (currentCharacter === ".") {
            output.innerHTML += String.fromCharCode(tape[`${pointer}`]);
        } else if (currentCharacter === ",") {
            const number = prompt("Type your input:", "");
            tape[`${pointer}`] = parseInt(number.charCodeAt());
        } else if ((currentCharacter === "[" && tape[`${pointer}`] === 0) || (currentCharacter === "]" && tape[`${pointer}`] !== 0)) {
            index = findMatchingParentheseForIndex(matchingParenthese, index);
        }

        await visualizeTape(tape, pointer, currentCharacter, index);
    }

    reset();
};

const findMatchingParenthese = (code) => {
    let matching = {};

    for (let index = 0; index < code.length; index++) {
        const currentCharacter = code[index];
        
        if (currentCharacter === "[") {
            const closingIndex = findMatchingForSpecificParenthese(index, code);
            matching[`${index}`] = closingIndex;
        }
    }

    return matching;
};

const findMatchingForSpecificParenthese = (index, code) => {
    let countOfNonRelated = 0;

    for (let j = index + 1; j < code.length; j++) {
        const currentCharacter = code[j];

        if (currentCharacter === "[") {
            countOfNonRelated++;
        } else if (currentCharacter === "]" && countOfNonRelated > 0) {
            countOfNonRelated--;
        } else if (currentCharacter === "]" && countOfNonRelated === 0) {
            return j;
        }
    }
};

const findMatchingParentheseForIndex = (matchingParenthese, findFor) => {
    if (findFor in matchingParenthese) {
        return matchingParenthese[findFor];
    }

    for (const [key, value] of Object.entries(matchingParenthese)) {
        if (value === findFor) {
            return parseInt(key);
        }
    }
};

const checkForWrap = (pointer, tape) => {
    if (tape[`${pointer}`] > 255) {
        tape[`${pointer}`] = 0;
    } else if (tape[`${pointer}`] < 0) {
        tape[`${pointer}`] = 255;
    }
};

const existsOnTapeOrElse = (key, tape, elseValue) => {
    return key in tape ? tape[`${key}`] : elseValue;
};

// Buttons

// Stops execution immediatly
const stopExecution = () => {    
    output.innerHTML = "";

    reset();
    init();
};

const reset = () => {
    execute = false;
    run.disabled = false;

    element.focus();
    element.setSelectionRange(element.value.length, element.value.length);
};