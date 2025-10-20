let text=document.getElementById("palindromeInput");
let checker=document.querySelector(".btn-check");
let finalresult=document.querySelector(".result");

checker.addEventListener("click",()=>{
    if(!text.value){
        return 
    }
    for (let index = 0; index < text.value.length; index++) {
        for (let j = text.value.length; j >=0; j--) {
            if (text.value.toLowerCase()[index]==text.value.toLowerCase()[j]) {
                finalresult.textContent="Plaindrom"
            }else{
                finalresult.textContent="Not a PlainDrome"
            }
            
        }
        
    }
})