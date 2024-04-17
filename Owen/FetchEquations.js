import { Equation } from "./Equation.js";
import { EquationToHTML } from "./EquationToHTML.js";

var jsonEquations = fetch("Equation.json").then(response => response.json());

jsonEquations.then(result => {
    var equations = new Array();
    result.forEach(item => {
        equations.push(new Equation(item));
    });
    return equations;
}).then(result => {
    result.forEach((eq) => {
        EquationToHTML(eq, document.body);
    });
});