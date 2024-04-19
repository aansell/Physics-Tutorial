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

  constructor(id, parent) {

    this.container = document.createElement("div");
    this.container.draggable = true;
    this.container.classList.add("divOne");
    this.container.id = id;

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
  if (ev.target.classList.contains("divOne")) {
    ev.target.parentNode.insertBefore(draggedElement, ev.target.nextSibling);
  } else if(draggedElement instanceof HTMLDivElement) {
    ev.target.appendChild(draggedElement);
  } else {
    console.log(draggedElement);
    throw Error("Couldn't find dragged element.");
  }
}


