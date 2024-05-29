import { ProblemsJSON } from "./Scripts/1 - ProblemInfo.js";
import { CheckButtonKnowsWants } from "./Scripts/4 - ButtonWithCheck.js";
import { MainContent } from "./Scripts/4 - MainContent.js";
import { SidePanel } from "./Scripts/4 - SidePanel.js";


/* All the code not in a class should be here. This is the script that actually runs the stuff (as opposed to defining what to run). */
const problemNum = 0;


var screen = document.getElementById("main-content");
// screen.style.width = document.body.offsetWidth;

var allProblems = new ProblemsJSON;
var problem = allProblems.at(problemNum);

problem.then((prob) => {
    var mainContent = new MainContent(prob);
    mainContent.createDropElements();

    var sidePanel;
    var nextButton = new CheckButtonKnowsWants(prob, mainContent.dropdowns, document.body, (btn) => {
        mainContent.delete();
        mainContent.createEquationBox();

        sidePanel = new SidePanel(prob);

        btn.delete();
    });
});

