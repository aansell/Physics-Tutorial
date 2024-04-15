class Operation {
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

class Equation {
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
        this.left.findInContent(name, replacement);
        this.right.findInContent(name, replacement);
        // Needs to return a bool
    }
}