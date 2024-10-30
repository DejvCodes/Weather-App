// Import Access Key
import config from "../JavaScript/config.js";

// Variables
const accessKey = config.accessKey;
const searchBox = document.getElementById('search-box');
const searchBtn = document.getElementById('search-btn');
const weatherIcon = document.getElementById('weather-icon');

// API URL
const URL = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

// Function checkWeather()
const checkWeather = async (city) => {
    // Kontrola prázdného inputu
    if (!city) {
        document.getElementById('weather').style.display = 'none';
        document.getElementById('error').style.display = 'block';
        return;
    }

    try {
        // API požadavek
        const response = await fetch(URL + city + `&appid=${accessKey}`);

        // Validace požadavku HTTP
        if (response.status === 400 || response.status === 404) {
            document.getElementById('weather').style.display = 'none';
            document.getElementById('error').style.display = 'block';
        } else if (response.ok) {
            const data = await response.json();

            // Zobrazení dat o počasí z API
            document.getElementById('city').innerHTML = data.name;
            document.getElementById('temperature').innerHTML = data.main.temp.toFixed(1) + '°C';
            document.getElementById('humidity').innerHTML = data.main.humidity + '%';
            // Převod rychlosti větru z m/s na km/h
            let windSpeed = Math.round(data.wind.speed * 3.6);
            document.getElementById('wind').innerHTML = windSpeed + 'km/h';

            // Nastavení weatherIcon
            const weatherMainIcon = data.weather[0].main.toLowerCase();
            weatherIcon.src = 'img/' + weatherMainIcon + '.png';

            document.getElementById('weather').style.display = 'block';
            document.getElementById('error').style.display = 'none';
        }
    } catch(error) {
        console.error('Error loading data:', error);
        document.getElementById('error').style.display = 'block';
    }
}

// Volání funkce při kliknutí na tlačítko
searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value.trim());
})

// Volání funkce při stisknutí klávesy Enter
searchBox.addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
        checkWeather(searchBox.value.trim());
    }
})

// async = používá se pokud se provádí operace, které mohou trvat nějaký čaš
// fetch() = Tato funkce zahájí asynchronní HTTP požadavek na server, který je identifikován URL adresou.
// await = Zabrání pokračování kodu dokud nebudou dostupná zpracovaná data. 