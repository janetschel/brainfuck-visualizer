const output = document.getElementById("output");

const paste = (code) => {
    let toSet = "";
    if (code === "hello-world") {
        toSet = "++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.";
    } else if (code === "alphabet") {
        toSet = ">++++[<++++++>->++++++++>++++++++++++++++>++++++++<<<]<++>>>+<<<[>>>.>[->+<<+>]<.>>[-<+<->>]<<+<.<<-]";
    }

    document.getElementById("brainfuck-code").innerHTML = toSet;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// From here on: the actual code for interpreting Brainfuck code
// Before that just some maintenance code :)
const interpret = () => {
    const code = document.getElementById("brainfuck-code")
        .value
        .split("")
        .filter(character => ["<", ">", "+", "-", ".", ",", "[", "]"].includes(character));

    const matchingParenthese = findMatchingParenthese(code);

    output.innerHTML = "";

    let tape = {};
    let pointer = 0;

    for (let index = 0; index < code.length; index++) {
        const currentCharacter = code[index];

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
    }
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
