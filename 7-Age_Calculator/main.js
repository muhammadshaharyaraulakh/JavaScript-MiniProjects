
    flatpickr("#birthdate", {
      dateFormat: "Y-m-d",
      maxDate: "today",
      disableMobile: true 
    });

    let Date_of_Birth = document.getElementById("birthdate");
    let TotalAge = document.getElementById("result");
    let action = document.getElementById("calcBtn");

    action.addEventListener("click", () => {
      if (!Date_of_Birth.value) {
        TotalAge.innerText = "Please select a date.";
        TotalAge.classList.add("show");
        return;
      }

      let today = new Date();
      let day = today.getUTCDate();
      let month = today.getUTCMonth() + 1;
      let year = today.getUTCFullYear();

      let dob = new Date(Date_of_Birth.value);
      let bday = dob.getUTCDate();
      let bmonth = dob.getUTCMonth() + 1;
      let byear = dob.getUTCFullYear();

      if (dob > today) {
        TotalAge.innerText = "Birthdate cannot be in the future.";
        TotalAge.classList.add("show");
        return;
      }

      let ageYears = year - byear;
      let ageMonths = month - bmonth;
      let ageDays = day - bday;

      if (ageDays < 0) {
        ageMonths--;
        ageDays += new Date(year, month - 1, 0).getDate();
      }

      if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
      }

      TotalAge.innerHTML = `
        <h2>Years:</h2> ${ageYears}
        <h2>Months:</h2> ${ageMonths}
        <h2>Days:</h2> ${ageDays}
      `;
      TotalAge.classList.add("show");
    });
