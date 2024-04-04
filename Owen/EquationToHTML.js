function OperationToString(operation, whereToPutIt) {
    var includeOperation = true;
    if(operation.operation == "^") {
        var newParent = document.createElement("msup");
        whereToPutIt.appendChild(newParent);
        whereToPutIt = newParent;
        includeOperation = false;
    }
    
    operation.content.forEach((item, index) => {
        if(includeOperation && index != 0) {
            var operationOb = document.createElement("mo");
            operationOb.textContent = operation.operation;
            whereToPutIt.appendChild(operationOb);
        }

        if(item instanceof Operation) {
            OperationToString(item, whereToPutIt);
        } else if(typeof(item) == "string") {
            var variableName = document.createElement("mi");
            variableName.textContent = item;
            whereToPutIt.appendChild(variableName);
        } else if(typeof(item) == "number") {
            var variableName = document.createElement("mn");
            variableName.textContent = item;
            whereToPutIt.appendChild(variableName);
        } else {
            throw Error("Something bad happened.");
        }
    })
}

function EquationToString(e, parent) {
    var math = document.createElement("math");
    parent.appendChild(math);
    var mathContainer = document.createElement("mrow");
    math.append(mathContainer);

    if(e.left instanceof Operation) {
    OperationToString(e.left, mathContainer);
    } else if(typeof(e.left) == "string") {
        var variableOb = document.createElement("mi");
        variableOb.textContent = e.left;
        mathContainer.appendChild(variableOb);
    } else if(typeof(e.left) == "number") {
        var numberOb = document.createElement("mn");
        numberOb.textContent = e.left;
        mathContainer.appendChild(numberOb);
    } else {
        throw Error("Something bad happened.");
    }

    var operationOb = document.createElement("mo");
    operationOb.textContent = "=";
    mathContainer.appendChild(operationOb);

    if(e.right instanceof Operation) {
        OperationToString(e.right, mathContainer);
    } else if(typeof(e.right) == "string") {
        var variableOb = document.createElement("mi");
        variableOb.textContent = e.right;
        mathContainer.appendChild(variableOb);
    } else if(typeof(e.right) == "number") {
        var numberOb = document.createElement("mn");
        numberOb.textContent = e.right;
        mathContainer.appendChild(numberOb);
    } else {
        throw Error("Something bad happened.");
    }
}
 

var jsonEquations = fetch("Equation.json").then(response => response.json());

jsonEquations.then(result => {
    var equations = new Array();
    result.forEach(item => {
        equations.push(new Equation(item));
    })
    return equations;
}).then(result => {
    EquationToString(result[0], document.body);
});
