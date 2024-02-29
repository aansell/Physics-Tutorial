// closes all dropdowns when the mouse is clicked on anything that is not a dropdown
document.addEventListener("click", function (event) {
  if (!event.target.closest(".dropdown")) {
    document.querySelectorAll(".dropdown").forEach(function (dropdown) {
      dropdown.querySelector(".dropdown-list").style.display = "none";
      dropdown.querySelector(".dropdown-arrow").textContent = "▼";
    });
  }
});

// controls each dropdown
let dropdowns = document.querySelectorAll(".dropdown");
dropdowns.forEach(function (dropdown) {
  let button = dropdown.querySelector(".dropdown-button");
  let buttonText = dropdown.querySelector(".dropdown-button-text");
  let arrow = dropdown.querySelector(".dropdown-arrow");
  let list = dropdown.querySelector(".dropdown-list");
  let values = list.querySelectorAll(".dropdown-value");

  function open() {
    arrow.textContent = "▲";
    list.style.display = "flex";
  }

  function close() {
    arrow.textContent = "▼";
    list.style.display = "none";
  }

  button.addEventListener("click", function () {
    if (list.style.display === "flex") {
      close();
    } else {
      open();
    }
  });

  values.forEach(function (value) {
    value.addEventListener("click", function () {
      buttonText.textContent = value.textContent;
      close();
    });
  });
});
