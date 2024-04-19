class problemsJSON{
    problems;
  
    constructor() {
      var jsonProblems = fetch("problems.json").then(response => response.json());
      this.problems = jsonProblems.then((result) => {
        var problems = new Array();
        result.forEach(item => {
          problems.push(new Problem(item));
        })
        return problems;
      });
    }
  
    async size() {
        return this.problems.then((result) => {
            return result.length;
        });
    }
  }

export class Problem {
    text;
    equation;
    knows;
    wants;

    constructor(problemObject) {
        this.text = problemObject.text;        
        this.equation = problemObject.equation;
        for (var i =0; i<variables.length; i++) {
            if(variables[i].value != null){
                this.knows = variables[i].name;
                populateVariables(this.knows, true, "text-container");
            } else {
                this.wants = variables[i].name;
            }
        }
        console.log(this.knows + "knows");
        console.log(this.wants + "wants");
    }
}

function populateVariables(variable, bool, parent) {
    new variable = document.createElement(div);
    
}