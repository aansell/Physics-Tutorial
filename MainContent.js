import { AllDropdowns } from "./Dropdowns.js";
import { dropBoxDiv } from "./DropBoxes.js";


export class MainContent {
    mainContent;
    dropdowns;
    equationBox;

    constructor() {
        this.mainContent = document.getElementById("main-content");
    }

    createDropElements() {
        this.dropdowns = new AllDropdowns(this.mainContent);

        var buttonText = "Variables";
        var dropdownText = new Array("Δd", "Δt", "v");

        this.dropdowns.addDropdownToKnows(buttonText, dropdownText);
        this.dropdowns.addDropdownToWants(buttonText, dropdownText);
        this.dropdowns.closeAll();
    }

    createEquationBox() {
        this.equationBox = new dropBoxDiv(this.mainContent, "mainEquationBox", "Equations", "draggableEquations", true);
    }

    createAllContent() {
        this.createEquationBox();
        this.createDropElements();
    }

    delete() {
        if(this.dropdowns instanceof AllDropdowns) {
            this.dropdowns.delete();
            this.dropdowns = null;
        }

        if(this.equationBox instanceof dropBoxDiv) {
            this.equationBox.delete();
            this.equationBox = null;
        }
    }
}
