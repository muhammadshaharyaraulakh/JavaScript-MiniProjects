let number = document.getElementById("guessInput");
let Checker = document.getElementById("guessBtn");
let message = document.getElementById("messageArea");
let RealNumber = Math.floor(Math.random() * 100 + 1);
Checker.addEventListener("click", () => {
    let userNumber = parseInt(number.value);
    if (isNaN(userNumber) || number.value === ""|| userNumber>100) {
        message.innerText = "Please enter Suitable Number";
        setTimeout(() => {
            message.innerText = "";
        }, 1000);
        return;
    }
    if (RealNumber === userNumber) {
        let messageTimer = setInterval(() => {
            message.innerText = "You Guessed It";
        }, 100);
        setTimeout(() => {
            clearInterval(messageTimer);
            message.innerText = "";
            number.value = "";
        }, 1000);
    } else if (RealNumber > userNumber) {
        let messageTimer = setInterval(() => {
            message.innerText = "Low";
        }, 100);
        setTimeout(() => {
            clearInterval(messageTimer);
            message.innerText = "";
        }, 1000);
        number.value = "";
    } else if (RealNumber < userNumber) {
        let messageTimer = setInterval(() => {
            message.innerText = "High";
        }, 100);
        setTimeout(() => {
            clearInterval(messageTimer);
            message.innerText = "";
            number.value = "";
        }, 1000);
    }
});