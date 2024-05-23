import { Problem } from "./Problems.js";
import { dropBoxDiv, Draggable } from "./DropBoxes.js";
import { EquationHTML } from "./EquationToHTML.js";

export class ProblemsHTML {
    problem;
    knows;
    wants;
    dragContainer;
    variable;

    constructor(problemObject, whereToPutIt) {
        if(problemObject instanceof Problem) {
            this.problem = problemObject;

            this.knows = new dropBoxDiv(whereToPutIt, "text-container", "Knows");
            this.knows.addDraggableClass("knows");

            this.wants = new dropBoxDiv(whereToPutIt, "text-container", "Unknowns");

            this.problem.knows.forEach((item) => {
                this.populateKnows(item);
            });
            this.problem.wants.forEach((item) => {
                this.populateWants(item);
            });

            MathJax.typesetPromise()
                .catch((err) => console.log('MathJax typesetting failed: ' + err));
        } else {
            throw Error("Problem object not of type Problem.");
        }
    }

    populateKnows(value) {
        this.dragContainer = new Draggable("mathvar" + value, this.knows.htmlElement, ["knowsWants", "knows"]);
        // Create MathML Element
        var mathContainer = EquationHTML.createMathML(this.dragContainer.htmlElement);
        EquationHTML.FormatItem(value, mathContainer);
    }

    populateWants(value) {
        this.variable = document.createElement("div");
        this.variable.id = "mathvar" + value;

        this.variable.classList.add("knowsWants");
        this.wants.htmlElement.appendChild(this.variable);
        var mathContainer = EquationHTML.createMathML(this.variable);
        EquationHTML.FormatItem(value, mathContainer);
    }
}