async function fetchWeather() {
  //  
  let searchInput = document.getElementById('search').value;
  const weatherDataSection = document.getElementById("weather-data");
  weatherDataSection.style.display = "block";

  const apiKey = "72957e93ff11bf68e63009c7436a03a4"

  if (searchInput == "") {
    weatherDataSection.innerHTML = `
    <div>
      <h2>Empty Input!</h2>
      <p>Please try again with a valid <u>city name</u>.</p>
    </div>
    `;
    return;
  }

  //  Pega as coordernadas 
  async function getLonAndLat() {
    const countryCode = 1
    const geocodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput.replace(" ", "%20")},${countryCode}&limit=1&appid=${apiKey}`

    const response = await fetch(geocodeURL);
    if (!response.ok) {
      console.log("Bad response! ", response.status);
      return;
    }

    const data = await response.json();
    if (data.length == 0) {
      console.log("Something went wrong here.");
      weatherDataSection.innerHTML = `
      <div>
        <h2>Invalid Input: "${searchInput}"</h2>
        <p>Please try again with a valid <u>city name</u>.</p>
      </div>
      `;
      return;
    } else {
      return data[0];
    }
  }
// Pega a informacao para colocar no resultado do search

  async function getWeatherData(lon, lat) {
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    const response = await fetch(weatherURL);

   weatherDataSection.style.display = "flex"; 
    weatherDataSection.style.opacity = 0;
   
   
    const data = await response.json();
    weatherDataSection.innerHTML = `
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}" width="100" />
      <div class="teste">
        <h2>${data.name}</h2>
        <p><strong>Temperature:</strong><h1 id="tempnumb"> ${Math.round(data.main.temp - 273.15)}°C</h1></p>
        <p><strong>Current Condition:</strong> ${data.weather[0].description}</p>
      </div>
    `;

     let opacity = 0;
    const fadeInInterval = setInterval(() => {
        opacity += 0.05; // Increase opacity by 0.05 in each step
        weatherDataSection.style.opacity = opacity;

        // Stop the interval when opacity reaches 1
        if (opacity >= 1) {
            clearInterval(fadeInInterval);
        }
    }, 50);


  }

  ///                                          ///
  document.getElementById("search").value = "";
  const geocodeData = await getLonAndLat();
  getWeatherData(geocodeData.lon, geocodeData.lat);
}