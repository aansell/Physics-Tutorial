import { dropBoxDiv, Draggable } from "./DropBoxes.js";
import { equationJSON } from "./Owen/EquationToHTML.js";

export class Problem {
    text;
    equation;
    knows;
    wants;

    constructor(problemObject) {
        this.text = problemObject.text;
        this.equation = problemObject.equation;
        this.knows = new Array;
        this.wants = new Array;

        for (var i = 0; i < problemObject.variables.length; i++) {
            if(problemObject.variables[i].value != null){
                var name = problemObject.variables[i].name;
                this.knows.push(name);
            } else {
                var name = problemObject.variables[i].name;
                this.wants.push(name);
            }
        }
    } 
}

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


export class ProblemsHTML {
    problem;
    knowsElement;
    wantsElement;
    dragContainer;
    variable;

    constructor(problemObject, knowsContainer, wantsContainer) {
        if(problemObject instanceof Problem && knowsContainer instanceof dropBoxDiv && wantsContainer instanceof dropBoxDiv) {
            this.problem = problemObject;

            knowsContainer.addDraggableClass("knows");
            this.knowsElement = knowsContainer.htmlElement;
            this.wantsElement = wantsContainer.htmlElement;

            this.problem.knows.forEach((item) => {
                this.populateKnows(item);
            });
            this.problem.wants.forEach((item) => {
                this.populateWants(item);
            });
        } else {
            throw Error("Problem object not of type Problem OR Knows container or wants container not of type dropBoxDiv.");
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