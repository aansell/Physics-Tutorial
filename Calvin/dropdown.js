function openDropdown(dropdown) {
  dropdown.querySelector(".dropdown-list").style.display = "flex";
  dropdown.querySelector(".dropdown-arrow").textContent = "▲";
}

function closeDropdown(dropdown) {
  dropdown.querySelector(".dropdown-list").style.display = "none";
  dropdown.querySelector(".dropdown-arrow").textContent = "▼";
}

// closes all dropdowns when the mouse is clicked on anything that is not a dropdown
document.addEventListener("click", (event) => {
  if (!event.target.closest(".dropdown")) {
    document.querySelectorAll(".dropdown").forEach((dropdown) => {
      closeDropdown(dropdown);
    });
  }
});

// controls each dropdown
document.querySelectorAll(".dropdown").forEach((dropdown) => {
  const list = dropdown.querySelector(".dropdown-list");
  const buttonText = dropdown.querySelector(".dropdown-button-text");

  dropdown.querySelector(".dropdown-button").addEventListener("click", () => {
    if (list.style.display === "none") {
      openDropdown(dropdown);
    } else {
      closeDropdown(dropdown);
    }
  });

  list.querySelectorAll(".dropdown-value").forEach((value) => {
    value.addEventListener("click", () => {
      buttonText.textContent = value.textContent;
      closeDropdown(dropdown);
    });
  });
});
