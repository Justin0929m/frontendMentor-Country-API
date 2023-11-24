// // API Endpoint - https://restcountries.com/v3.1/all

const fetchCountriesObject = {
    fetchCountries: async function(){
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json()
        localStorage.setItem('countries', JSON.stringify(data))
        renderCountries.render(data);
    }
} 

const renderCountries = {
  displayData: document.querySelector("#countries"),

  render: function (countries) {
    this.displayData.innerHTML = "";
    countries.forEach((countries) => {
      this.displayData.innerHTML += `
            <div class="card" onclick="fetchSingleCountry.fetchCountry('${countries.name.common}')">
                    <img src="${countries.flags.png}" id="flag-img" class="card-img"  width="250" alt="">
                    <div class="card-body">
                        <h1 class="card-title" id="country-title">${countries.name.common}</h1>
                        <p id="population">Population: ${countries.population}</p>
                        <p id="region">Region: ${countries.region}</p>
                        <p id="capital">Capital: ${countries.capital}</p>
                    </div>
            </div>
        `;
    });
  },
};

fetchCountriesObject.fetchCountries()

const searchQuery = {
  searchField: document.querySelector("#searchField"),
  
  checkFunc: async function(){

      const searchTrim = this.searchField.value.trim()
      let countryArr = JSON.parse(localStorage.getItem('countries'))

    if(this.searchTrim != ''){

      const findCountry = countryArr.filter((country) => {
        const countryNameLowerCase = country.name.common.toLowerCase()
        return countryNameLowerCase.includes(searchTrim)
      })
      renderCountries.render(findCountry)
      console.log(findCountry);
    } else{
        fetchCountriesObject.fetchCountries()
    }
  }
};

let searchBtn = document.querySelector('#searchBtn')

searchBtn.addEventListener('click', searchQuery.checkFunc.bind(searchQuery))

const countrySelector = {
  select: document.querySelector("select"),
  selected: document.querySelector(".selected"),

  init: function () {
    this.select.addEventListener("change", this.dropdownFunc.bind(this));
  },

  dropdownFunc: function () {
    let selectedValue = this.select.value;
    this.filterCountries(selectedValue);
  },

  filterCountries: async function (selectedValue) {
    const res = await fetch(
      `https://restcountries.com/v3.1/region/${selectedValue}`
    );
    const data = await res.json();

    renderCountries.render(data)
  },
};

countrySelector.init()

// Dark Mode / Light Mode

const themeToggle = {
    buttonClicked: false,
    darkMode: document.querySelector('#dark-mode'),
    lightMode: document.querySelector('#light-mode'),

    darkModeFunc: function(){
        this.darkMode.addEventListener("click", () => {
          this.buttonClicked = !this.buttonClicked;

          if (this.buttonClicked) {
            document.documentElement.setAttribute("data-theme", "dark");
            this.lightMode.setAttribute("data-display", "show");
            this.darkMode.setAttribute("data-display", "none");
          } else {
            document.documentElement.setAttribute("data-theme", "light");
            this.lightMode.setAttribute("data-display", "none");
            this.darkMode.setAttribute("data-display", "show");
          }
        });
    },

    lightModeFunc: function(){
        this.lightMode.addEventListener('click', () =>{
            this.buttonClicked = !this.buttonClicked

            if(this.buttonClicked){
                document.documentElement.setAttribute('data-theme', 'dark')
                this.lightMode.setAttribute("data-display", "none");
                this.darkMode.setAttribute("data-display", "show");
            } else{
                document.documentElement.setAttribute("data-theme", "light");
                this.lightMode.setAttribute("data-display", "none");
                this.darkMode.setAttribute("data-display", "show");
            }
        })
    }
}

themeToggle.darkModeFunc()
themeToggle.lightModeFunc()


// Single Country

const fetchSingleCountry = {
    fetchCountry: async function(country){
        let res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
        let data = await res.json()

        localStorage.setItem("country", JSON.stringify(data));
        window.location.href = "singlecountry.html"
        console.log(data);
    }
}

