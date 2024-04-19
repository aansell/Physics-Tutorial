



export class dropBoxDiv {
  constructor(parent, headerText) {
    this.variable = document.createElement("div");
    this.variable.id = "text-container";
    this.variable.className = "dropbox";
    parent.appendChild(this.variable);
    this.addHeader(headerText);
    this.variable.addEventListener("dragover", allowDrop); // Use "dragover" without "on"
    this.variable.addEventListener("drop", drop); // Use "drop" without "on"
  }
  addHeader(text) {
    const header = document.createElement("h3");
    header.textContent = text;
    this.variable.appendChild(header);
  }
}

export class Draggable {
  container;

  constructor(parent) {

    this.container = document.createElement("div");
    this.container.draggable = true;
    this.container.className = "divOne";
    this.container.classList.add("equation0");

    parent.appendChild(this.container);
    this.container.addEventListener("dragstart", drag);
    this.container.addEventListener("dragover", allowDrop);
    this.container.addEventListener("drop", drop);
  }
}



/*
class boxDiv {
  constructor(parent) {
    this.variable = document.createElement("div");
    parent.appendChild(this.variable);
    this.variable.id = "mainEquationBox";
    
    const divOneHeader = document.createElement("div");
   
    this.variable.addEventListener("dragover", allowDrop);
    this.variable.addEventListener("drop", drop);
  }
}
*/

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  var draggedElement = document.getElementById(data);
  if (ev.target.className === "divOne") {
    ev.target.parentNode.insertBefore(draggedElement, ev.target.nextSibling);
  } else {
    ev.target.appendChild(draggedElement);
  }
}



document.getElementById("toggle-btn").addEventListener("click", togglePanel);

function togglePanel() {
  var panel = document.getElementById("side-panel"); // Get reference to the side panel
  var icon = document.getElementById("toggle-icon"); // Get reference to the toggle button icon
  var toggleBtn = document.getElementById("toggle-btn"); // Get reference to the toggle button

  panel.classList.toggle("open"); // Toggle the 'open' class of the side panel

  if (panel.classList.contains("open")) { // If the panel is open
    icon.innerHTML = "arrow_back_ios"; // Change the icon to 'arrow_back_ios'
    toggleBtn.style.right = "77%"; // Move button to the right when panel is open
  } else { // If the panel is closed
    icon.innerHTML = "arrow_forward_ios"; // Change the icon to 'arrow_forward_ios'
    toggleBtn.style.right = "97%"; // Move button back to original position
  }
}

