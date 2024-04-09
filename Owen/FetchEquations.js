
var jsonEquations = fetch("Equation.json").then(response => response.json());

jsonEquations.then(result => {
    var equations = new Array();
    result.forEach(item => {
        equations.push(new Equation(item));
    })
    return equations;
}).then(result => {
    EquationToHTML(result[0], document.body);
});