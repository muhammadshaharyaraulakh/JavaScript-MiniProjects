let numbers = document.querySelectorAll(".number");
let totalDuration = 4000;
let frameRate = 50; 
window.addEventListener("load",()=>{
numbers.forEach((element) => {
  let startValue = 0;
  let endValue = parseInt(element.getAttribute("data-target"));
  let steps = totalDuration / frameRate;
  let increment = endValue / steps;

  let currentValue = 0;

  let counter = setInterval(() => {
    currentValue += increment;
    if (currentValue >= endValue) {
      element.textContent = endValue;
      clearInterval(counter);
    } else {
      element.textContent = Math.floor(currentValue);
    }
  }, frameRate);
});
})
