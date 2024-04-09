/*
class variableDiv {
  constructor(parent, name, value) {
    this.variable = document.createElement("div");
    this.variable.id = name;
    this.variable.className = "variableDiv";
    parent.appendChild(this.variable);
    this.variable.draggable = "true";
    this.variable.addEventListener("dragstart", drag);
    if(value == null) {
      this.variable.innerHTML = name + " = ?";
    } else {
      this.variable.innerHTML = name + " = " + value;
    }
  }
}
*/

class dropBoxDiv {
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

class equationDiv {
  constructor(parent, headerText) {
    this.variable = document.createElement("div");
    this.variable.id = "equationBox";
    parent.appendChild(this.variable);
    this.addHeader(headerText);

    this.divOne = document.createElement("div");
    this.divOne.draggable = true;
    this.divOne.className = "divOne";
    this.divOne.id = "eqution0";
    this.variable.appendChild(this.divOne);

    const divOneHeader = document.createElement("h3");
    divOneHeader.textContent = "v = d/t";
    this.divOne.appendChild(divOneHeader);

    this.divOne.addEventListener("dragstart", drag);

    this.variable.addEventListener("dragover", allowDrop);
    this.variable.addEventListener("drop", drop);
  }
  addHeader(text) {
    const header = document.createElement("h3");
    header.textContent = text;
    this.variable.appendChild(header);
  }
}

class boxDiv {
  constructor(parent) {
    this.variable = document.createElement("div");
    parent.appendChild(this.variable);
    this.variable.id = "mainEquationBox";
    
    this.divOne = document.createElement("div");
    this.divOne.draggable = true;
    this.divOne.className = "divOne";
    this.divOne.id = "equation1";
    this.variable.appendChild(this.divOne);

    const divOneHeader = document.createElement("math");
    var x = document.createElement("mi");
    divOneHeader.appendChild(x);
    x.textContent = "x";

    var equals = document.createElement("mo");
    divOneHeader.appendChild(equals);
    equals.textContent = "=";

    var sub = document.createElement("msub");
    divOneHeader.appendChild(sub);
    sub.textContent = "0";

    var acceleration = document.createElement("mi");
    divOneHeader.appendChild(acceleration);
    acceleration.textContent = "a";

    var time = document.createElement("mi");
    divOneHeader.appendChild(time);
    time.textContent = "t";

    var sup = document.createElement("sup");
    divOneHeader.appendChild(sup);
    sup.textContent = 2;

    this.divOne.appendChild(divOneHeader);

    this.divOne.addEventListener("dragstart", drag);

    this.variable.addEventListener("dragover", allowDrop);
    this.variable.addEventListener("drop", drop);
  }
}

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
    // Swap the positions of the dragged element and the target element
    ev.target.parentNode.insertBefore(draggedElement, ev.target.nextSibling);
  } else {
    ev.target.appendChild(draggedElement);
  }
}

  
/*
//Parsing data from JSON file
var letter = "F";
fetch('problems.json') // Assuming problems.json is the file containing the JSON data
  .then(response => response.json()) // Parse the JSON from the response
  .then(problem => {
    // Once JSON is parsed successfully, update the HTML
    var container = document.getElementById("content");
    problem[0].variables.forEach(item => {
      new variableDiv(container, item.name, item.value);
    });
  })
  .catch(error => {

    console.error('Error fetching or parsing JSON:', error);
  });
*/

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

function createDropBox() {
var parentDiv = document.getElementById("panel-content");
var parentBoxDiv = document.getElementById("main-content")
new dropBoxDiv(parentDiv, "Knowns");
new dropBoxDiv(parentDiv, "Unknowns");
new equationDiv(parentDiv, "Equations");
new boxDiv(parentBoxDiv);
}



/*
// Knowns/unknowns HTML code translated to JS
<div id="text-container">
    <p id="knowns">Knowns</p>
    <p id="unknowns">Unknowns</p>
</div>

<div class="container">
    <p>
    <div id="dropbox1" ondrop="drop(event)" ondragover="allowDrop(event)"></div> 
</p>
<p>
    <div id="dropbox2" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
</p>
*/
createDropBox();