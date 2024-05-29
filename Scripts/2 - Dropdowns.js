/* Makes a dropdown, but you need it to be created thorugh the class AllDropdowns (3 - DropdownManager.js) for full funcitonality. */
export class Dropdown {
    element;
    button;
    arrow;
    list;
    text;
    dropElements;

    rowIndex;
    #currentSelection;

    constructor(alldrops, parent, buttonText, dropText, classes) {
        this.#currentSelection = -1;

        // Create dropdown div container
        this.element = document.createElement("div");
        this.element.classList.add("dropdown");
        this.element.classList.add("dropdown-container");

        if(classes != undefined) {
            if(classes instanceof Array) {
                classes.forEach((item) => {
                    this.element.classList.add(item);
                });
            } else {
                this.element.classList.add(classes);
            }
        }
        parent.appendChild(this.element);

        // Create dropdown button
        this.button = document.createElement("button");
        this.button.classList.add("dropdown");
        this.button.classList.add("dropdown-button");
        this.element.appendChild(this.button);

        // Create button text
        this.text = document.createElement("p");
        this.text.classList.add("dropdown");
        this.text.classList.add("dropdown-button-text");
        this.text.textContent = buttonText;
        this.button.appendChild(this.text);

        // Create dropdown arrow
        this.arrow = document.createElement("p");
        this.arrow.classList.add("dropdown");
        this.arrow.classList.add("dropdown-arrow");
        this.arrow.textContent = "▼";
        this.button.appendChild(this.arrow);

        // Create dropdown element container
        this.list = document.createElement("div");
        this.list.classList.add("dropdown");
        this.list.classList.add("dropdown-list");
        this.element.appendChild(this.list);
        
        // Create dropdown elements
        dropText.unshift("");
        this.dropElements = new Array();
        dropText.forEach((value, index) => {
            var el = document.createElement("button");
            el.classList.add("dropdown");
            el.classList.add("dropdown-option");
            el.innerHTML = value;
            el.dropdown = this;

            if(value === "") {
                el.addEventListener("click", () => {
                    this.text.innerHTML = buttonText;
                    this.#currentSelection = -1;
                    alldrops.closeAll();
                });
            } else {
                el.addEventListener("click", () => {
                    this.text.innerHTML = el.innerHTML;
                    this.#currentSelection = index - 1;
                    alldrops.closeAll();
                });
            }

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
    }

    getCurrentIndex() {
        return this.#currentSelection;
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

