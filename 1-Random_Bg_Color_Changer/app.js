let background = document.body;
let change = document.getElementById("changeColor");
let reset = document.getElementById("resetColor");

change.addEventListener("click", () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  background.style.backgroundColor = `rgb(${red},${green},${blue})`;
});

reset.addEventListener("click", () => {
  background.style.backgroundColor = "white";
});
