function convert(value, valueUnit, wantUnit) {
  return (value / wantUnit) * valueUnit;
}

const unit = {
  // time
  hr: 3600,
  min: 60,
  sec: 1,

  // distance
  mi: 1609.344,
  km: 1000,
  m: 1,
  ft: 0.3048,
  in: 0.0254,
  cm: 0.01,
  mm: 0.001,

  // mass
  ton: 907184.74,
  kg: 1000,
  lb: 453.59237,
  oz: 28.349523125,
  g: 1,
  mg: 0.001,
};

const equation = document.querySelector(".convert").querySelector(".equation");

const leftSide = equation.querySelector(".left-side");
const leftSideNumber = leftSide.querySelector(".number-input");
const leftSideUnit = leftSide.querySelector(".left-side-unit");

const rightSide = equation.querySelector(".right-side");
const rightSideNumber = rightSide.querySelector(".number-input");
const rightSideUnit = rightSide.querySelector(".right-side-unit");

for (let key in unit) {
  leftSideUnit.insertAdjacentHTML(
    "beforeend",
    `<option value="${key}">${key}</option>`
  );
  rightSideUnit.insertAdjacentHTML(
    "beforeend",
    `<option value="${key}">${key}</option>`
  );
}

leftSideNumber.addEventListener("input", (event) => {
  rightSideNumber.value = convert(
    parseFloat(event.target.value),
    unit[leftSideUnit.value],
    unit[rightSideUnit.value]
  );
});

leftSideUnit.addEventListener("change", (event) => {
  rightSideNumber.value = convert(
    parseFloat(leftSideNumber.value),
    unit[leftSideUnit.value],
    unit[rightSideUnit.value]
  );
});

rightSideNumber.addEventListener("input", (event) => {
  leftSideNumber.value = convert(
    parseFloat(event.target.value),
    unit[rightSideUnit.value],
    unit[leftSideUnit.value]
  );
});

rightSideUnit.addEventListener("change", (event) => {
  leftSideNumber.value = convert(
    parseFloat(rightSideNumber.value),
    unit[rightSideUnit.value],
    unit[leftSideUnit.value]
  );
});
