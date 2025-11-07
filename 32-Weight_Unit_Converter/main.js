let inputElement = document.getElementById("inputValue");
let unitSelector = document.getElementById("inputUnit");

let poundsOutput = document.getElementById("poundsOutput");
let kgOutput = document.getElementById("kgOutput");
let gramsOutput = document.getElementById("gramsOutput");
let ouncesOutput = document.getElementById("ouncesOutput");

let calculateBtn = document.getElementById("calculate-btn");

calculateBtn.addEventListener("click", () => {
  const inputValue = parseFloat(inputElement.value);
  const selectedUnit = unitSelector.value;

  if (isNaN(inputValue)) {
    alert("Please enter a valid number.");
    return;
  }

  let kgValue;
  switch (selectedUnit) {
    case "kg":
      kgValue = inputValue;
      break;
    case "pounds":
      kgValue = inputValue / 2.20462;
      break;
    case "grams":
      kgValue = inputValue / 1000;
      break;
    case "ounces":
      kgValue = inputValue / 35.274;
      break;
    default:
      kgValue = inputValue;
  }

  const result = convertFromKg(kgValue);

  poundsOutput.textContent = result.pounds.toFixed(2);
  kgOutput.textContent = result.kilograms.toFixed(2);
  gramsOutput.textContent = result.grams.toFixed(2);
  ouncesOutput.textContent = result.ounces.toFixed(2);
});

function convertFromKg(kg) {
  return {
    pounds: kg * 2.20462,
    kilograms: kg,
    grams: kg * 1000,
    ounces: kg * 35.274
  };
}
