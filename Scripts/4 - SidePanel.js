import { Button } from "./2 - Buttons.js";
import { ProblemsJSON } from "./1 - ProblemInfo.js";
import { ProblemsHTML } from "./3 - ProblemVariables.js";
import { EquationDiv } from "./3 - EquationManager.js";

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
    new EquationDiv(this.content, "Equations");

    var problemInfo = new ProblemsJSON;
    problemInfo.then((problems) => {
      new ProblemsHTML(problems[0], this.content);
    });
  }

  static togglePanel(panel) {
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