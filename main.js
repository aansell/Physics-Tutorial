import { MainContent } from "./MainContent.js";
import { SidePanel } from "./SidePanel.js";


var mainContent;
var sidePanel;

document.addEventListener("DOMContentLoaded", () => {
    mainContent = new MainContent;
    mainContent.createAllContent();

    sidePanel = new SidePanel;
    sidePanel.createSidePanel();
});

/*
document.addEventListener("click", () => {
    mainContent.removeDropBoxes();
});
*/