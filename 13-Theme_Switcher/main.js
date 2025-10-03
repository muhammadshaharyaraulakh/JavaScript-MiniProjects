let themeDisplayIcon = document.getElementById("themeDisplayIcon").querySelector("i");
let body = document.body;
let toggleCard = document.querySelector(".toggle-card");
let themeSwitcher = document.getElementById("themeSwitcher");

let isLight = true;

themeSwitcher.addEventListener("click", () => {
  if (isLight) {
    body.classList.add("dark-mode");
    toggleCard.classList.add("dark-mode");
    themeDisplayIcon.className = "bi bi-moon-stars-fill icon text-warning";
    themeSwitcher.className = "bi bi-toggle-off theme-switcher-icon";
  } else {
    body.classList.remove("dark-mode");
    toggleCard.classList.remove("dark-mode");
    themeDisplayIcon.className = "bi bi-brightness-high-fill icon text-warning";
    themeSwitcher.className = "bi bi-toggle-on theme-switcher-icon";
  }

  isLight = !isLight;
});
