import { equationJSON } from "./Owen/EquationToHTML.js";
import { Draggable } from "./DropBoxes.js"
import { problemsJSON } from "./ProblemToHTML.js";

export class equationDiv {
  divOne;
  variable;

  equations;

  constructor(parent, headerText) {
    this.variable = document.createElement("div");
    this.variable.id = "equationBox";
    parent.appendChild(this.variable);
    this.addHeader(headerText);

    this.addAllEquations();
  }

  async addAllEquations() {
    this.equations = new equationJSON;

    const equationLength = await this.equations.size();
    console.log(equationLength);
    for(var i = 0; i < equationLength; i++){
      this.createEquation(i);
    }
  }

  createEquation(iteration){
    
    this.divOne = new Draggable("equation" + iteration.toString(), this.variable, "divOne");
    

    this.equations.addToHTML(iteration, this.divOne.container);
  }

  addHeader(text) {
    const header = document.createElement("h3");
    header.textContent = text;
    this.variable.appendChild(header);
  }
}

function createDropBox() {
  var parentDiv = document.getElementById("panel-content");
  var parentBoxDiv = document.getElementById("main-content");
  new equationDiv(parentDiv, "Equations");
  new problemsJSON(parentDiv);
}


document.getElementById("toggle-btn").addEventListener("click", togglePanel);

function togglePanel() {
  var panel = document.getElementById("side-panel"); 
  var icon = document.getElementById("toggle-icon"); 
  var toggleBtn = document.getElementById("toggle-btn"); 

  panel.classList.toggle("open"); 

  if (panel.classList.contains("open")) { 
    icon.innerHTML = "arrow_back_ios"; 
    toggleBtn.style.right = "81%"; 
  } else { 
    icon.innerHTML = "arrow_forward_ios"; 
    toggleBtn.style.right = "97%"; 
  }
}
  
createDropBox();