document.getElementById("toggle-btn").addEventListener("click", togglePanel);

function togglePanel() {
  var panel = document.getElementById("side-panel");
  var icon = document.getElementById("toggle-icon");

  panel.classList.toggle("open");

  if (panel.classList.contains("open")) {
    icon.innerHTML = "arrow_back_ios";
    document.getElementById("toggle-btn").style.right = "77%"; // Move button to the right when panel is open
  } else {
    icon.innerHTML = "arrow_forward_ios";
    document.getElementById("toggle-btn").style.right = "97%"; // Move button back to original position
  }
}