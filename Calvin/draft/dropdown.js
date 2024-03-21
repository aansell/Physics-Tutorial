/*
  <div class="dropdown_calvin">
  <button class="dropdown-button">
      <p class="dropdown-button-text">Variable</p>
      <p class="dropdown-arrow">▼</p>
  </button>
  <div class="dropdown-list">
      <button class="dropdown-option">Δd</button>
      <button class="dropdown-option">Δt</button>
      <button class="dropdown-option">v</button>
  </div>
  </div>
*/

class dropdown {
  constructor(parent, text, values) {
    this.dropdown = document.createElement("div");
    this.dropdown.className = "dropdown_calvin";

    this.button = document.createElement("button");
    this.button.className = "dropdown-button";

    this.text = document.createElement("p");
    this.text.className = "dropdown-button-text";
    this.text.textContent = text;

    this.button.insertAdjacentElement("beforeend", this.text);
    this.button.insertAdjacentHTML(
      "beforeend",
      `<p class="dropdown-arrow">▼</p>`
    );

    this.dropdown.insertAdjacentElement("beforeend", this.button);

    this.list = document.createElement("div");
    this.list.className = "dropdown-list";
    this.dropdown.insertAdjacentElement("beforeend", this.list);

    this.button.addEventListener("click", () => {
      if (this.list.style.display === "flex") {
        closeDropdown(this.dropdown);
      } else {
        closeAllDropdowns();
        openDropdown(this.dropdown);
      }
    });

    values.forEach((value) => {
      const valueTemp = document.createElement("button");
      valueTemp.className = "dropdown-option";
      valueTemp.textContent = value;
      this.list.insertAdjacentElement("beforeend", valueTemp);
      valueTemp.addEventListener("click", () => {
        this.button.querySelector(".dropdown-button-text").textContent = value;
      });
    });

    parent.appendChild(this.dropdown);
  }
}

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
  document.querySelectorAll(".dropdown_calvin").forEach(closeDropdown);
}

// closes all dropdowns when the mouse is clicked on anything that is not a dropdown-button
document.addEventListener("click", (event) => {
  if (
    !(
      event.target.matches(".dropdown-button") ||
      event.target.closest(".dropdown-button")
    )
  ) {
    closeAllDropdowns();
  }
});

new dropdown(document.getElementById("known-dropdowns"), "Test1", [
  "1",
  "2",
  "3",
]);

new dropdown(document.getElementById("known-dropdowns"), "Test2", [
  "15",
  "25",
  "35",
]);
