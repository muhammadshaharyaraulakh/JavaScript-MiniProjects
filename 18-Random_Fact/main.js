let factPara = document.getElementById("catFact");
let action = document.querySelector(".btn-generate");

action.addEventListener("click", () => {
  fetch("https://catfact.ninja/fact")
    .then(res => res.json()) 
    .then(data => {
      factPara.innerText = data.fact; 
    })
    .catch(error => {
      console.error("Error fetching fact:", error);
      factPara.innerText = "Oops! Couldn’t fetch a cat fact";
    });
});