
let personWeight = document.getElementById("weight");
let personHeight = document.getElementById("height");
let calculate = document.querySelector(".btn-calc");
let Value = document.getElementById("BMI");
let Status = document.getElementById("Condition");

calculate.addEventListener("click", (e) => {
    e.preventDefault();

    let weight = parseFloat(personWeight.value);
    let height = parseFloat(personHeight.value);

    if (weight <= 0 || height <= 0 || isNaN(weight) || isNaN(height)) {
        alert("Please enter valid numbers greater than 0 for weight and height.");
        return;
    }

    let bmi = weight / ((height / 100) * (height / 100));
    bmi = bmi.toFixed(1);
    Value.innerText = bmi;

    if (bmi < 18.5) {
        Status.innerText = "Underweight";
        Status.style.color = "orange";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        Status.innerText = "Normal weight";
        Status.style.color = "green";
    } else if (bmi >= 25 && bmi <= 29.9) {
        Status.innerText = "Overweight";
        Status.style.color = "darkorange";
    } else {
        Status.innerText = "Obese";
        Status.style.color = "red";
    }
});
