const visualizationContext = document.getElementById("brainfuck-visualization");
const delayText = document.getElementById("delay-visible");

let delay = 100;

const init = () => {
    const areas = 20;

    let html = "";
    for (let i = 0; i < areas; i++) {
        html += `<div class="cell ${i}">0</div>`;
    }

    visualizationContext.innerHTML = html;
    moveCaretTo(visualizationContext.getElementsByClassName(0)[0]);
};

const visualizeTape = async (tape, pointer, currentCharacter, index) => {
    // Pointer out of range
    if (pointer < 0 || pointer > 19) {
        output.innerHTML = `<p style=\"color:darkred;\">Error at tape index '${pointer}'. Pointer out of memory range.</p>`;
        execute = false;
        return;
    }

    const div = visualizationContext.getElementsByClassName(pointer)[0];
    
    if(!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
        element.focus();
        element.setSelectionRange(index, index + 1);
    }

    if (["<", ">"].includes(currentCharacter)) {
        moveCaretTo(div);
    } else if (["+", "-"].includes(currentCharacter)) {
        div.innerHTML = tape[`${pointer}`];
    }

    // Sleep until next
    await sleep(delay);
};

const moveCaretTo = (div) => {
    const allElements = visualizationContext.children;

    for (let i = 0; i < allElements.length; i++) {
        allElements[i].classList.remove("targeted");
    }

    div.classList.add("targeted");
};

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
};

const updateValue = (direction) => {
    if (direction === "+" && delay < 1000) {
        delay += 50;
    } else if (direction === "-" && delay > 0) {
        delay -= 50;
    }

    delayText.innerHTML = `Delay: ${delay}ms`;
};

// Init divs
init();