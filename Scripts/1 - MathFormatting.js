/* This class doesn't actually store any information, just contains static funciton(s) for
converting strings into a more math-like or math-readable format. ex. Variable name (palin text) --> MathJax format */
export class MathFormat {
    static FormatMathString(item, mathJaxFormat) {
        var inBrackets = false;
        var underscore = false;
        var contents = "";
        [...item].forEach((char) => {
            if(char == '}') {
                inBrackets = false;
            }

            if(inBrackets) {
                contents += char;
            }

            if(char == '{') {
                inBrackets = true;
            }

            if(char == "_") {
                underscore = true;
            }
        });

        if(contents.toLowerCase() == "delta") {
            item = item.replace('{' + contents + '}', "Δ");
        }

        if(mathJaxFormat === true) {
            if(underscore) {
                var itemArr = item.split("_");
                item = "<msub>";
                item += ("<mi>" + itemArr[0] + "</mi>");
                item += ("<mi>" + itemArr[1] + "</mi>");
                item += "</msub>";
            } else {
                item = ("<mi>" + item + "</mi>");
            }
        } else {
            if(underscore) {
                item = item.replace('_', "<sub>");
                item += "</sub>";
            }
        }

        return item;
    }
}