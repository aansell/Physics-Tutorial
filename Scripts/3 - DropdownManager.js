import { Problem } from "./1 - ProblemInfo.js";
import { EquationHTML } from "./2 - EquationElement.js";
import { Dropdown } from "./2 - Dropdowns.js";

export class AllDropdowns {
    knowsParent;
    wantsParent;
    knowsDrops;
    wantsDrops;

    constructor(parent) {
        this.knowsParent = document.createElement("div");
        this.wantsParent = document.createElement("div");
        this.knowsParent.classList.add("knows-wants-container");
        this.wantsParent.classList.add("knows-wants-container");
        this.#addHeader("Knows", this.knowsParent);
        this.#addHeader("Wants", this.wantsParent);
        parent.appendChild(this.knowsParent);
        parent.appendChild(this.wantsParent);

        this.knowsDrops = new Array();
        this.wantsDrops = new Array();

        document.addEventListener("click", (event) => {
            if (!event.target.matches(".dropdown")) {
                this.closeAll();
            }
        });
    }

    #addHeader(text, parent) {
        const header = document.createElement("h3");
        header.textContent = text;
        parent.appendChild(header);
    }

    #addDropdownRow(problemObject, knowsOrWants) {
        var names = new Array;
        problemObject.variableNames.forEach((item) => {
            names.push(EquationHTML.FormatMathString(item));
        });
        if(knowsOrWants == true) {
            this.knowsDrops.push(new Dropdown(this, this.knowsParent, "Variable Name", names, []));
        } else {
            this.wantsDrops.push(new Dropdown(this, this.wantsParent, "Variable Name", names, []));
        }
    }

    addToKnows(problemObject) {
        if(problemObject instanceof Problem) {
            this.#addDropdownRow(problemObject, true);
        } else {
            throw Error("problemObject provided to addToKnows not of type Problem.");
        }
    }

    addToWants(problemObject) {
        if(problemObject instanceof Problem) {
            this.#addDropdownRow(problemObject, false);
        } else {
            throw Error("problemObject provided to addToWants not of type Problem.");
        }
    }

    closeAll() {
        this.knowsDrops.forEach((drop) => { drop.close() });
        this.wantsDrops.forEach((drop) => { drop.close() });
    }

    delete() {
        this.knowsParent.remove();
        this.wantsParent.remove();
    }
}
