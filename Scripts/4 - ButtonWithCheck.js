import { Problem } from "./1 - ProblemInfo.js";
import { Button } from "./2 - Buttons.js";
import { AllDropdowns } from "./3 - DropdownManager.js";

/* Eventually this will check whether the dropdowns + variable value text input are filled out correctly.
Right now it's basicaly just a button. */
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

    validateDropdowns() {
        // This is where the code to check the dropdowns + text input would go
        return true;
    }

    checkDropdownSelections() {
        var correct = this.validateDropdowns();

        if(correct) {
            this.functionToCall(this);
        }
    }

    delete() {
        this.buttonElement.delete();
    }
}