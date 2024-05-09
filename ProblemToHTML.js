import { dropBoxDiv, Draggable } from "./DropBoxes.js";
import { equationJSON } from "./Owen/EquationToHTML.js";

export class problemsJSON{
    problems;
    knowsBox;
    wantsBox;

    constructor(whereToPutIt) {
        this.knowsBox = new dropBoxDiv(whereToPutIt, "text-container", "Knows");
        this.wantsBox = new dropBoxDiv(whereToPutIt, "text-container", "Unknowns");

        var jsonProblems = fetch("./Owen/Problems.json").then(response => response.json());
        this.problems = jsonProblems.then((result) => {
            var problems = new Array();
            result.forEach(item => {
                problems.push(new Problem(item, this.knowsBox, this.wantsBox));
            });
            return problems;
        });
    }
  
    async size() {
        return this.problems.then((result) => {
            return result.length;
        });
    }
}

export class Problem {
    text;
    equation;
    knows;
    wants;
    knowsElement;
    wantsElement;
    dragContainer;
    variable;

    constructor(problemObject, knowsContainer, wantsContainer) {
        if(knowsContainer instanceof dropBoxDiv && wantsContainer instanceof dropBoxDiv) {
            this.text = problemObject.text;        
            this.equation = problemObject.equation;
            this.knows = new Array;
            this.wants = new Array;

            knowsContainer.addDraggableClass("knows");
            this.knowsElement = knowsContainer.htmlElement;
            this.wantsElement = wantsContainer.htmlElement;

            for (var i = 0; i < problemObject.variables.length; i++) {
                if(problemObject.variables[i].value != null){
                    var name = problemObject.variables[i].name;
                    this.knows.push(name);
                    this.populateKnows(name);
                } else {
                    var name = problemObject.variables[i].name;
                    this.wants.push(name);
                    this.populateWants(name);
                }
            }
        } else {
            throw Error("Knows container or wants container not of type dropBoxDiv.");
        }
    }

    populateKnows(value) {
        this.dragContainer = new Draggable("mathvar" + value, this.knowsElement, ["knowsWants", "knows"]);
        // Create MathML Element
        var mathContainer = equationJSON.createMathML(this.dragContainer.htmlElement);
        equationJSON.FormatItem(value, mathContainer);
        MathJax.typesetPromise()
            .catch((err) => console.log('MathJax typesetting failed: ' + err));
    }

    populateWants(value) {
        this.variable = document.createElement("div");
        this.variable.id = "mathvar" + value;

        this.variable.classList.add("knowsWants");
        this.wantsElement.appendChild(this.variable);
        var mathContainer = equationJSON.createMathML(this.variable);
        equationJSON.FormatItem(value, mathContainer);
        
        MathJax.typesetPromise()
            .catch((err) => console.log('MathJax typesetting failed: ' + err));
    }
}