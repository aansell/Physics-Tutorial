export class Button {
    element;
    content;

    constructor(parent, content, id, func) {
        this.element = document.createElement("button");
        this.element.id = id;
        
        
        if(content instanceof HTMLElement) {
            this.content = content;
            this.element.appendChild(content);
        } else {
            this.content = document.createElement("div");
            this.content.textContent = content;
            this.element.appendChild(this.content);
        }

        if(typeof func == "function") {
            this.element.addEventListener("click", () => { func(this); });
        }

        parent.appendChild(this.element);
    }

    delete() {
        if(this.element instanceof HTMLElement) {
            this.element.remove();
        }
        
        this.element = null;
        this.content = null;
    }
}