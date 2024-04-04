class ButtonDiv {
    constructor(parent,previousPage,NextPage) {
        var secondDiv = document.createElement("div");
        //secondDiv.className = "";
        var buttonLeft = document.createElement("button");
        buttonLeft.innerText = "Previous";
        var buttonRight = document.createElement("button");
        buttonRight.innerText = "Continue";
        secondDiv.appendChild(buttonLeft);
        secondDiv.appendChild(buttonRight);
        parent.appendChild(secondDiv);
    }
}

new ButtonDiv(document.getElementById("buttonDiv"),"prev.hml", "next.html");