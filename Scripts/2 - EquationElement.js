import { Equation, Operation } from "./1 - EquationInfo.js";
import { MathFormat } from "./1 - MathFormatting.js";

/* This one takes an instance of the Equation class, and puts it into the HTML with MathJax Format.  */
export class EquationHTML {
    mathContainer;

    constructor(equation, parent) {
        if(!(equation instanceof Equation)) throw Error("Variable of type Equaiton must be passed to parameter e of EquationToHTML().");

        this.mathContainer = EquationHTML.createMathML(parent);
    
        EquationHTML.FormatItem(equation.left, this.mathContainer);
    
        var operationOb = document.createElement("mo");
        operationOb.textContent = "=";
        this.mathContainer.appendChild(operationOb);
    
        EquationHTML.FormatItem(equation.right, this.mathContainer);


        MathJax.typesetPromise()
            .catch((err) => console.log('MathJax typesetting failed: ' + err));
    }

    static createMathML(whereToPutIt) {
        var mathContainer = document.createElementNS("http://www.w3.org/1998/Math/MathML", "math");
        mathContainer.classList.add("equation");
        whereToPutIt.appendChild(mathContainer);

        return mathContainer;
    }

    static FormatItem(item, whereToPutIt) {
        if(whereToPutIt instanceof Node) {
            if(item instanceof Operation) {
                this.#OperationToHTML(item, whereToPutIt);
            } else if(typeof(item) == "string") {
                var formattedString = MathFormat.FormatMathString(item, true);
                whereToPutIt.insertAdjacentHTML("beforeend", formattedString);
            } else if(typeof(item) == "number") {
                var variableName = document.createElement("mn");
                variableName.textContent = item;
                whereToPutIt.appendChild(variableName);
            } else {
                throw Error("Unrecognized type of item.");
            }
        } else {
            throw Error("WhereToPutIt is not an htmlElement");
        }
    }
    
    static #OperationToHTML(operation, whereToPutIt) {
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
                    if(term.operation == "^" && typeof(term.content[1]) == "number") {
                        if(term.content[1] < 0) {
                            createFrac = true;
                        }
                    }
                }
            });
        }
    
        if(createFrac) {
            var fraction = document.createElement("mfrac");
            whereToPutIt.appendChild(fraction);
            var numerator = document.createElement("mrow");
            fraction.appendChild(numerator);
            var denominator = document.createElement("mrow");
            fraction.appendChild(denominator);
    
            operation.content.forEach((term) => {
                var inDenominator = false;
                if(term instanceof Operation) {
                    if(term.operation == "^" && typeof(term.content[1]) == "number") {
                        if(term.content[1] < 0) {
                            if(term.content[1] == -1) {
                                this.FormatItem(term.content[0], denominator);
                            } else {
                                term.content[1] = Math.abs(term.content[1]);
                                this.FormatItem(term, denominator);
                            }
                            inDenominator = true;
                        }
                    }
                }
                if(!inDenominator) {
                    this.FormatItem(term, numerator);
                }
            });
                return;
        }
    
        if(includeOperation) {
            var newParent = document.createElement("mrow");
            whereToPutIt.appendChild(newParent);
            whereToPutIt = newParent;
        }
    
    
        var displayOp = operation.operation;
        if(operation.operation == "*") {
            displayOp = "";
        }
        
        operation.content.forEach((item, index) => {
            if(includeOperation && index != 0) {
                var operationOb = document.createElement("mo");
                operationOb.textContent = displayOp;
                whereToPutIt.appendChild(operationOb);
            }
    
            this.FormatItem(item, whereToPutIt);
        });
    }

    delete() {
        this.mathContainer.remove();
    }
}