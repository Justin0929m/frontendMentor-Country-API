const displayCountry = {
  displaySection: document.querySelector("#countryName"),

  captureData: function () {
    this.displaySection.innerHTML = "";
    let countryArr = JSON.parse(localStorage.getItem("country"))
      ? JSON.parse(localStorage.getItem("country"))
      : [];
    countryArr.forEach((country) => {
      this.displaySection.innerHTML = `
      <div>
            <img src="${country.flags.png}" class="country-img">
        </div>
        <div class="country-details">
            <h1 class="country-title">${country.name.common}</h1>
            <div class="country-subdetails">
                <div class="left-side">
                    <p>Native Name: ${country.name.official}</p>
                    <p>Population: ${country.population}</p>
                    <p>Region: ${country.region}</p>
                    <p>Sub Region: ${country.subregion}</p>
                    <p>Capital: ${country.capital}</p>
                </div>
              <div class="right-side">
                    <p>Top Level Domain: ${country.tld}</p>
                    <p>Languages: ${Object.values(country.languages)}</p>
              </div>
            </div>
        </div>
           `;
    });
  },
};

displayCountry.captureData();

// <p>Currencies: ${JSON.stringify(Object.values(country.currencies))}</p>

const themeToggleSingle = {
  buttonClicked: false,
  singleDarkMode: document.querySelector('#single-dark-mode'),
  singleLightMode: document.querySelector('#single-light-mode'),

  singleDarkModeFunc: function(){
      this.singleDarkMode.addEventListener("click", () => {
        this.buttonClicked = !this.buttonClicked;

        if (this.buttonClicked) {
          document.documentElement.setAttribute("data-theme", "dark");
          this.singleLightMode.setAttribute("data-display", "show");
          this.singleDarkMode.setAttribute("data-display", "none");
        } else {
          document.documentElement.setAttribute("data-theme", "light");
          this.singleLightMode.setAttribute("data-display", "none");
          this.singleDarkMode.setAttribute("data-display", "show");
        }
      });
  },

  singleLlightModeFunc: function(){
      this.singleLightMode.addEventListener('click', () =>{
          this.buttonClicked = !this.buttonClicked

          if(this.buttonClicked){
              document.documentElement.setAttribute('data-theme', 'dark')
              this.singleLightMode.setAttribute("data-display", "none");
              this.singleDarkMode.setAttribute("data-display", "show");
          } else{
              document.documentElement.setAttribute("data-theme", "light");
              this.singleLightMode.setAttribute("data-display", "none");
              this.singleDarkMode.setAttribute("data-display", "show");
          }
      })
  }
}

themeToggleSingle.singleLlightModeFunc()
themeToggleSingle.singleDarkModeFunc()