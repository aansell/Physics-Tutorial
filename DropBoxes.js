export class dropBoxDiv {
  htmlElement;
  allowedClasses;

  constructor(parent, headerText, allowed = new Array, onlyOneDraggable = false) {
    this.htmlElement = document.createElement("div");
    this.htmlElement.id = "text-container";
    this.htmlElement.className = "dropbox";
    parent.appendChild(this.htmlElement);
    this.addHeader(headerText);
    this.htmlElement.addEventListener("dragover", this.#allowDrop);
    this.htmlElement.addEventListener("drop", this.#drop);

    this.allowedClasses = new Array;
    if(allowed instanceof Array) {
      allowed.forEach((name) => {
        this.allowedClasses.push(name);
      });
    } else {
      this.allowedClasses.push(allowed);
    }

    this.htmlElement.allowed = this.allowedClasses;
    if(onlyOneDraggable == true) {
      this.htmlElement.hasChild = false;
    }
  }
  addHeader(text) {
    const header = document.createElement("h3");
    header.textContent = text;
    this.htmlElement.appendChild(header);
  }
  
  #allowDrop(ev) {
    ev.preventDefault();
  }
  
  #drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("currentlyDragging");
    var draggedElement = document.getElementById(data);
    // ev.target.parentNode.insertBefore(draggedElement, ev.target.nextSibling);
    if(draggedElement instanceof HTMLDivElement) {
      var removeFromParent = true;
      if(typeof ev.target.hasChild == 'undefined') {
        removeFromParent = false;
      }

      if (typeof ev.target.allowed == 'undefined') {
        return;
      }
      
      if(typeof ev.target.hasChild == 'undefined') {
        ev.target.allowed.forEach((name) => {
          if(draggedElement.classList.contains(name)) {
            if(removeFromParent == true) {
              draggedElement.parentElement.hasChild = false;
            }
            ev.target.appendChild(draggedElement);
            return;
          }
        });
      } else {
        if(ev.target.hasChild == false) {
          ev.target.allowed.forEach((name) => {
            if(draggedElement.classList.contains(name)) {
              if(removeFromParent == true) {
                draggedElement.parentElement.hasChild = false;
              }
              ev.target.appendChild(draggedElement);
              ev.target.hasChild = true;
              return;
            }
          });
        }
      }
    } else {
      throw Error("Couldn't find dragged element.");
    }
  }

  addDraggableClass(name) {
    this.allowedClasses.push(name);
  }
}

export class Draggable {
  htmlElement;

  constructor(id, parent, classes) {

    this.htmlElement = document.createElement("div");
    this.htmlElement.draggable = true;
    this.htmlElement.id = id;

    if(classes instanceof Array) {
      classes.forEach(className => {
        this.htmlElement.classList.add(className);
      });
    } else {
      this.htmlElement.classList.add(classes);
    }

    parent.appendChild(this.htmlElement);

    this.htmlElement.addEventListener("dragstart", this.#drag);
    // this.htmlElement.addEventListener("dragover", this.#allowDrop);
    // this.htmlElement.addEventListener("drop", this.#drop);
  }

  #drag(ev) {
    ev.dataTransfer.setData("currentlyDragging", ev.target.id);
  }
}


