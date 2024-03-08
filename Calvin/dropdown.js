const dropdowns = document.querySelectorAll(".dropdown");

function openDropdown(dropdown) {
  dropdown.querySelector(".dropdown-list").style.display = "flex";
  dropdown.querySelector(".dropdown-arrow").textContent = "▲";
}

function closeDropdown(dropdown) {
  dropdown.querySelector(".dropdown-list").style.display = "none";
  dropdown.querySelector(".dropdown-arrow").textContent = "▼";
}

function closeAllDropdowns() {
  dropdowns.forEach(closeDropdown);
}

// closes all dropdowns when the mouse is clicked on anything that is not a dropdown
document.addEventListener("click", (event) => {
  if (!event.target.closest(".dropdown")) {
    closeAllDropdowns();
  }
});

// controls each dropdown
dropdowns.forEach((dropdown) => {
  const list = dropdown.querySelector(".dropdown-list");
  const buttonText = dropdown.querySelector(".dropdown-button-text");

  dropdown.querySelector(".dropdown-button").addEventListener("click", () => {
    if (list.style.display === "flex") {
      closeDropdown(dropdown);
    } else {
      closeAllDropdowns();
      openDropdown(dropdown);
    }
  });

  list.querySelectorAll(".dropdown-option").forEach((value) => {
    value.addEventListener("click", () => {
      buttonText.textContent = value.textContent;
      closeDropdown(dropdown);
    });
  });
});
