let InputText = document.getElementById("message");
let charCount = document.getElementById("charCount");
let progress = document.querySelector(".progress-bar");
let reset = document.querySelector(".btn-reset");
let copyText = document.querySelector(".btn-copy");
InputText.addEventListener("input", () => {
    if (InputText.value.length > 250) {
        InputText.value = InputText.value.slice(0, 250);
    }
    charCount.textContent = `${InputText.value.length} / 250`;
    progress.style.width = (InputText.value.length / 250) * 100 + "%";
});
reset.addEventListener("click", () => {
    InputText.value = "";
    charCount.textContent = "0 / 250";
    progress.style.width = "0%";
});

copyText.addEventListener("click", () => {
    InputText.select();
    InputText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(InputText.value).then(() => {
        alert("Copied to clipboard!");
    });
});

