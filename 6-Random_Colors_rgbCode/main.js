let generator = document.getElementById("generate");
let colorsBoxes = document.querySelectorAll(".color-box");
generator.addEventListener("click",()=>{
    colorsBoxes.forEach((box)=>{
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    box.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    box.textContent = `rgb(${r}, ${g}, ${b})`;   
    });
});
