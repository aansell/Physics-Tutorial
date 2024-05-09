import { Button } from "./Buttons.js";
import { equationJSON } from "./Owen/EquationToHTML.js";
import { dropBoxDiv, Draggable } from "./DropBoxes.js"
import { problemsJSON } from "./ProblemToHTML.js";

export class equationDiv {
  divOne;
  box;

  equations;

  constructor(parent, headerText) {
    this.box = new dropBoxDiv(parent, "equationBox", headerText);
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
    var header = document.createElement("h3");
    header.textContent = text;
    this.box.htmlElement.appendChild(header);
  }
}

export class SidePanel {
  element;
  content;
  toggleBtn;

  constructor() {
    this.element = document.createElement("div");
    this.element.id = "side-panel";
    this.element.classList.add("closed");
    document.body.appendChild(this.element);
    this.content = document.createElement("div");
    this.content.id = "panel-content";
    this.element.appendChild(this.content);


    var image = document.createElement("span");
    image.id = "toggle-icon";
    image.classList.add("material-symbols-outlined");
    image.textContent = "arrow_forward_ios";
    
    this.toggleBtn = new Button(document.body, image, "toggle-btn", () => { SidePanel.togglePanel(this); });
    this.toggleBtn.element.classList.add("closed");

    this.#createDropBoxes();

  }

  #createDropBoxes() {
    new equationDiv(this.content, "Equations");
    new problemsJSON(this.content);
  }

  static togglePanel(panel) {
    console.log(panel);

    panel.element.classList.toggle("open");
    panel.element.classList.toggle("closed");

    panel.toggleBtn.element.classList.toggle("open");
    panel.toggleBtn.element.classList.toggle("closed");

    if (panel.element.classList.contains("open")) { 
      panel.toggleBtn.content.innerHTML = "arrow_back_ios"; 
      // panel.toggleBtn.element.style.left = "20%";
    } else {
      panel.toggleBtn.content.innerHTML = "arrow_forward_ios"; 
      // panel.toggleBtn.element.style.left = "0%";
    }
  }

  delete() {
    if(this.element instanceof HTMLElement) {
      this.element.remove();
    }

    if(this.toggleBtn instanceof Button) {
      this.toggleBtn.delete();
    }

    this.element = null;
    this.content = null;
    this.toggleBtn = null;
  }
}