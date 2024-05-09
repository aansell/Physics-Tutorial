import { Button } from "./Buttons.js"
import { MainContent } from "./MainContent.js";
import { SidePanel } from "./SidePanel.js";



var mainContent = new MainContent;
mainContent.createDropElements(document.getElementById("main-content"));

var sidePanel;
var nextButton = new Button(document.body, "Continue", "next-btn", (btn) => {
    mainContent.delete();
    mainContent.createEquationBox();

    if(sidePanel != undefined) {
        sidePanel.delete();
    }
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