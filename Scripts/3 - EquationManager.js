import { EquationJSON } from "./1 - EquationInfo.js";
import { EquationHTML } from "./2 - EquationElement.js";
import { Draggable, DropBox } from "./2 - DropBoxes.js";


/* Parses the Equation.json and puts all the equaitons into the equation bank. */
export class EquationDiv {
  box;

  equationsJSON;
  equationDivs;

  constructor(parent, headerText) {
    this.box = new DropBox(parent, "equationBox", headerText);
    this.box.addDraggableClass("draggableEquations");

    this.equationsJSON = new EquationJSON;
    this.equationDivs = new Array();

    this.addAllEquations(this.box.htmlElement);
  }

  async addAllEquations(whereToPutIt) {
    const equationLength = await this.equationsJSON.size();
    for(var i = 0; i < equationLength; i++){
      var eq = await this.equationsJSON.at(i);
      this.createEquation(eq, whereToPutIt);
    }
  }

  createEquation(equationObject, whereToPutIt){
    var dragContainer= new Draggable("equation" + equationObject.name, whereToPutIt, ["divOne", "draggableEquations"]);
    
    this.equationDivs.push(new EquationHTML(equationObject, dragContainer.htmlElement));
  }

  addHeader(text) {
    var header = document.createElement("h3");
    header.textContent = text;
    this.box.htmlElement.appendChild(header);
  }
}