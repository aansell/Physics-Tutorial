export class Dropdown {
    element;
    button;
    arrow;
    list;
    dropElements;

    constructor(alldrops, parent, buttonText, dropText, classes) {

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
        var text = document.createElement("p");
        text.classList.add("dropdown");
        text.classList.add("dropdown-button-text");
        text.textContent = buttonText;
        this.button.appendChild(text);

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
        dropText.forEach((value) => {
            var el = document.createElement("button");
            el.classList.add("dropdown");
            el.classList.add("dropdown-option");
            el.textContent = value;

            if(value === "") {
                el.addEventListener("click", () => {
                    text.textContent = buttonText;
                    alldrops.closeAll();
                });
            } else {
                el.addEventListener("click", () => {
                    text.textContent = el.textContent;
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
