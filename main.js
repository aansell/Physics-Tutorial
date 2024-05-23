import { Button } from "./Scripts/Buttons.js"
import { MainContent } from "./Scripts/MainContent.js";
import { SidePanel } from "./Scripts/SidePanel.js";


var screen = document.getElementById("main-content");
screen.style.width = document.body.offsetWidth;

var mainContent = new MainContent(0);
mainContent.createDropElements();

var sidePanel;
var nextButton = new Button(document.body, "Continue", "next-btn", (btn) => {
    mainContent.delete();
    mainContent.createEquationBox();

    sidePanel = new SidePanel;

    btn.delete();
});

/*
var sidePanel = new SidePanel;
sidePanel.createSidePanel();
*/

/*
document.addEventListener("click", () => {
    mainContent.removeDropBoxes();
});
*/