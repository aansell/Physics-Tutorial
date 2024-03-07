document.querySelectorAll(".selector-button").forEach(function(button) {
    let nextButton = button.querySelector(".selector-button-next");
    let prevButton = button.querySelector(".selector-button-prev");
    nextButton.addEventListener("click", nextButtonFunction());
    prevButton.addEventListener("click", prevButtonFunction());
});

function nextButtonFunction() {
    console.log("next button pressed");
}

function prevButtonFunction() {
    console.log("prev button pressed");
}