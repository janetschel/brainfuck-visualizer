const paste = (code) => {
    let toSet = "";
    if (code === "hello-world") {
        toSet = "++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.";
    } else if (code === "alphabet") {
        toSet = ">++++[<++++++>->++++++++>++++++++++++++++>++++++++<<<]<++>>>+<<<[>>>.>[->+<<+>]<.>>[-<+<->>]<<+<.<<-]";
    } else if (code === "fib") {
        toSet = "+>+>+++++-[-[->+<]<<[->>>>+>+<<<<<]>[->>>>>+>+<<<<<<]>>>[-<<<<+>>>>]>[-<<<+>>>]>[-<<<<<+>>>>>]>[-<<<<<+>>>>>]<<<<]";
    } else if (code === "custom") {
        toSet = document.getElementById("output-generator").innerHTML;
    }

    document.getElementById("brainfuck-code").value = toSet.replace(/&gt;/g, ">").replace(/&lt;/g, "<");
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
