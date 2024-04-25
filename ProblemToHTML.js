import { dropBoxDiv, Draggable } from "./DropBoxes.js";
import { equationJSON } from "./Owen/EquationToHTML.js";

export class problemsJSON{
    problems;
    knowsBox;
    wantsBox;
  
    constructor(whereToPutIt) {
        this.knowsBox = new dropBoxDiv(whereToPutIt, "Knows");
        this.wantsBox = new dropBoxDiv(whereToPutIt, "Unknowns");

        var jsonProblems = fetch("./Owen/Problems.json").then(response => response.json());
        this.problems = jsonProblems.then((result) => {
            var problems = new Array();
            result.forEach(item => {
                problems.push(new Problem(item, this.knowsBox.htmlElement, this.wantsBox.htmlElement));
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

    constructor(problemObject, knowsContainer, wantsContainer) {
        this.text = problemObject.text;        
        this.equation = problemObject.equation;
        this.knows = new Array;
        this.wants = new Array;
        this.knowsElement = knowsContainer;
        this.wantsElement = wantsContainer;
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
    }

    populateKnows(value) {
        var dragContainer = new Draggable("mathvar" + value, this.knowsElement, "knowsWants");
        // Create MathML Element
        var mathContainer = equationJSON.createMathML(dragContainer.container);
        equationJSON.FormatItem(value, mathContainer);
        MathJax.typesetPromise()
            .catch((err) => console.log('MathJax typesetting failed: ' + err));
    }

    populateWants(value) {
        var variable = document.createElement("div");
        variable.classList.add("knowsWants");
        this.wantsElement.appendChild(variable);
        var mathContainer = equationJSON.createMathML(variable);
        equationJSON.FormatItem(value, mathContainer);
        
        MathJax.typesetPromise()
            .catch((err) => console.log('MathJax typesetting failed: ' + err));
    }
}