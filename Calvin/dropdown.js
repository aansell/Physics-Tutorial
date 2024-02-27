document.querySelectorAll(".dropdown").forEach(function(dropdown) {
    let button = dropdown.querySelector(".dropdown-button");
    let content = dropdown.querySelector(".dropdown-list");
  
    button.addEventListener("click", function() {
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "flex";
      }
    });
  });