import React, { useState } from 'react';
import Header from './components/Header';
import SearchBox from './components/SearchBox';
import WeatherCard from './components/WeatherCard';
import ForecastGrid from './components/ForecastGrid';
import LocalButton from './components/LocalButton';

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [showWeatherData, setShowWeatherData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [forecastData, setForecastData] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  
  const API_KEY = "72957e93ff11bf68e63009c7436a03a4";

  // pega lat e lon da cidade
  const getLonAndLat = async (cityName) => {
    const countryCode = 1;
    const geocodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName.replace(" ", "%20")},${countryCode}&limit=1&appid=${API_KEY}`;

    try {
      const response = await fetch(geocodeURL);
      if (!response.ok) {
        console.log("Geocoding API error:", response.status);
        return null;
      }

      const data = await response.json();
      if (data.length === 0) {
        console.log("City not found");
        return null;
      }

      return data[0];
    } catch (error) {
      console.error("Erro ao buscar coordenadas:", error);
      return null;
    }
  };

  // busca dados do clima
  const getWeatherData = async (lon, lat) => {
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    
    try {
      const response = await fetch(weatherURL);
      if (!response.ok) {
        console.log("Erro ao buscar dados do clima:", response.status);
        return null;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro ao buscar dados do clima:", error);
      return null;
    }
  };

  // previsao de 5 dias
  const get5DayForecast = async (lon, lat) => {
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    
    try {
      const response = await fetch(forecastURL);
      if (!response.ok) {
        console.log("Erro ao buscar previsão:", response.status);
        return null;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro ao buscar previsão:", error);
      return null;
    }
  };

  // organiza os dados da previsao por dia
  const processForecastData = (forecastData) => {
    const dailyData = {};
    
    // separa por dia
    forecastData.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dateKey = date.toDateString();
      
      if (!dailyData[dateKey]) {
        dailyData[dateKey] = [];
      }
      dailyData[dateKey].push(item);
    });
    
    // proximos 5 dias
    const next5Days = Object.keys(dailyData).slice(0, 5).map(dateKey => {
      const dayForecasts = dailyData[dateKey];
      // pega previsao do meio dia
      const noonForecast = dayForecasts.find(f => {
        const hour = new Date(f.dt * 1000).getHours();
        return hour >= 12 && hour <= 15;
      }) || dayForecasts[0];
      
      const date = new Date(noonForecast.dt * 1000);
      
      return {
        date: date,
        dayName: date.toLocaleDateString('pt-BR', { weekday: 'short' }),
        temperature: Math.round(noonForecast.main.temp - 273.15),
        description: noonForecast.weather[0].description,
        icon: noonForecast.weather[0].icon
      };
    });
    
    return next5Days;
  };

  // funcao principal de busca
  const fetchWeather = async () => {
    // checa se digitou algo
    if (!searchInput.trim()) {
      setWeatherData({
        error: true,
        title: "Campo Vazio!",
        message: "Por favor, tente novamente com um nome de cidade válido."
      });
      setIsAnimating(true);
      setShowWeatherData(true);
      
      // Remover animação após o fade-in
      setTimeout(() => {
        setIsAnimating(false);
      }, 800);
      return;
    }

    setIsLoading(true);
    setShowWeatherData(false);

    // busca coordenadas
    const geocodeData = await getLonAndLat(searchInput);
    
    if (!geocodeData) {
      setWeatherData({
        error: true,
        title: `Entrada Inválida: "${searchInput}"`,
        message: "Por favor, tente novamente com um nome de cidade válido."
      });
      setIsLoading(false);
      setIsAnimating(true);
      setShowWeatherData(true);
      
      setTimeout(() => {
        setIsAnimating(false);
      }, 100);
      return;
    }

    // get weather data
    const climateData = await getWeatherData(geocodeData.lon, geocodeData.lat);
    
    if (!climateData) {
      setWeatherData({
        error: true,
        title: "Erro ao carregar dados",
        message: "Não foi possível carregar as informações do clima."
      });
      setIsLoading(false);
      setIsAnimating(true);
      setShowWeatherData(true);
      
      // Remover animação após o fade-in
      setTimeout(() => {
        setIsAnimating(false);
      }, 800);
      return;
    }

    // get forecast
    const forecastRawData = await get5DayForecast(geocodeData.lon, geocodeData.lat);
    let processedForecast = null;
    
    if (forecastRawData) {
      processedForecast = processForecastData(forecastRawData);
      setForecastData(processedForecast);
    }

    // set weather data
    setWeatherData({
      error: false,
      name: climateData.name,
      temperature: Math.round(climateData.main.temp - 273.15),
      description: climateData.weather[0].description,
      icon: climateData.weather[0].icon,
      iconAlt: climateData.weather[0].description
    });

    // Esconder carregamento e configurar animação de fade-in
    setIsLoading(false);
    setIsAnimating(true);
    setShowWeatherData(true);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 100);
    
    setSearchInput('');
  };

  // quando aperta enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchWeather();
    }
  };

  // muda tema escuro/claro
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  // busca clima quando clica no botao de localizar
  const buscarClimaPorCidade = async (cidade) => {
    setSearchInput(cidade);
    
    // faz a mesma coisa da busca normal
    setIsLoading(true);
    setShowWeatherData(false);

    // busca coordenadas da cidade
    const geocodeData = await getLonAndLat(cidade);
    
    if (!geocodeData) {
      setWeatherData({
        error: true,
        title: `Entrada Inválida: "${cidade}"`,
        message: "Por favor, tente novamente com um nome de cidade válido."
      });
      setIsLoading(false);
      setIsAnimating(true);
      setShowWeatherData(true);
      
      setTimeout(() => {
        setIsAnimating(false);
      }, 100);
      return;
    }

    // get weather data
    const climateData = await getWeatherData(geocodeData.lon, geocodeData.lat);
    
    if (!climateData) {
      setWeatherData({
        error: true,
        title: "Erro ao carregar dados",
        message: "Não foi possível carregar as informações do clima."
      });
      setIsLoading(false);
      setIsAnimating(true);
      setShowWeatherData(true);
      
      setTimeout(() => {
        setIsAnimating(false);
      }, 800);
      return;
    }

    // get forecast
    const forecastRawData = await get5DayForecast(geocodeData.lon, geocodeData.lat);
    let processedForecast = null;
    
    if (forecastRawData) {
      processedForecast = processForecastData(forecastRawData);
      setForecastData(processedForecast);
    }

    // set weather data
    setWeatherData({
      error: false,
      name: climateData.name,
      temperature: Math.round(climateData.main.temp - 273.15),
      description: climateData.weather[0].description,
      icon: climateData.weather[0].icon,
      iconAlt: climateData.weather[0].description
    });

    // Esconder carregamento e configurar animação de fade-in
    setIsLoading(false);
    setIsAnimating(true);
    setShowWeatherData(true);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 100);
  };

  return (
    <div className={`w-full min-h-screen bg-cover bg-center bg-no-repeat bg-fixed
          animate-fade-in transition-all duration-1000 ease-in-out ${darkMode ? 'dark' : ''}`}
         style={{
           backgroundImage: darkMode 
             ? `linear-gradient(rgba(39, 15, 42, 0.8), rgba(24, 31, 54, 0.9)), 
                url(/newyorknight.jpg)`
             : `linear-gradient(rgba(251, 191, 36, 0.3), rgba(239, 68, 68, 0.5)), 
                url(/newyorkday.jpg)`
         }}>

      <main className="flex items-center justify-center min-h-screen px-4 py-6 sm:py-8 md:py-12">
        <section className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto">
          
          <Header darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
          
                    <SearchBox 
            searchInput={searchInput}
            onSearchInputChange={handleSearchInputChange}
            onSearch={fetchWeather}
            onKeyPress={handleKeyPress}
            isLoading={isLoading}
          />
          
          
          <LocalButton 
            onBuscarCidade={buscarClimaPorCidade}
            API_KEY={API_KEY}
          />




          {showWeatherData && (
            <WeatherCard 
              weatherData={weatherData}
              darkMode={darkMode}
              isAnimating={isAnimating}
            />
          )}

          {showWeatherData && forecastData && !weatherData?.error && (
            <ForecastGrid 
              forecastData={forecastData}
              darkMode={darkMode}
              isAnimating={isAnimating}
            />
          )}
          
        </section>
      </main>
    </div>
  );
}

export default App;
