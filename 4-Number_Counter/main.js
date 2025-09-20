let display=document.getElementById("counter");
let increment=document.getElementById("increase");
let clear=document.getElementById("reset");
let counter=parseInt(display.innerText);
increment.addEventListener("click",()=>{
   counter+=1;
   display.innerText=counter;
})
clear.addEventListener("click",()=>{
    counter=0;
    display.innerText=counter;
})