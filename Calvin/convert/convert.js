function convert(value, valueConversion, wantConversion) {
  return (value * valueConversion) / wantConversion;
}

function convertFormat(leftSide) {
  let leftTop = 1;
  let rightTop = 1;
  unitDictionary[unitSelect.value].top.forEach((top) => {
    leftTop *= conversionDictionary[top][leftSideUnit.value.split("/")[0]];
    rightTop *= conversionDictionary[top][rightSideUnit.value.split("/")[0]];
  });

  let leftBottom = 1;
  let rightBottom = 1;
  unitDictionary[unitSelect.value].bottom.forEach((bottom) => {
    leftBottom *=
      conversionDictionary[bottom][leftSideUnit.value.split("/")[1]];
    rightBottom *=
      conversionDictionary[bottom][rightSideUnit.value.split("/")[1]];
  });

  let leftUnit = leftTop / leftBottom;
  let rightUnit = rightTop / rightBottom;
  if (leftSide) {
    leftSideNumber.value = convert(
      parseFloat(rightSideNumber.value),
      rightUnit,
      leftUnit
    );
    if (leftSideNumber.value == "NaN") {
      leftSideNumber.value = "";
    }
  } else {
    rightSideNumber.value = convert(
      parseFloat(leftSideNumber.value),
      leftUnit,
      rightUnit
    );
    if (rightSideNumber.value == "NaN") {
      rightSideNumber.value = "";
    }
  }
}

const conversionDictionary = {
  "": { "": 1 },
  time: {
    hour: 3600,
    minute: 60,
    second: 1,
  },
  distance: {
    mile: 1609.344,
    kilometer: 1000,
    meter: 1,
    feet: 0.3048,
    inch: 0.0254,
    centimeter: 0.01,
    millimeter: 0.001,
  },
  mass: {
    ton: 907184.74,
    kilogram: 1000,
    pound: 453.59237,
    ounce: 28.349523125,
    gram: 1,
    milligram: 0.001,
  },
};

const unitDictionary = {
  time: {
    top: ["time"],
    bottom: [""],
  },

  distance: {
    top: ["distance"],
    bottom: [""],
  },

  mass: {
    top: ["mass"],
    bottom: [""],
  },

  speed: {
    top: ["distance"],
    bottom: ["time"],
  },

  // broken
  density: {
    top: ["mass"],
    bottom: ["distance", "distance", "distance"],
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

for (let key in unitDictionary) {
  unitSelect.insertAdjacentHTML(
    "beforeend",
    `<option value="${key}">${key}</option>`
  );
}

function setUnitSelect(unitSelected) {
  leftSideUnit.innerHTML = "";
  rightSideUnit.innerHTML = "";

  for (let top in conversionDictionary[unitSelected.top]) {
    for (let bottom in conversionDictionary[unitSelected.bottom]) {
      console.log(top, bottom);
      let displayValue = top;
      if (bottom !== "") {
        displayValue = `${top} per ${bottom}`;
      }
      leftSideUnit.insertAdjacentHTML(
        "beforeend",
        `<option value="${top}/${bottom}">${displayValue}</option>`
      );
      rightSideUnit.insertAdjacentHTML(
        "beforeend",
        `<option value="${top}/${bottom}">${displayValue}</option>`
      );
    }
  }
}

unitSelect.addEventListener("change", () => {
  setUnitSelect(unitDictionary[unitSelect.value]);
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

setUnitSelect(unitDictionary.time);
