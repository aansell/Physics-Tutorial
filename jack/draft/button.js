class ButtonDiv {
    constructor(parent,previousPage,NextPage) {
        this.buttonDivRight = document.createElement("div");
        this.buttonDivLeft = document.createElement("div");

        this.buttonDivRight.className = "ButtonDiv";
        this.buttonDivLeft.className = "ButtonDiv";

        var buttonLeft = document.createElement("button");
        buttonLeft.innerText = "Previous";
        var buttonRight = document.createElement("button");
        buttonRight.innerText = "Continue";

        this.buttonDivLeft.appendChild(buttonLeft);
        this.buttonDivRight.appendChild(buttonRight);



        parent.appendChild(this.buttonDivRight);
        parent.appendChild(this.buttonDivLeft);
    }
}

new ButtonDiv(document.getElementById("buttonDiv"),"prev.hml", "next.html");