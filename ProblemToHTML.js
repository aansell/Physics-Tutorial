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

export class ProblemsJSON{
    problems;

    constructor() {
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

    then(func) {
        this.problems.then((problems) => { func(problems); });
    }
}


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
        var mathContainer = equationJSON.createMathML(this.dragContainer.htmlElement);
        equationJSON.FormatItem(value, mathContainer);
    }

    populateWants(value) {
        this.variable = document.createElement("div");
        this.variable.id = "mathvar" + value;

        this.variable.classList.add("knowsWants");
        this.wants.htmlElement.appendChild(this.variable);
        var mathContainer = equationJSON.createMathML(this.variable);
        equationJSON.FormatItem(value, mathContainer);
    }
}