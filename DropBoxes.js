export class dropBoxDiv {
  htmlElement;

  constructor(parent, headerText) {
    this.htmlElement = document.createElement("div");
    this.htmlElement.id = "text-container";
    this.htmlElement.className = "dropbox";
    parent.appendChild(this.htmlElement);
    this.addHeader(headerText);
    this.htmlElement.addEventListener("dragover", allowDrop); // Use "dragover" without "on"
    this.htmlElement.addEventListener("drop", drop); // Use "drop" without "on"
  }
  addHeader(text) {
    const header = document.createElement("h3");
    header.textContent = text;
    this.htmlElement.appendChild(header);
  }
}

export class Draggable {
  container;

  constructor(id, parent, classes) {

    this.container = document.createElement("div");
    this.container.draggable = true;
    this.container.id = id;

    if(classes instanceof Array) {
      classes.forEach(className => {
        this.container.classList.add(className);
      });
    } else {
      this.container.classList.add(classes);
    }

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


