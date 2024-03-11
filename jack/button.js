let buttons = document.querySelectorAll(".selector-button");

function clicked() {
    console.log("hello");
}

buttons.forEach(function (button) {
    button.addEventListener("click", clicked);
});
