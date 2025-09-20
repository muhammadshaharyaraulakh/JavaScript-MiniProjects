let passwords=document.getElementById("passwordInput");
let showPassword=document.getElementById("eyeIcon");
let hide=true;
showPassword.addEventListener("click",()=>{
    if(hide){
        passwords.type="text"
        showPassword.setAttribute("class","bi-eye-slash-fill")
    }else{
        passwords.type="password";
        showPassword.setAttribute("class","bi bi-eye-fill")
    }
    hide=!hide;
})