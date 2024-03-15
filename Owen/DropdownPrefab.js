class Dropdown {
    constructor(parent, buttonText, dropText) {
        // Create dropdown div container
        this.element = document.createElement("div");
        this.element.className = "dropdown_calvin";
        parent.appendChild(this.element);

        // Create dropdown button
        this.button = document.createElement("button");
        this.button.className = "dropdown-button";
        this.element.appendChild(this.button);

        // Create button text
        this.text = document.createElement("p");
        this.text.className = "dropdown-button-text";
        this.text.textContent = buttonText;
        this.button.appendChild(this.text);

        // Create dropdown arrow
        this.arrow = document.createElement("p");
        this.arrow.className = "dropdown-arrow";
        this.arrow.textContent = "▼";
        this.button.appendChild(this.arrow);

        // Create dropdown element container
        this.drop = document.createElement("div");
        this.drop.className = "dropdown-list";
        this.element.appendChild(this.drop);
        
        // Create dropdown elements
        this.dropElements = new Array();
        dropText.forEach((value) => {
            var el = document.createElement("button");
            el.className = "dropdown-option";
            el.textContent = value;
            this.drop.appendChild(el);
            this.dropElements.push(el);
        });
    }
}

var dropdowns = new Array();
var buttonText = "Variables";
var dropdownText = new Array("Δd", "Δt", "v");
dropdowns.push(new Dropdown(document.body, buttonText, dropdownText));
dropdowns.push(new Dropdown(document.body, buttonText, dropdownText));
closeAllDropdowns();

// opens the given dropdown
function openDropdown(dropdown) {
    dropdown.querySelector(".dropdown-list").style.display = "flex";
    dropdown.querySelector(".dropdown-arrow").textContent = "▲";
  }
  
  // closes the given dropdown
  function closeDropdown(dropdown) {
    dropdown.querySelector(".dropdown-list").style.display = "none";
    dropdown.querySelector(".dropdown-arrow").textContent = "▼";
  }
  
  // closes all the dropdowns in the dropdowns list
  function closeAllDropdowns() {
    dropdowns.forEach((drop) => { closeDropdown(drop.element) });
  }

// closes all dropdowns when the mouse is clicked on anything that is not a dropdown-button
document.addEventListener("click", (event) => {
    if (!event.target.matches(".dropdown-button")) {
    closeAllDropdowns();
    }
});

// adds event listeners to each dropdown
dropdowns.forEach((dropdown) => {
    const list = dropdown.element.querySelector(".dropdown-list");
    const buttonText = dropdown.element.querySelector(".dropdown-button-text");

    // toggles the given dropdown and closes all other dropdowns when opened
    dropdown.element.querySelector(".dropdown-button").addEventListener("click", () => {
    if (list.style.display === "flex") {
        closeDropdown(dropdown.element);
    } else {
        closeAllDropdowns();
        openDropdown(dropdown.element);
    }
    });

    // changes the text of the dropdown when one of the values is clicked
    list.querySelectorAll(".dropdown-option").forEach((value) => {
    value.addEventListener("click", () => {
        buttonText.textContent = value.textContent;
    });
    });
});


  