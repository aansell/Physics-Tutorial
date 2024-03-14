//get all buttons on current html page
let buttons = document.querySelectorAll(".selector-button");

//add event listener for each button
buttons.forEach(function (button) {
    button.addEventListener("click", (event) => {
        //maps button id in switch case for each id of button type
        let buttonId = event.target.id;
        switch(buttonId) {
            case 'Continue':
            console.log("clicked continue");
            break;
            case 'Previous':
            console.log("clicked previous");
            break;
            default:
            //if id is not able to be mapped alert user to an error
            alert("Error: unknown id tag given " + buttonId);
            break;
        }
    });
});
