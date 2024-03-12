function convertDistance(value, unit, wantUnit) {
  return value * unit.toBase * (1 / wantUnit.toBase);
}

const unit = {
  mi: { name: "mi", toBase: 0.00062137119 },
  km: { name: "km", toBase: 0.001 },
  m: { name: "m", toBase: 1 },
  ft: { name: "ft", toBase: 3.281 },
  in: { name: "in", toBase: 39.37 },
  cm: { name: "cm", toBase: 100 },
  mm: { name: "mm", toBase: 1000 },
};

console.log(convertDistance(1, unit.ft, unit.mi));
