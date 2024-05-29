/* Parses the Equation.json and puts the equations into an array of class Equation.
Async functions are weird and you look into them before touching them. */
export class EquationJSON {
    #equations;
    htmlEqs;
  
    constructor() {
        var jsonEquations = fetch("./JSON Files/Equation.json").then(response => response.json());
        this.#equations = jsonEquations.then((result) => {
            var equations = new Array();
            result.forEach(item => {
                equations.push(new Equation(item));
            });
            return equations;
        });

        this.htmlEqs = new Array();
    }
  
    async size() {
        return this.#equations.then((result) => {
            return result.length;
        });
    }

    async then(func) {
        return this.#equations.then((result) => { func(result); });
    }

    async at(index) {
        return this.#equations.then((result) => { return result[index]; });
    }
}

/* Storing an equation but it does it in a way that should be fairly easy to manipulate algebraicly.
For example, instead of storing subtraction, it stores as addition of a negative number. */
export class Equation {
    name;
    left;
    right;

    /* operator =
    equation should be a json object */
    constructor(equation) {
        this.name = equation.name;
        if(!Array.isArray(equation.content)) throw new Error("Equation content should be an array.");

        if(typeof equation.content[0] == "object") {
            this.left = new Operation(equation.content[0]);
        } else {
            this.left = equation.content[0];
        }

        if(typeof equation.content[1] == "object") {
            this.right = new Operation(equation.content[1]);
        } else {
            this.right = equation.content[1];
        }
    }

    findVariable(name, replacement = null) {
        var success = this.left.findInContent(name, replacement);
        if(success) {
            return true;
        }
        success = this.right.findInContent(name, replacement);
        return success;
    }
}

/* This stores one specific operation of the equation, ex. addition, multiplaction.
Contains the operation stored as a single character (+, *, ^), and
an array of all the stuff that operation is being applied to ex. x + y + z --> operation = "+"; content = [x, y, z]
Operations can also store other opterations in their array ex. x * (y + z) --> operation = "*"; content = [x, operation { operation = "+"; content = [y, z] } ] */
export class Operation {
    operation;
    content;

    /* */
    constructor(operObject) {
        if(operObject instanceof Operation) return operObject;

        if(typeof operObject.operation != "string") throw new Error("Constructor for class Operation takes parameter operation as a string. Operation was not a string.");
        if(!Array.isArray(operObject.content))  throw new Error("Constructor for class Operation takes parameter content as an array. Content was not an array.");
        
        if(operObject.operation == "-") {
            this.operation = "+";
            var second = {operation: "*", content: [operObject.content[1], -1]};
            this.content = [operObject.content[0], new Operation(second)];
        } else if(operObject.operation == "/") {
            this.operation = "*";
            var second = {operation: "^", content: [operObject.content[1], -1]};
            this.content = [operObject.content[0], new Operation(second)];
        } else if(operObject.operation == "+" || operObject.operation == "*" || operObject.operation == "^") {     
            this.operation = operObject.operation;
            this.content = operObject.content;
        } else {
            throw new Error("Unrecognized operation passed to Operation constructor.");
        }

        this.content.forEach((item, index, arr) => {
            if(typeof item == "object") {
                arr[index] = new Operation(item);
            }
        });
    }

    findInContent(item, replacement = null) {
        this.content.forEach((term, index) => {
            if(term instanceof Operation) {
                var result = term.findInContent(item, replacement);
                if(result) return true;
            } else {
                if(term == item) {
                    if(replacement != null) {
                        this.content[index] = replacement;
                    }
                    return true;
                }
            }
        });
        return false;
    }
}