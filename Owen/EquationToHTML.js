function FormatItem(item, whereToPutIt) {
    if(typeof(item) == "string") {
        var inBrackets = false;
        var underscore = false;
        var contents = "";
        [...item].forEach((char) => {
            if(char == '}') {
                inBrackets = false;
            }

            if(inBrackets) {
                contents += char;
            }

            if(char == '{') {
                inBrackets = true;
            }

            if(char == "_") {
                underscore = true;
            }
        });

        if(contents.toLowerCase() == "delta") {
            item = item.replace('{' + contents + '}', "Δ");
        }

        if(underscore) {
            var subscript = document.createElement("msub");
            whereToPutIt.appendChild(subscript);
            item = item.split("_");
            FormatItem(item[0], subscript);
            FormatItem(item[1], subscript);
        } else {
            var variableName = document.createElement("mi");
            variableName.textContent = item;
            whereToPutIt.appendChild(variableName);
        }
    } else if(typeof(item) == "number") {
        var variableName = document.createElement("mn");
        variableName.textContent = item;
        whereToPutIt.appendChild(variableName);
    } else {
        throw Error("Unrecognized type of item.");
    }
}

function OperationToHTML(operation, whereToPutIt) {
    var includeOperation = true;
    var createFrac = false;
    if(operation.operation == "^") {
        var newParent = document.createElement("msup");
        whereToPutIt.appendChild(newParent);
        whereToPutIt = newParent;
        includeOperation = false;
    }
    if(operation.operation == "*") {
        operation.content.forEach((term) => {
            if(term instanceof Operation) {
                if(term.operation = "^" && typeof(term.content[1]) == "number") {
                    if(term.content[1] < 0) {
                        createFrac = true;
                    }
                }
            }
        });
        if(createFrac) {
            // Do some stuff
        }
    }

    if(includeOperation) {
        var newParent = document.createElement("mrow");
        whereToPutIt.appendChild(newParent);
        whereToPutIt = newParent;
    }


    var displayOp = operation.operation;
    if(operation.operation == "*") {
        displayOp = "•";
    }
    
    operation.content.forEach((item, index) => {
        if(includeOperation && index != 0) {
            var operationOb = document.createElement("mo");
            operationOb.textContent = displayOp;
            whereToPutIt.appendChild(operationOb);
        }

        if(item instanceof Operation) {
            OperationToHTML(item, whereToPutIt);
        } else {
            FormatItem(item, whereToPutIt);
        }
    })
}

function EquationToHTML(e, parent) {
    if(!(e instanceof Equation)) throw Error("Variable of type Equaiton must be passed to parameter e of EquationToHTML().");

    var mathContainer = document.createElementNS("http://www.w3.org/1998/Math/MathML", "math");
    mathContainer.classList.add("equation");
    parent.append(mathContainer);

    if(e.left instanceof Operation) {
        OperationToHTML(e.left, mathContainer);
    } else {
        FormatItem(e.left, mathContainer);
    }

    var operationOb = document.createElement("mo");
    operationOb.textContent = "=";
    mathContainer.appendChild(operationOb);

    if(e.right instanceof Operation) {
        OperationToHTML(e.right, mathContainer);
    } else {
        FormatItem(e.right, mathContainer);
    }

    MathJax.typesetPromise()
        .catch((err) => console.log('MathJax typesetting failed: ' + err));

    /*
    document.addEventListener("DOMContentLoaded", function() {
        renderMathInElement(parent);
    });
    */
}

