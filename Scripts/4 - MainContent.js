import { AllDropdowns } from "./3 - DropdownManager.js";
import { DropBox } from "./2 - DropBoxes.js";


/* Creates all of the main content (not side panel / button) using lower level prefabs.
Currently creates dropdowns on the first screen and main equation box on the second screen. */
export class MainContent {
    mainContent;
    dropdowns;
    equationBox;
    problem;

    constructor(problem) {
        this.mainContent = document.getElementById("main-content");
        this.problem = problem;
    }

    async createDropElements() {

        console.log(this.problem);

        this.dropdowns = new AllDropdowns(this.mainContent);

        // var buttonText = "Variables";
        // var dropdownText = new Array("Δd", "Δt", "v");

        this.dropdowns.addToKnows(this.problem);
        this.dropdowns.addToWants(this.problem);
        this.dropdowns.closeAll();
    }

    createEquationBox() {
        this.equationBox = new DropBox(this.mainContent, "mainEquationBox", "Equations", "draggableEquations", true);
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

        if(this.equationBox instanceof DropBox) {
            this.equationBox.delete();
            this.equationBox = null;
        }
    }
}
