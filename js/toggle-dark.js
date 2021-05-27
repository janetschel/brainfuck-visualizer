const themeElement = document.getElementById("theme");

const toggle = () => {
    if (themeElement.getAttribute("href") == "./style/style.css") {
        themeElement.href = "./style/dark-style.css";
    } else {
        themeElement.href = "./style/style.css";
    }
};

// User defaults to dark mode
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    themeElement.href = "./style/dark-style.css";
}
