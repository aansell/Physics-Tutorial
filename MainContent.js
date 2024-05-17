import { ProblemsJSON } from "./Problems.js";
import { AllDropdowns } from "./Dropdowns.js";
import { dropBoxDiv } from "./DropBoxes.js";


export class MainContent {
    mainContent;
    dropdowns;
    equationBox;
    problem;

    constructor(problemNum) {
        this.mainContent = document.getElementById("main-content");
        var allProblems = new ProblemsJSON;
        this.problem = allProblems.at(problemNum);
    }

    async createDropElements() {
        var problem = await this.problem;

        console.log(problem);

        this.dropdowns = new AllDropdowns(this.mainContent);

        // var buttonText = "Variables";
        // var dropdownText = new Array("Δd", "Δt", "v");

        this.dropdowns.addToKnows(problem);
        this.dropdowns.addToWants(problem);
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
