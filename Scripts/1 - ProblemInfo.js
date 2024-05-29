/* Parses the Problems.json and puts the problems into an array of class Problem.
Async functions are weird and you look into them before touching them. */
export class ProblemsJSON{
    #problems;

    constructor() {
        var jsonProblems = fetch("./JSON Files/Problems.json").then(response => response.json());
        this.#problems = jsonProblems.then((result) => {
            var problems = new Array;
            result.forEach(item => {
                problems.push(new Problem(item, this.knowsBox, this.wantsBox));
            });
            return problems;
        });
    }
  
    async size() {
        return this.#problems.then((result) => {
            return result.length;
        });
    }

    async then(func) {
        return this.#problems.then((result) => { func(result); });
    }

    async at(index) {
        return this.#problems.then((result) => { return result[index]; });
    }
}

/* This just stores all the important information about the problem,
like problem text (what acutally shows up on the screen), the variables in the problem, and their values + units. */
export class Problem {
    text;
    equation;
    knows;
    wants;
    variableNames;
    availableUnits;

    constructor(problemObject) {
        this.text = problemObject.text;
        this.equation = problemObject.equation;

        this.knows = new Array;
        this.wants = new Array;
        this.variableNames = new Array;
        this.availableUnits = new Array;

        for (var i = 0; i < problemObject.variables.length; i++) {
            var name = problemObject.variables[i].name;
            if(problemObject.variables[i].value != null){
                this.knows.push(name);
            } else {
                this.wants.push(name);
            }
            this.variableNames.push(name);
            this.availableUnits.push(problemObject.variables[i].units);
        }
    } 
}

