export class Dropdown {
    element;
    button;
    arrow;
    list;
    dropElements;

    constructor(parent, buttonText, dropText, alldrops) {

        // Create dropdown div container
        this.element = document.createElement("div");
        this.element.className = "dropdown_calvin";
        parent.appendChild(this.element);

        // Create dropdown button
        this.button = document.createElement("button");
        this.button.className = "dropdown-button";
        this.element.appendChild(this.button);

        // Create button text
        var text = document.createElement("p");
        text.className = "dropdown-button-text";
        text.textContent = buttonText;
        this.button.appendChild(text);

        // Create dropdown arrow
        this.arrow = document.createElement("p");
        this.arrow.className = "dropdown-arrow";
        this.arrow.textContent = "▼";
        this.button.appendChild(this.arrow);

        // Create dropdown element container
        this.list = document.createElement("div");
        this.list.className = "dropdown-list";
        this.element.appendChild(this.list);
        
        // Create dropdown elements
        this.dropElements = new Array();
        dropText.forEach((value) => {
            var el = document.createElement("button");
            el.className = "dropdown-option";
            el.textContent = value;
            this.list.appendChild(el);
            this.dropElements.push(el);
        });

        // var list = dropdown.element.querySelector(".dropdown-list");
        // var buttonText = dropdown.element.querySelector(".dropdown-button-text");
    
        // toggles the given dropdown and closes all other dropdowns when opened
        this.button.addEventListener("click", () => {
            if (this.list.style.display === "flex") {
                this.close();
            } else {
                alldrops.closeAll();
                this.open();
            }
        });
    
        // changes the text of the dropdown when one of the values is clicked
        this.list.querySelectorAll(".dropdown-option").forEach((value) => {
            value.addEventListener("click", () => {
                text.textContent = value.textContent;
            });
        });
    }

    close() {
        this.list.style.display = "none";
        this.arrow.textContent = "▼";
    }
    
    open() {
        this.list.style.display = "flex";
        this.arrow.textContent = "▲";
    }

    delete() {
        this.element.remove();
    }
}

export class AllDropdowns {
    knowsParent;
    wantsParent;
    dropdowns;

    constructor(parent) {
        this.knowsParent = document.createElement("div");
        this.wantsParent = document.createElement("div");
        this.#addHeader("Knows", this.knowsParent);
        this.#addHeader("wants", this.wantsParent);
        parent.appendChild(this.knowsParent);
        parent.appendChild(this.wantsParent);

        this.dropdowns = new Array();

        document.addEventListener("click", (event) => {
            if (!event.target.matches(".dropdown-button")) {
                this.closeAll();
            }
        });
    }

    #addHeader(text, parent) {
        const header = document.createElement("h3");
        header.textContent = text;
        parent.appendChild(header);
    }

    // knows is true; wants is false
    addDropdown(knowsOrWants, buttonText, dropdownText) {
        if(knowsOrWants) {
            this.dropdowns.push(new Dropdown(this.knowsParent, buttonText, dropdownText, this));
        } else {
            this.dropdowns.push(new Dropdown(this.wantsParent, buttonText, dropdownText, this));
        }
    }

    closeAll() {
        this.dropdowns.forEach((drop) => { drop.close() });
    }

    delete() {
        this.knowsParent.remove();
        this.wantsParent.remove();
    }
}



// opens the given dropdown
/*
function openDropdown(dropdown) {
    dropdown.querySelector(".dropdown-list").style.display = "flex";
    dropdown.querySelector(".dropdown-arrow").textContent = "▲";
  }
  */
  // closes all the dropdowns in the dropdowns list
  

// closes all dropdowns when the mouse is clicked on anything that is not a dropdown-button
