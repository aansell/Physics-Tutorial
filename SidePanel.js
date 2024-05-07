import { equationJSON } from "./Owen/EquationToHTML.js";
import { dropBoxDiv, Draggable } from "./DropBoxes.js"
import { problemsJSON } from "./ProblemToHTML.js";

export class equationDiv {
  divOne;
  box;

  equations;

  constructor(parent, headerText) {
    this.box = new dropBoxDiv(parent, headerText);
    this.box.addDraggableClass("draggableEquations");

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
    
    this.divOne = new Draggable("equation" + iteration.toString(), this.box.htmlElement, ["divOne", "draggableEquations"]);
    
    this.equations.addToHTML(iteration, this.divOne.htmlElement);
  }

  addHeader(text) {
    const header = document.createElement("h3");
    header.textContent = text;
    this.box.htmlElement.appendChild(header);
  }
}

function createDropBoxes() {
  var parentDiv = document.getElementById("panel-content");
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
  
createDropBoxes();