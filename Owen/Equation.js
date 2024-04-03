class Operation {
    operation;
    content;

    /* */
    constructor(operObject) {
        if(operObject instanceof Operation) return operObject;

        if(typeof operObject.operation != "string") throw new Error("Constructor for class Operation takes parameter operation as a string. Operation was not a string.");
        this.operation = operObject.operation;
        if(!Array.isArray(operObject.content))  throw new Error("Constructor for class Operation takes parameter content as an array. Content was not an array.");
        
        if(operObject.operation == "-") {
            operObject.operation = "+";
            this.content = [operObject.content[0], null];
            this.content[1] = new Operation("*", [operObject.content[1], -1]);
        } else if(operObject.operation == "/") {
            operObject.operation = "*";
            this.content = [operObject.content[0], null];
            this.content[1] = new Operation("^", [operObject.content[1], -1]);
        } else if(operObject.operation == "+" || operObject.operation == "*" || operObject.operation == "^") {
            this.content = operObjectcontent;
        } else {
            throw new Error("Unrecognized operation passed to Operation constructor.");
        }

        this.content.forEach(item, index, arr => {
            if(typeof item == "object") {
                arr[index] = new Operation(item);
            }
        })
    }
}

class Equation {
    left;
    right;

    /* operator =
    equation should be a json object */
    constructor(equation) {
        if(equation.operation != "=") throw new Error("First level of equation should be operator =");
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
}


var jsonEquations = fetch("Equation.json").then(response => response.json());
var equations = new Array();

jsonEquations.then(result => {
    result.forEach(item => {
        equations.push(new Equation(item));
    })
});