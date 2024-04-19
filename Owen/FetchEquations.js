import { equationJSON } from "./EquationToHTML.js";

var equations = new equationJSON;
var size = await equations.size();
for(var i = 0; i < size; i++) {
    equations.addToHTML(i, document.body);
}