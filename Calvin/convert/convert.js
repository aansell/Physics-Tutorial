function convert(value, valueUnit, wantUnit) {
  return (value * valueUnit) / wantUnit;
}

function convertFormat(leftSide) {
  let leftUnit = null;
  let rightUnit = null;
  if (unit[unitSelect.value].hasOwnProperty("top")) {
    const leftTop =
      unit[unit[unitSelect.value].top][leftSideUnit.value.split("/")[0]];
    const leftBottom =
      unit[unit[unitSelect.value].bottom][leftSideUnit.value.split("/")[1]];

    const rightTop =
      unit[unit[unitSelect.value].top][rightSideUnit.value.split("/")[0]];
    const rightBottom =
      unit[unit[unitSelect.value].bottom][rightSideUnit.value.split("/")[1]];

    leftUnit = leftTop / leftBottom;
    rightUnit = rightTop / rightBottom;
  } else {
    leftUnit = unit[unitSelect.value][leftSideUnit.value];
    rightUnit = unit[unitSelect.value][rightSideUnit.value];
  }
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

const unit = {
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
  speed: {
    top: "distance",
    bottom: "time",
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

for (let key in unit) {
  unitSelect.insertAdjacentHTML(
    "beforeend",
    `<option value="${key}">${key}</option>`
  );
}

function setUnitSelect(unitSelected) {
  leftSideUnit.innerHTML = "";
  rightSideUnit.innerHTML = "";
  if (unitSelected.hasOwnProperty("top")) {
    for (let top in unit[unitSelected.top]) {
      for (let bottom in unit[unitSelected.bottom]) {
        leftSideUnit.insertAdjacentHTML(
          "beforeend",
          `<option value="${top}/${bottom}">${top} per ${bottom}</option>`
        );
        rightSideUnit.insertAdjacentHTML(
          "beforeend",
          `<option value="${top}/${bottom}">${top} per ${bottom}</option>`
        );
      }
    }
  } else {
    for (let key in unitSelected) {
      leftSideUnit.insertAdjacentHTML(
        "beforeend",
        `<option value="${key}">${key}</option>`
      );
      rightSideUnit.insertAdjacentHTML(
        "beforeend",
        `<option value="${key}">${key}</option>`
      );
    }
  }
}

unitSelect.addEventListener("change", () => {
  setUnitSelect(unit[unitSelect.value]);
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

setUnitSelect(unit.time);
