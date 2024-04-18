function convert(value, valueConversion, wantConversion) {
  return (value * valueConversion) / wantConversion;
}

function cleanUpValue(value) {
  if (value == "NaN") {
    return "Error";
  }
  return value;
}

function convertFormat(leftSide) {
  if (leftSide) {
    leftSideNumber.value = cleanUpValue(
      convert(rightSideNumber.value, rightSideUnit.value, leftSideUnit.value)
    );
  } else {
    rightSideNumber.value = cleanUpValue(
      convert(leftSideNumber.value, leftSideUnit.value, rightSideUnit.value)
    );
  }
}

class Unit {
  constructor(m, s, kg) {
    this.distance = m;
    this.time = s;
    this.mass = kg;
  }
}

const unitList = {
  distance: new Unit(1, 0, 0),
  time: new Unit(0, 1, 0),
  mass: new Unit(0, 0, 1),
  speed: new Unit(1, -1, 0),
  density: new Unit(-3, 0, 1),
  hertz: new Unit(0, -1, 0),
};

const conversionDictionary = {
  distance: {
    mile: 1609.344,
    kilometer: 1000,
    meter: 1,
    feet: 0.3048,
    inch: 0.0254,
    centimeter: 0.01,
    millimeter: 0.001,
  },
  time: {
    hour: 3600,
    minute: 60,
    second: 1,
    millisecond: 0.001,
    microsecond: 0.000001,
    nanosecond: 0.000000001,
  },
  mass: {
    ton: 907.18474,
    kilogram: 1,
    pound: 0.45359237,
    ounce: 0.028349523125,
    gram: 0.001,
    milligram: 0.000001,
  },
};

const unitSelect = document.querySelector(".unit-type");

const equation = document.querySelector(".convert").querySelector(".equation");

const leftSide = equation.querySelector(".left-side");
const leftSideNumber = leftSide.querySelector(".number-input");
const leftSideUnit = leftSide.querySelector(".left-side-unit");

const rightSide = equation.querySelector(".right-side");
const rightSideNumber = rightSide.querySelector(".number-input");
const rightSideUnit = rightSide.querySelector(".right-side-unit");

function setUnitSelect(unitSelected) {
  leftSideUnit.innerHTML = "";
  rightSideUnit.innerHTML = "";

  for (let distanceUnit in conversionDictionary.distance) {
    for (let timeUnit in conversionDictionary.time) {
      for (let massUnit in conversionDictionary.mass) {
        let displayValue = "";
        if (unitSelected.distance !== 0) {
          displayValue += `${distanceUnit}^${unitSelected.distance} `;
        }
        if (unitSelected.time !== 0) {
          displayValue += `${timeUnit}^${unitSelected.time} `;
        }
        if (unitSelected.mass !== 0) {
          displayValue += `${massUnit}^${unitSelected.mass}`;
        }
        const value =
          Math.pow(
            conversionDictionary.distance[distanceUnit],
            unitSelected.distance
          ) *
          Math.pow(conversionDictionary.time[timeUnit], unitSelected.time) *
          Math.pow(conversionDictionary.mass[massUnit], unitSelected.mass);
        leftSideUnit.insertAdjacentHTML(
          "beforeend",
          `<option value="${value}">${displayValue}</option>`
        );
        rightSideUnit.insertAdjacentHTML(
          "beforeend",
          `<option value="${value}">${displayValue}</option>`
        );
        if (unitSelected.mass === 0) {
          break;
        }
      }
      if (unitSelected.time === 0) {
        break;
      }
    }
    if (unitSelected.distance === 0) {
      break;
    }
  }
}

unitSelect.addEventListener("change", () => {
  setUnitSelect(unitList[unitSelect.value]);
  convertFormat(false);
});

leftSideNumber.addEventListener("input", () => {
  convertFormat(false);
});

leftSideUnit.addEventListener("change", () => {
  convertFormat(false);
});

rightSideNumber.addEventListener("input", () => {
  convertFormat(true);
});

rightSideUnit.addEventListener("change", () => {
  convertFormat(false);
});

for (let key in unitList) {
  unitSelect.insertAdjacentHTML(
    "beforeend",
    `<option value="${key}">${key}</option>`
  );
}

setUnitSelect(unitList.distance);
