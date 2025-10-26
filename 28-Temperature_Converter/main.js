const buttons = document.querySelectorAll(".btn");
const tabs = document.querySelectorAll(".tab");
const resultBox = document.getElementById("result");

// tab switching
buttons.forEach(button => {
  button.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    button.classList.add("active");

    tabs.forEach(tab => tab.classList.remove("active"));
    document.getElementById(button.dataset.tab).classList.add("active");

    resultBox.innerHTML = ""; 
  });
});

function cToF(c) { return (c * 9/5) + 32; }
function cToK(c) { return c + 273.15; }
function fToC(f) { return (f - 32) * 5/9; }
function fToK(f) { return (f - 32) * 5/9 + 273.15; }
function kToC(k) { return k - 273.15; }
function kToF(k) { return (k - 273.15) * 9/5 + 32; }

document.querySelectorAll(".calc-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const input = btn.previousElementSibling;
    const value = parseFloat(input.value);
    if (isNaN(value)) { 
      resultBox.innerHTML = "Please enter a valid number"; 
      return; 
    }

    const tab = btn.closest(".tab").id;
    let result = "";

    if (tab === "celsius") {
      if (input.placeholder.includes("Kelvin")) result = `${value} K = ${kToC(value).toFixed(2)} °C`;
      if (input.placeholder.includes("Fahrenheit")) result = `${value} °F = ${fToC(value).toFixed(2)} °C`;
    }

    if (tab === "kelvin") {
      if (input.placeholder.includes("Celsius")) result = `${value} °C = ${cToK(value).toFixed(2)} K`;
      if (input.placeholder.includes("Fahrenheit")) result = `${value} °F = ${fToK(value).toFixed(2)} K`;
    }

    if (tab === "fahrenheit") {
      if (input.placeholder.includes("Celsius")) result = `${value} °C = ${cToF(value).toFixed(2)} °F`;
      if (input.placeholder.includes("Kelvin")) result = `${value} K = ${kToF(value).toFixed(2)} °F`;
    }

    resultBox.innerHTML = result;
  });
});
