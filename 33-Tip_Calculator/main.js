let TotalBill = document.getElementById("billAmount");
let TipPercentage = document.getElementById("tipPercent");
let Parteners = document.getElementById("peopleCount");
let calculate = document.querySelector(".btn-calc");
let result = document.querySelector(".result-box");

calculate.addEventListener("click", (e) => {
    e.preventDefault();

    if (!TotalBill.value || !TipPercentage.value || !Parteners.value) {
        return; 
    }

    let Amount = parseFloat(TotalBill.value);
    let percentage = parseFloat(TipPercentage.value);
    let Persons = parseInt(Parteners.value);

    if (Amount <= 0 || percentage <= 0 || percentage > 100 || Persons <= 0) {
        alert("Please Enter Correct Values");
        TotalBill.value = "";
        TipPercentage.value = "";
        Parteners.value = "";
        return;
    }

    let TipppedAmount = (percentage / 100) * Amount;
    let Total = TipppedAmount + Amount;
    let divide = (Total / Persons).toFixed(2); 
    document.getElementById("result").style.display="block";
    
    result.innerHTML = `
      <p>Tip Amount: $${TipppedAmount.toFixed(2)}</p>
      <p>Total Bill: $${Total.toFixed(2)}</p>
      <p>Each Person Pays: $${divide}</p>
    `;

});