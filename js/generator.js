// Generate Brainfuck code from text
const input = document.getElementById("type");
const outputGenerator = document.getElementById("output-generator");
const button = document.getElementById("pasteCustom");
const el = document.getElementById("implementation-details");

button.disabled = true;

const generateBrainfuck = () => {
    const value = input.value;
    
    if (value.length === 0) {
        outputGenerator.innerHTML = "<p class=\"gray\">Your output will appear here...</p>";
        button.disabled = true;
        return;
    }

    button.disabled = false;

    const generatedBrainfuck = generateBrainfuckForInput(value);
    outputGenerator.innerHTML = generatedBrainfuck;
};

const generateBrainfuckForInput = (input) => {
    let output = "";
    let lastSeenCharcode = 0;

    for (let i = 0; i < input.length; i++) {
        const currentCharacter = input[i];
        const charCode = currentCharacter.charCodeAt();

        const first = brainfuck[lastSeenCharcode][charCode];
        const second = brainfuck[0][charCode];

        if (first.length <= second.length) {
            output += first;
        } else {
            output += ">" + second;
        }
        output += ".";
        lastSeenCharcode = charCode;
    }

    return output;
};

const generateTable = () => {
    const max = 256;

    let brainfuck = new Array(max);
    for (let i = 0; i < max; i++) {
        brainfuck[i] = new Array(max);        
    }

    // First iteration to fill the array with standard values
    for (let i = 0; i < brainfuck.length; i++) {
        const element = brainfuck[i];
        
        for (let j = 0; j < element.length; j++) {
            let delta = j - i;
            
            if (delta > max / 2) {
                delta -= max;
            }

            if (delta < - (max / 2)) {
                delta += max;
            }

            brainfuck[i][j] = repeat(delta > 0 ? "+" : "-", Math.abs(delta));
        }
    }

    // Second iteration to shorten if possible
    let shouldIterate = true;
    while (shouldIterate) {
        shouldIterate = false;

        for (let i = 0; i < max; i++) {
            for (let j = 1; j < 40; j++) {
                for (let k = 1; k < 40; k++) {
                    let placeholder = i;
                    let iter = 0;

                    for (let l = 0; l < max; l++) {
                        if (placeholder === 0) {
                            break;
                        }

                        placeholder = (placeholder - k + max) & (max - 1);
                        iter = (iter + j) & (max - 1);
                    }

                    if (placeholder === 0) {
                        const curr = "[" + repeat("-", k) + ">" + repeat("+", j) + "<]>";
                        if (curr.length < brainfuck[i][iter].length) {
                            brainfuck[i][iter] = curr;
                            shouldIterate = true;
                        }
                    }

                    placholder = i;
                    iter = 0;

                    for (let l = 0; l < max; l++) {
                        if (placeholder === 0) {
                            break;
                        }

                        placeholder = (placeholder + k) & (max - 1);
                        iter = (iter - j + max) & (max - 1);
                    }

                    if (placeholder === 0) {
                        const curr = "[" + repeat("+", k) + ">" + repeat("-", j) + "<]>";
                        if (curr.length < brainfuck[i][iter].length) {
                            brainfuck[i][iter] = curr;
                            shouldIterate = true;
                        }
                    }
                }
            }
        }

        for (let i = 0; i < max; i++) {
            for (let j = 0; j < max; j++) {
                for (let k = 0; k < max; k++) {
                    if (brainfuck[i][k].length + brainfuck[k][j].length < brainfuck[i][j].length) {
                        brainfuck[i][j] = brainfuck[i][k] + brainfuck[k][j];
                        shouldIterate = true;
                    }          
                }
            }
        }
    }
    

    return brainfuck;
};

const repeat = (stringToRepeat, times) => {
    let str = "";

    for (let i = 0; i < times; i++) {
        str += stringToRepeat;
    }

    return str;
};

const isElementInViewport = () => {
    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

// Ensures that the Brainfuck table is not loaded with the initial visit of the webpage
// and only loaded once
window.addEventListener('scroll', (event) => {
    if (isElementInViewport() && !hasLoaded) {
        brainfuck =  generateTable();
        hasLoaded = true;
    }
});

let hasLoaded = false;
let brainfuck;
