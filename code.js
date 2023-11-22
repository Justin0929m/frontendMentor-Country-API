// // API Endpoint - https://restcountries.com/v3.1/all

const fetchCountries = async ()=>{
    const res = await fetch("https://restcountries.com/v3.1/all");
    const data = await res.json()

    displayCountries(data);
      
}


const searchQuery = async ()=>{

    const searchField = document.querySelector("#searchField");
    const searchTrim = searchField.value.trim();

    if (searchTrim != "") {
      const res = await fetch(
        `https://restcountries.com/v3.1/name/${searchTrim}`
      );
      const data = await res.json();

      displayCountries(data);
    } else {
      fetchCountries();
    }
    
}


const filterCountries = async (selectValue)=>{
    const res = await fetch(`https://restcountries.com/v3.1/region/${selectValue}`);
    const data = await res.json()

    displayCountries(data)
}


const searchInput = async ()=>{
    
}

const displayCountries = (countries)=>{
    let displayData = document.querySelector('#test')

    displayData.innerHTML = ''
    countries.forEach((countries) =>{
        displayData.innerHTML += `
            <div class="card">
                    <img src="${countries.flags.png}" id="flag-img" class="card-img"  width="250" alt="">
                    <div class="card-body">
                        <h1 class="card-title" id="country-title">${countries.name.common}</h1>
                        <p id="population">Population: ${countries.population}</p>
                        <p id="region">Region: ${countries.region}</p>
                        <p id="capital">Capital: ${countries.capital}</p>
                    </div>
            </div>
        `;
    })
}

let select = document.querySelector("select");
let selected = document.querySelector(".selected");

select.addEventListener("change", dropdownFunc);

function dropdownFunc(){

    let selectValue = select.value

    filterCountries(selectValue)
}

// Dark Mode / Light Mode

const changeThemeDark = ()=>{
    let body = document.querySelector("body")
    let darkMode = document.querySelector("#dark-mode"); 
    
    body.classList.add('dark-bg')
    darkMode.classList.add("display-mode-theme");
}

const changeThemeLight = ()=>{
    let body = document.querySelector("body");
    let lightMode = document.querySelector("#light-mode");

    body.classList.remove("dark-bg");
    lightMode.classList.add("display-mode-theme");
}

fetchCountries()