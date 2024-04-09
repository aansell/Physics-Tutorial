function FormatItem(item, whereToPutIt) {
    if(typeof(item) == "string") {
        var inBrackets = false;
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
        });

        if(contents.toLowerCase() == "delta") {
            item = item.replace('{' + contents + '}', "Δ");
        }

        var variableName = document.createElement("mi");
        variableName.textContent = item;
        whereToPutIt.appendChild(variableName);
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
    if(operation.operation == "^") {
        var newParent = document.createElement("msup");
        whereToPutIt.appendChild(newParent);
        whereToPutIt = newParent;
        includeOperation = false;
    }
    if(operation.operation == "*") {
        operation.operation = "•";
    }
    
    operation.content.forEach((item, index) => {
        if(includeOperation && index != 0) {
            var operationOb = document.createElement("mo");
            operationOb.textContent = operation.operation;
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
    var mathContainer = document.createElement("math");
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
}

