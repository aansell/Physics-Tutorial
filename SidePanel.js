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
    
    this.divOne = new Draggable("equation" + iteration.toString(), this.variable);

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
  var parentBoxDiv = document.getElementById("main-content")
  new dropBoxDiv(parentBoxDiv, "Knowns");
  new dropBoxDiv(parentBoxDiv, "Unknowns");
  new equationDiv(parentDiv, "Equations");
  new dropBoxDiv(parentDiv, "Knowns and Unknowns")
}


document.getElementById("toggle-btn").addEventListener("click", togglePanel);

function togglePanel() {
  var panel = document.getElementById("side-panel"); // Get reference to the side panel
  var icon = document.getElementById("toggle-icon"); // Get reference to the toggle button icon
  var toggleBtn = document.getElementById("toggle-btn"); // Get reference to the toggle button

  panel.classList.toggle("open"); // Toggle the 'open' class of the side panel

  if (panel.classList.contains("open")) { // If the panel is open
    icon.innerHTML = "arrow_back_ios"; // Change the icon to 'arrow_back_ios'
    toggleBtn.style.right = "77%"; // Move button to the right when panel is open
  } else { // If the panel is closed
    icon.innerHTML = "arrow_forward_ios"; // Change the icon to 'arrow_forward_ios'
    toggleBtn.style.right = "97%"; // Move button back to original position
  }
}
  
createDropBox();