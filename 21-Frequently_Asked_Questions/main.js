let faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  let question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {
    faqItems.forEach((i) => {
      if (i !== item && i.classList.contains("active")) {
        i.classList.remove("active");
      }
    });

    item.classList.toggle("active");

    let answer = item.querySelector(".faq-answer");
    if (item.classList.contains("active")) {
      answer.style.maxHeight = answer.scrollHeight + "px";
    } else {
      answer.style.maxHeight = null;
    }
  });
});
