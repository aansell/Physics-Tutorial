/* Represents a unit conversion expressed as a fraction. */
class Fraction {
    constructor(top = 1.0, bottom = 1.0) {
        this.top = top;
        this.bottom = bottom;
    }

    number() {
        return (this.top / this.bottom);
    }

    flip() {
        var temp = this.top;
        this.bottom = this.top;
        this.top = temp;
    }
}

/* variables should be a two-dimensional array.
Each sub-array is a term (multiplied variables).
The product of each subarray is summed. */
function solveEquation(variables) {
    var answer = 0.0;
    variables.forEach(item => {
        var product = 1.0;
        item.forEach(item => {
            product *= item;
        });
        answer += product;
    });
    return answer;
}

/* fractions should be an array of class Fraction
Each fraction in the array is multiplied by the original number. */
function solveConversion(number, fractions) {
    var product = 1.0;
    fractions.forEach(item => {
        product *= item.number;
    });
    return number * product;
}