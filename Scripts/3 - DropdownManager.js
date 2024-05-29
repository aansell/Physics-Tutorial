import { Problem } from "./1 - ProblemInfo.js";
import { MathFormat } from "./1 - MathFormatting.js";
import { Dropdown } from "./2 - Dropdowns.js";

/* Managaes connected dropdown funcitonality, like closing all of the dropdowns when something is clicked.
It also creates new dropdown rows when something is selected in the final row. */
export class AllDropdowns {
    knowsParent;
    wantsParent;
    knowsDrops;
    wantsDrops;
    knowsRows;
    wantsRows;

    constructor(parent) {
        this.knowsRows = 0;
        this.wantsRows = 0;

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

        document.addEventListener("click", (event) => {
            if(event.target.matches(".dropdown-option") && event.target.innerHTML !== "" && event.target.dropdown.knowsOrWants != undefined) {
                var drop = event.target.dropdown;
                if(drop.knowsOrWants == true) {
                    if(drop.rowIndex == this.knowsRows) {
                        this.#addDropdownRow(drop.problem, true);
                    }
                } else {
                    if(drop.rowIndex == this.wantsRows) {
                        this.#addDropdownRow(drop.problem, false);
                    }
                }
            }
        });
    }

    #addHeader(text, parent) {
        const header = document.createElement("h3");
        header.textContent = text;
        parent.appendChild(header);
    }

    #addDropdownRow(problemObject, knowsOrWants) { // At some point add code that creates the units dropdown here.
        var names = new Array;
        problemObject.variableNames.forEach((item) => {
            names.push(MathFormat.FormatMathString(item));
        });
        if(knowsOrWants == true) {
            var drop = new Dropdown(this, this.knowsParent, "Variable Name", names, []);
            this.knowsRows++;
             // Javascript is wierd and allows you to make members of a class outisde of the constructor. Don't ask me why. But that's what's happening here. Basically you can reference this later with other stuff.
            drop.knowsOrWants = true;
            drop.rowIndex = this.knowsRows;
            drop.problem = problemObject;
            this.knowsDrops.push(drop);
        } else {
            var drop = new Dropdown(this, this.wantsParent, "Variable Name", names, []);
            this.wantsRows++;
            drop.knowsOrWants = false;
            drop.rowIndex = this.wantsRows;
            drop.problem = problemObject;
            this.wantsDrops.push(drop);
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
