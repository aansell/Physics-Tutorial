class Operation {
    operation;
    content;

    /* */
    constructor(operation, content) {
        if(typeof(operation) != 'string') throw new Error("Constructor for class Operation takes parameter operation as a string. Operation was not a string.");
        this.operation = operation;
        if(!Array.isArray(content))  throw new Error("Constructor for class Operation takes parameter content as an array. Content was not an array.");
        if(operation == "-") {
            operation = "+";
            this.content = [content[0], null];
            this.content[1] = new Operation("*", [content[1], -1]);
        } else if(operation == "/") {
            operation = "*";
            this.content = [content[0], null];
            this.content[1] = new Operation("^", [content[1], -1]);
        } else if(operation == "+" || operation == "*" || operation == "^") {
            this.content = content;
        } else {
            throw new Error("Unrecognized operation passed to Operation constructor.");
        }
    }
}

class Equation {
    /* operator =
    equation should be a 3-dimensional array.
    first level is summed: [[]] + [[]] */
    constructor(varName, equation) {

    }


    
}