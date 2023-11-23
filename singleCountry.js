const displayCountry = {
  displaySection: document.querySelector("#countryName"),

  captureData: function () {
    this.displaySection.innerHTML = "";
    let countryArr = JSON.parse(localStorage.getItem("country"))
      ? JSON.parse(localStorage.getItem("country"))
      : [];
    countryArr.forEach((country) => {
      this.displaySection.innerHTML = `
           <h1>${country.name.common}</h1>
        `;
    });
  },
};

displayCountry.captureData();
