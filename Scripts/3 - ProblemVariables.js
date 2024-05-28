import { Problem } from "./1 - ProblemInfo.js";
import { MathFormat } from "./1 - MathFormatting.js";
import { DropBox, Draggable } from "./2 - DropBoxes.js";
import { EquationHTML } from "./2 - EquationElement.js";

export class ProblemsHTML {
    problem;
    knows;
    wants;
    dragContainer;
    variable;

    constructor(problemObject, whereToPutIt) {
        if(problemObject instanceof Problem) {
            this.problem = problemObject;

            this.knows = new DropBox(whereToPutIt, "text-container", "Knows");
            this.knows.addDraggableClass("knows");

            this.wants = new DropBox(whereToPutIt, "text-container", "Unknowns");

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

        var variableText = MathFormat.FormatMathString(value, true);
        mathContainer.innerHTML = variableText;

    }

    populateWants(value) {
        this.variable = document.createElement("div");
        this.variable.id = "mathvar" + value;

        this.variable.classList.add("knowsWants");
        this.wants.htmlElement.appendChild(this.variable);
        var mathContainer = EquationHTML.createMathML(this.variable);
        
        var variableText = MathFormat.FormatMathString(value, true);
        mathContainer.innerHTML = variableText;
    }
}