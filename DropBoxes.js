export class dropBoxDiv {
  htmlElement;
  allowedClasses;
  child;

  constructor(parent, id, headerText, allowed = new Array, onlyOneDraggable = false) {
    this.htmlElement = document.createElement("div");
    this.htmlElement.id = id;
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

    if(onlyOneDraggable === true) {
      this.child = null;
    } else {
      this.child = undefined;
    }
    this.htmlElement.dropbox = this;
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
    if(draggedElement instanceof HTMLDivElement) {
      var box = ev.target;
      if (typeof box.drag != 'undefined') { // Not working
        box = ev.target.parentElement;
      }

      if (typeof ev.target.dropbox == 'undefined') {
        return;
      }

      var removeFromParent = true;
      if(typeof draggedElement.parentElement.dropbox.child == 'undefined') {
        removeFromParent = false;
      }
      
      if(typeof box.dropbox.child == 'undefined') {
        box.dropbox.allowedClasses.forEach((name) => {
          if(draggedElement.classList.contains(name)) {
            if(removeFromParent == true) {
              draggedElement.parentElement.child = null;
            }

            box.appendChild(draggedElement);
            return;
          }
        });
      } else {
        box.dropbox.allowedClasses.forEach((name) => {
          if(draggedElement.classList.contains(name)) {
            if(box.dropbox.child !== null) {
              box.dropbox.child.drag.returnHome();
            }

            if(removeFromParent == true) {
              draggedElement.parentElement.child = null;
            }

            box.appendChild(draggedElement);
            box.dropbox.child = draggedElement;
            return;
          }
        });
      }
    }
  }

  addDraggableClass(name) {
    this.allowedClasses.push(name);
  }

  delete() {
    if(this.htmlElement instanceof HTMLElement) {
      this.htmlElement.remove();
    }
    
    this.htmlElement = null;
    this.allowedClasses = null;
  }
}

export class Draggable {
  htmlElement;
  draggedClass;
  #home;

  constructor(id, parent, classes) {
    this.#home = parent;

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
    
    this.htmlElement.drag = this;
  }

  returnHome() {
    this.#home.appendChild(this.htmlElement);
  }

  #drag(ev) {
    ev.dataTransfer.setData("currentlyDragging", ev.target.id);
  }
}