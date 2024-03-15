class ButtonDiv {
    constructor(parent,previousPage,NextPage) {
        this.buttonDiv = document.createElement("div");
        this.buttonDiv.className = "ButtonDiv";
        var prev = document.createElement("button");
        prev.innerHTML = "Back";
        prev.addEventListener("click", (event) => {

        });
        var next = document.createElement("button");
        next.innerHTML = "Continue";
        this.buttonDiv.appendChild(prev);
        this.buttonDiv.appendChild(next);
        parent.appendChild(this.buttonDiv);
    }
}

new ButtonDiv(document.getElementById("side-panel"),"prev.hml", "next.html");