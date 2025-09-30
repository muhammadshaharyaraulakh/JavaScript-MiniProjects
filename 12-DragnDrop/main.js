let rightBox = document.getElementById("Right");
let leftBox = document.getElementById("leftBox");
let boxes = document.querySelectorAll(".draggable-box");
let selectedBox = null;
boxes.forEach((box) => {
  box.addEventListener("dragstart", (e) => {
    selectedBox = e.target;
  });
});

[rightBox, leftBox].forEach((box) => {
  box.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  box.addEventListener("drop", (e) => {
    if (selectedBox) {
      box.appendChild(selectedBox);
      selectedBox = null;
    }
  });
});