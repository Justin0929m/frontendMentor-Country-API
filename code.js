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
    let displayData = document.querySelector('#countries')

    displayData.innerHTML = ''
    countries.forEach((countries) =>{
        displayData.innerHTML += `
            <div class="card" onclick='fetchCountry("${countries.name.common}")'>
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

let buttonClicked = false

let darkMode = document.querySelector("#dark-mode");
let lightMode = document.querySelector("#light-mode");

darkMode.addEventListener('click', ()=>{
    buttonClicked = !buttonClicked
    
    if(buttonClicked){
        document.documentElement.setAttribute('data-theme', 'dark')
        lightMode.setAttribute('data-display', 'show')
        darkMode.setAttribute('data-display', 'none')
    } else{
        document.documentElement.setAttribute('data-theme', 'light')
        lightMode.setAttribute('data-display', 'none')
        darkMode.setAttribute('data-display', 'show')
    }
})

lightMode.addEventListener('click', ()=>{
    buttonClicked = !buttonClicked
    
    if(buttonClicked){
        document.documentElement.setAttribute('data-theme', 'dark')
        darkMode.setAttribute('data-display', 'none')
        lightMode.setAttribute('data-display', 'show')
    } else{
        document.documentElement.setAttribute('data-theme', 'light')
        darkMode.setAttribute('data-display', 'show')
        lightMode.setAttribute('data-display', 'none')
    }
})

fetchCountries()

// Single Country

const fetchCountry = async (country) =>{
    let res = await fetch(`https://restcountries.com/v3.1/name/${country}`)
    let data = await res.json() 
    
    localStorage.setItem('country', JSON.stringify(data))
    
}

const displayCountry = ()=>{
    let countryArr = localStorage.getItem('country') ? localStorage.getItem('country') : []

    let displaySection = document.querySelector('#country-name')

    displaySection.innerHTML = ''

    countryArr.forEach((country) =>{
        displaySection.innerHTML += `
            <h1>${country.name.common}</h1>
        `
    })
}

displayCountry()