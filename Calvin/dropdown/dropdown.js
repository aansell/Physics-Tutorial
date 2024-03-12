// finds all the dropdowns when the page loads
const dropdowns = document.querySelectorAll(".dropdown");

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
  dropdowns.forEach(closeDropdown);
}

// closes all dropdowns when the mouse is clicked on anything that is not a dropdown
document.addEventListener("click", (event) => {
  if (!event.target.closest(".dropdown")) {
    closeAllDropdowns();
  }
});

// adds event listeners to each dropdown
dropdowns.forEach((dropdown) => {
  const list = dropdown.querySelector(".dropdown-list");
  const buttonText = dropdown.querySelector(".dropdown-button-text");

  // toggles the given dropdown and closes all other dropdowns when opened
  dropdown.querySelector(".dropdown-button").addEventListener("click", () => {
    if (list.style.display === "flex") {
      closeDropdown(dropdown);
    } else {
      closeAllDropdowns();
      openDropdown(dropdown);
    }
  });

  // changes the text of the dropdown when one of the values is clicked and closes the dropdown
  list.querySelectorAll(".dropdown-option").forEach((value) => {
    value.addEventListener("click", () => {
      buttonText.textContent = value.textContent;
      closeDropdown(dropdown);
    });
  });
});
