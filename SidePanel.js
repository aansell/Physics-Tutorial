import { equationJSON } from "./Owen/EquationToHTML.js";
import { dropBoxDiv, Draggable } from "./DropBoxes.js"

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
    
    this.divOne = new Draggable(this.variable);

    this.equations.addToHTML(iteration, divOneHeader);

    // Probably deleted some important stuff here
  }

  addHeader(text) {
    const header = document.createElement("h3");
    header.textContent = text;
    this.variable.appendChild(header);
  }
}

function createDropBox() {
  var parentDiv = document.getElementById("panel-content");
  var parentBoxDiv = document.getElementById("main-content")
  new dropBoxDiv(parentBoxDiv, "Knowns");
  new dropBoxDiv(parentBoxDiv, "Unknowns");
  new equationDiv(parentDiv, "Equations");
  new dropBoxDiv(parentDiv, "Knowns and Unknowns")
}
  
createDropBox();