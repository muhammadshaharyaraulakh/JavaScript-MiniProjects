let InputText=document.getElementById("password-input");
let Toogler=document.getElementById("toggle-btn");
Toogler.addEventListener("click",()=>{
    if(InputText.type==="password"){
        InputText.type="text";
        Toogler.innerText="Hide";
    }else{
        InputText.type="password";
        Toogler.innerText="Show";
    }
})
let Reset=document.getElementById("reset-btn");
Reset.addEventListener("click",()=>{
    InputText.value="";
})
let generate=document.getElementById("generate-btn");
generate.addEventListener("click",()=>{
    const KEYS="`1234567890-=!@#$%^&*()_+QWERTYUIOP[]qwertyuiop{}|ASDFGHJKL;'asdfghjkl:ZXCVBNM,./zxcvbnm<>?";
    let Password="";
    for (let index = 0; index < 30; index++) {
        Password+=KEYS.charAt(Math.floor(Math.random()*KEYS.length+1));   
    }
    InputText.value=Password;
})