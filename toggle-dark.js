const themeElement = document.getElementById("theme");

const toggle = () => {
    if (themeElement.getAttribute("href") == "style.css") {
        themeElement.href = "dark-style.css";
    } else {
        themeElement.href = "style.css";
    }
};

// User defaults to dark mode
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    themeElement.href = "dark-style.css";
}
