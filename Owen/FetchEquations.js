import { Equation } from "./Equation.js";
import { EquationToHTML } from "./EquationToHTML.js";

var jsonEquations = fetch("Equation.json").then(response => response.json());

jsonEquations.then(result => {
    var equations = new Array();
    result.forEach(item => {
        var eq = new Equation(item);
        var result = eq.findVariable("{delta}d", "d");
        console.log(result);
        equations.push(eq);
        EquationToHTML(eq, document.body);
    });
});