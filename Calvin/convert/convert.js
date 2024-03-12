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
  kg: 1000,
  lb: 453.59237,
  oz: 28.349523125,
  g: 1,
  mg: 0.001,
};

console.log(convert(1, unit.mi, unit.ft));
console.log(convert(60, unit.sec, unit.hr));
console.log(convert(1, unit.g, unit.kg));
console.log(convert(1, unit.lb, unit.oz));
