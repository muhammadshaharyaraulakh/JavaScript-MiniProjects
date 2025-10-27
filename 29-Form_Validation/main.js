let userName = document.getElementById("username");
let gmailAdress = document.getElementById("email");
let UniquePassword = document.getElementById("password");
let action = document.querySelector(".btn-submit");


action.addEventListener("click",(e)=>{
  e.preventDefault();

  let generalError = document.querySelector(".general-error-message");
  let userError = document.querySelector(".username-error");
  let emailError = document.querySelector(".email-error");
  let passError = document.querySelector(".password-error");

  generalError.style.display="none";
  userError.style.display="none";
  emailError.style.display="none";
  passError.style.display="none";

  if(userName.value.trim()=="" || gmailAdress.value.trim()=="" || UniquePassword.value.trim()==""){
     generalError.style.display="flex";
     setTimeout(() => {
      generalError.style.display="none";
     }, 2000);
     return; 
  }

  if(userName.value.trim()==""|| userName.value.trim().includes("@")){
    userError.style.display="flex";
  }


  if(!gmailAdress.value.includes("@") || !gmailAdress.value.includes(".")){
    emailError.style.display="flex";
  }

  if(UniquePassword.value.length < 6){
    passError.style.display="flex";
  }

  if(userName.value.trim()!=="" && 
     gmailAdress.value.includes("@") && gmailAdress.value.includes(".") &&
     UniquePassword.value.length >= 6){
      alert("Form submitted successfully!");
      document.getElementById("myForm").reset();
  }
});
