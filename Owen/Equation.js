class Variable {
    /* */
    constructor(name, power) {
        if(typeof(name) != 'string') throw new Error("Constructor for class Variable takes parameter name as a string. Name was not a string.");
        if(typeof(power) != 'bigint') throw new Error("Constructor for class Variable takes parameter power as a number. Power was not a number.");
        this.name = name;
        this.power = power;
    }
}

class Term {
    /* variables should be an array of Variable */
    constructor(variables) {
        if(!Array.isArray(variables)) throw new Error("Constructor for class Term takes an array of objects. No array was provided.");
        
        this.variables = variables; 
    }
}

class Equation {
    /* varName = equation
    equation should be a 3-dimensional array.
    first level is summed: [[]] + [[]] */
    constructor(varName, equation) {

    }


    
}