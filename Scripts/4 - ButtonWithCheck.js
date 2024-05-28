import { Problem } from "./1 - ProblemInfo.js";
import { Button } from "./2 - Buttons.js";
import { AllDropdowns } from "./3 - DropdownManager.js";

export class CheckButtonKnowsWants {
    buttonElement;
    problem;
    dropdowns;
    functionToCall;

    constructor(problem, dropdowns, parent, funcIfCorrect) {
        if(problem instanceof Problem && dropdowns instanceof AllDropdowns && typeof funcIfCorrect == "function") {
            this.problem = problem;
            this.dropdowns = dropdowns;
            this.functionToCall = funcIfCorrect;

            this.buttonElement = new Button(parent, "Continue", "next-btn", () => { this.checkDropdownSelections(); });
        } else {
            throw Error("Wrong arguments for constructor of CheckButtonKnowsWants");
        }
    }

    checkDropdownSelections() {
        // Check condition

        if(true) {
            this.functionToCall(this);
        }
    }

    delete() {
        this.buttonElement.delete();
    }
}