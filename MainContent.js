import { AllDropdowns } from "./Dropdowns.js";
import { dropBoxDiv } from "./DropBoxes.js";


export class MainContent {
    dropdowns;
    equationBox;

    constructor() {}

    #createDropElements(parent) {
        this.dropdowns = new AllDropdowns(parent);

        var buttonText = "Variables";
        var dropdownText = new Array("Δd", "Δt", "v");

        this.dropdowns.addDropdown(true, buttonText, dropdownText);
        this.dropdowns.addDropdown(true, buttonText, dropdownText);
        this.dropdowns.closeAll();
    }


    createAllContent() {
        var mainContent = document.getElementById("main-content");

        this.equationBox = new dropBoxDiv(mainContent, "Equations", "draggableEquations", true);
        this.#createDropElements(mainContent);
    }

    removeDropBoxes() {
        if(this.dropdowns != null) {
            this.dropdowns.delete();
            this.dropdowns = null;
        }
    }
}
