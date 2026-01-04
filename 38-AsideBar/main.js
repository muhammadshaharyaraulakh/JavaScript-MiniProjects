let heroSection = document.getElementById("Hero");
let skillsSection = document.getElementById("Skills");
let servicesSection = document.getElementById("Services");
let portfolioSection = document.getElementById("Portfolio");
let experienceSection = document.getElementById("Experience");
let heroLink = document.getElementById("hero");
let skillsLink = document.getElementById("skills");
let servicesLink = document.getElementById("services");
let portfolioLink = document.getElementById("portfolio");
let experienceLink = document.getElementById("experience");
heroLink.addEventListener("click", function () {
    heroSection.style.display = "flex";
    skillsSection.style.display = "none";
    servicesSection.style.display = "none";
    portfolioSection.style.display = "none";
    experienceSection.style.display = "none";
});
skillsLink.addEventListener("click", function () {
    heroSection.style.display = "none";
    skillsSection.style.display = "flex";
    servicesSection.style.display = "none";
    portfolioSection.style.display = "none";
    experienceSection.style.display = "none";
});
servicesLink.addEventListener("click", function () {
    heroSection.style.display = "none";
    skillsSection.style.display = "none";
    servicesSection.style.display = "flex";
    portfolioSection.style.display = "none";
    experienceSection.style.display = "none";
});
portfolioLink.addEventListener("click", function () {
    heroSection.style.display = "none";
    skillsSection.style.display = "none";
    servicesSection.style.display = "none";
    portfolioSection.style.display = "flex";
    experienceSection.style.display = "none";
});
experienceLink.addEventListener("click", function () {
    heroSection.style.display = "none";
    skillsSection.style.display = "none";
    servicesSection.style.display = "none";
    portfolioSection.style.display = "none";
    experienceSection.style.display = "flex";
}); 