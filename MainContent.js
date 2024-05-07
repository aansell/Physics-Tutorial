import { AllDropdowns } from "./Dropdowns.js";
import { dropBoxDiv } from "./DropBoxes.js";


function createDropElements() {
    var maincontent = document.getElementById("main-content");
    var dropdowns = new AllDropdowns(maincontent);

    var buttonText = "Variables";
    var dropdownText = new Array("Δd", "Δt", "v");

    dropdowns.addDropdown(true, buttonText, dropdownText);
    dropdowns.addDropdown(true, buttonText, dropdownText);
    dropdowns.closeAll();
}


document.addEventListener("DOMContentLoaded", () => {
    createDropElements();
});

var parentBoxDiv = document.getElementById("main-content");
new dropBoxDiv(parentBoxDiv, "Equations", "draggableEquations", true);