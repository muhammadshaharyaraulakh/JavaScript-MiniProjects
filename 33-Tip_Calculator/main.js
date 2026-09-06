let TotalBill = document.getElementById("billAmount");
let TipPercentage = document.getElementById("tipPercent");
let Parteners = document.getElementById("peopleCount");
let calculate = document.querySelector(".btn-calc");
let result = document.querySelector(".result-box");

function calculateTip(e) {
    if (e) e.preventDefault();

    if (!TotalBill.value || !TipPercentage.value || !Parteners.value) {
        return; 
    }

    let Amount = parseFloat(TotalBill.value);
    let percentage = parseFloat(TipPercentage.value);
    let Persons = parseInt(Parteners.value);

    if (isNaN(Amount) || isNaN(percentage) || isNaN(Persons) || Amount <= 0 || percentage <= 0 || percentage > 100 || Persons <= 0) {
        alert("Please enter valid positive numbers (Tip: 1-100%)");
        return;
    }

    let TipppedAmount = (percentage / 100) * Amount;
    let Total = TipppedAmount + Amount;
    let divide = (Total / Persons).toFixed(2); 
    
    result.style.display = "block";
    result.innerHTML = `
      <p><span>Tip Amount:</span> <strong>$${TipppedAmount.toFixed(2)}</strong></p>
      <p><span>Total Bill:</span> <strong>$${Total.toFixed(2)}</strong></p>
      <p><span>Each Person Pays:</span> <strong>$${divide}</strong></p>
    `;
}

calculate.addEventListener("click", calculateTip);

const form = document.querySelector("form");
if (form) {
    form.addEventListener("submit", calculateTip);
}