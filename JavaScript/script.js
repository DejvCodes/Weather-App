// Import config.js
import config from "../JavaScript/config.js";

// Proměnné
const apiKey = config.apiKey; // Můj API klíč
// console.log(config.apiKey);
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const searchBox = document.querySelector('.search-box input');
const searchBtn = document.querySelector('.search-box button');
const weatherIcon = document.querySelector('.weather-icon');

// Funkce checkWeather()
// async => používá se pokud se provádí operace, které mohou trvat nějaký ča
async function checkWeather(city) {
    // Připojení k API serveru (funkce fetch() zahájí asynchronní HTTP požadavek)
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    // Validace provedení požadavku HTTP
    if (searchBox.value == "" || response.status == 400 || response.status == 404) {
        // Pokud uživatel nevyplní searchBox nebo zadá špátný název města
        document.querySelector('.weather').style.display = "none";
        document.querySelector('.error').style.display = "block";
        // console.log("Prázdný searchBox");
    } else if (response.status == 200) {
        // Pokud je vše bez chyby
        // Převedení na JS objekt
        let data = await response.json();
        // console.log(data)

        // Nastavení hodnot o počasí získané z dat z API 
        document.querySelector('.city').innerHTML = data.name; // Název města
        document.querySelector('.temperature').innerHTML = data.main.temp.toFixed(1) + "°C"; // Teplota
        document.querySelector('.humidity').innerHTML = data.main.humidity + "%"; // Vlhkost vzduchu
        document.querySelector('.wind').innerHTML = data.wind.speed + "km/h"; // Rychlost větru

        // Nastavení weatherIcon podle počasí získané z dat z API
        const weatherIcons = {
            "Clear" : "clear.png",
            "Clouds" : "clouds.png",
            "Drizzle" : "drizzle.png",
            "Mist" : "mist.png",
            "Rain" : "rain.png",
            "Snow" : "snow.png"
        }
        const weatherMain = data.weather[0].main;
        weatherIcon.src = "img/" + weatherIcons[weatherMain];

        document.querySelector('.weather').style.display = "block";
        document.querySelector('.error').style.display = "none";
    }
}

// Po stisknutí tlačítka searchBtn se zavolá funkce checkWeather() s hodnoutou zadanou do inputu
searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value);
    // console.log(searchBox.value);
});

// Po stisknutí klávesy Enter se zavolá funkce checkWeather() s hodnoutou zadanou do inputu
searchBox.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        checkWeather(searchBox.value);
        // console.log(searchBox.value);
    }
});

// fetch() = Tato funkce zahájí asynchronní HTTP požadavek na server, který je identifikován URL adresou.
// await = Zabrání pokračování kodu dokud nebudou dostupná zpracovaná data. 