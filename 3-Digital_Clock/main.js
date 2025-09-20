let digitalClock = document.getElementById("clock");

window.addEventListener("load", () => {
  setInterval(() => {
    let Time = new Date();
    let Hours = Time.getHours().toString().padStart(2, "0");
    //.padStart() is a string method in JavaScript that adds characters at the start of a string until it reaches a certain length.
    let Minutes = Time.getMinutes().toString().padStart(2, "0");
    let Seconds = Time.getSeconds().toString().padStart(2, "0");

    digitalClock.textContent = `${Hours}:${Minutes}:${Seconds}`;
  }, 1000);
});
